/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-rest-params */

import Vue from "vue";
import { QSsrContext } from "@quasar/app";
import axios, { AxiosResponse, AxiosPromise, AxiosRequestConfig } from "axios";
import { IError } from "src/store/error/types";
import { ICachedCall } from "src/store/load-optimizer/types";
import {
	Call,
	CallOptionsModel,
	ILoadOptimizer,
	LoadingModes,
	Methods,
	IArrayProperties,
	DefaultOptions,
	ICallOptions,
	IAddResponse,
	ResponseStatuses
} from "./types";
import { Store } from "vuex";
import { createQueryStringFromObject, safeStringify } from "./util";
import { showReportNotification } from "src/mett/helpers/store-helper";
import { log } from "src/boot/logger";
import now from "performance-now";
import https from "https";

// const axiosInstance = axios.create({
// 	httpsAgent: new https.Agent({
// 		rejectUnauthorized: false
// 	})
// });

const axiosInstance = axios;

export function createLoadOptimizer(
	app: any,
	store: Store<object>,
	ssrContext: QSsrContext | undefined
): ILoadOptimizer {
	let _vue = app;
	let _loadOptimizer: any = null;
	let _calls: Call[] = [];
	let _loadIndex = 0;
	let _currentPriority = null;
	let _numLoadingInstances = 0;
	let _highestLoadingPriority = 10000;
	let _graphCalls: any = {};
	const _arrayProperties: { callOptions: CallOptionsModel[]; arrayProperties: IArrayProperties }[] = [];
	let _callIndex = 0;
	let _startLoadTimeout: any = 0;
	let _isStartLoadTimoutStarted = false;
	let _serverSideCalls: Call[] = [];
	let _serverSideCookies = "";
	let _accessToken: string | undefined;
	let _baseUrl = "";
	const _callIdsToStoreItems: any = {};
	let _awaitServerCallsResolves: Function[] = [];
	const _defaultOptions: ICallOptions = new DefaultOptions();
	if (ssrContext) https.globalAgent.options.rejectUnauthorized = false;

	// Use to start the load of added calls
	const startLoad = function() {
		const currentLoadIndex: number = ++_loadIndex;

		clearTimeout(_startLoadTimeout);
		_isStartLoadTimoutStarted = false;

		_calls.sort((a: Call, b: Call) => {
			if (a.options.priority > b.options.priority) return 1;
			else if (a.options.priority < b.options.priority) return -1;

			return 0;
		});

		load(currentLoadIndex);
	};

	const load = function(currentLoadIndex: number) {
		let breakCycle = false;

		for (const callIndex in _calls) {
			if (currentLoadIndex != _loadIndex) break;

			const nextCallIndex = parseInt(callIndex) + 1;
			const currentCall = _calls[callIndex];

			if (currentCall.options.remove) continue;

			if (currentCall.options.query.trim() != "") {
				if (typeof _graphCalls[currentCall.options.url] != "object") _graphCalls[currentCall.options.url] = [];

				_graphCalls[currentCall.options.url].push(currentCall);
			} else loadRest(currentCall, currentLoadIndex);

			_currentPriority = currentCall.options.priority;
			_highestLoadingPriority = Math.min(_highestLoadingPriority, currentCall.options.priority);
			currentCall.options.remove = true;

			if (nextCallIndex < _calls.length && _currentPriority != _calls[nextCallIndex].options.priority)
				breakCycle = true;

			if (breakCycle) break;
		}

		for (const currentUrl in _graphCalls) {
			loadGraph(currentUrl, _graphCalls[currentUrl], currentLoadIndex);
		}

		_graphCalls = {};

		// Clear completed calls
		_calls = _calls.filter(call => call.options.remove !== true);
	};

	const loadRest = function(currentCall: Call, currentLoadIndex: number) {
		_numLoadingInstances++;

		const onfulfilled = function(
			response: AxiosResponse<any> | { data: any },
			targetCall: Call,
			fromCache = false
		) {
			const end = now();
			log(
				{
					short_message: `[_ID_] | ${targetCall.options.method.toUpperCase()} (${
						targetCall.originalOptionsModel.url
					}) >> 200 ${fromCache ? "| Cached" : ""}`,
					full_message: safeStringify(targetCall.originalOptionsModel),
					level: 6
				},
				{
					status: 200,
					cache: fromCache,
					duration: (end - currentCall.start).toFixed(3)
				}
			);

			if (!fromCache)
				store.dispatch("loadOptimizer/addCachedCall", {
					call: targetCall.originalOptionsModel,
					result: response.data,
					expireInMinutes: currentCall.options.cacheExpireInMinutes
				});

			const httpData = response.data;
			const arrayProperties = arrayPropertiesByOptionsModel(targetCall.originalOptionsModel);

			if (targetCall.options.storeItem.indexOf("unnamedCall_") != 0) {
				onSuccess(
					{
						storeItem: targetCall.options.storeItem,
						httpData: httpData
					},
					targetCall.options.mode
				);
			}

			if (typeof targetCall.options.then != "undefined" && typeof targetCall.options.then.success == "function") {
				const response: IAddResponse<any> = {
					status: ResponseStatuses.success,
					data: httpData
				};

				targetCall.options.then.success.apply(_loadOptimizer, [response]);
			}

			if (arrayProperties) arrayProperties.values[targetCall.options.storeItem] = httpData;

			if (typeof targetCall.options.onDone == "function") targetCall.options.onDone.apply(_loadOptimizer);

			onLoadDone(currentLoadIndex, [
				{
					arrayProperties,
					calls: [targetCall]
				}
			]);
		};

		if (currentCall.useCache) {
			const cachedCall: ICachedCall = store.getters["loadOptimizer/cachedCall"](currentCall.originalOptionsModel);

			if (cachedCall) {
				Vue.nextTick(() => onfulfilled({ data: cachedCall.result }, currentCall, true));
				return;
			}
		}

		if (!store.getters["loadOptimizer/pendingCall"](currentCall.originalOptionsModel)) {
			let axiosPromise: AxiosPromise<any>;
			let options: AxiosRequestConfig = { timeout: 20000 };
			let queryString = "";

			if (currentCall.options.extraOptions) options = Object.assign(options, currentCall.options.extraOptions);

			if (currentCall.options.url.startsWith(_baseUrl)) {
				if (options.withCredentials === undefined) {
					options.withCredentials = true;
				}

				if (_accessToken && options.withCredentials) {
					if (!options.headers) options.headers = {};
					else options.headers = Object.assign({}, options.headers);

					options.headers = Object.assign(options.headers, {
						Authorization: "bearer " + _accessToken
					});
				}
			}

			switch (currentCall.options.method) {
				case Methods.post:
					axiosPromise = axiosInstance.post(currentCall.options.url, currentCall.options.model, options);
					break;
				case Methods.put:
					axiosPromise = axiosInstance.put(currentCall.options.url, currentCall.options.model, options);
					break;
				case Methods.delete:
					queryString = createQueryStringFromObject(currentCall.options.model);

					options.data = currentCall.options.model;

					axiosPromise = axiosInstance.delete(currentCall.options.url, options);
					break;
				case Methods.get:
				default:
					queryString = createQueryStringFromObject(currentCall.options.model);

					axiosPromise = axiosInstance.get(currentCall.options.url + queryString, options);
					break;
			}

			log({
				short_message: `[_ID_] | ${currentCall.options.method.toUpperCase()} (${
					currentCall.originalOptionsModel.url
				}) ${currentCall.useCache ? "| Use cache" : ""}`,
				full_message: safeStringify(currentCall.originalOptionsModel),
				level: 7
			});

			axiosPromise.then(
				function(response: AxiosResponse<any> | { data: any }) {
					const calls: Call[] = store.getters["loadOptimizer/pendingCall"](currentCall.originalOptionsModel);

					if (calls) {
						calls.forEach(c => {
							onfulfilled(response, c);
						});
					}

					store.dispatch("loadOptimizer/removePendingCall", {
						callOptionsModel: currentCall.originalOptionsModel
					});
				},
				function(...args: []) {
					onLoadFailedRest(currentCall, args);

					const arrayProperties = arrayPropertiesByOptionsModel(currentCall.originalOptionsModel);

					onLoadDone(currentLoadIndex, [
						{
							arrayProperties,
							calls: [currentCall]
						}
					]);
				}
			);
		}

		store.dispatch("loadOptimizer/addPendingCall", {
			callOptionsModel: currentCall.originalOptionsModel,
			call: currentCall
		});
	};

	const loadGraph = function(currentUrl: string, calls: Call[], currentLoadIndex: number) {
		let graphQuery = "{\n";
		const arrayPropertiesCollection: any[] = [];
		const extraOptions: any = {};

		for (const currentIndex in calls) {
			const currentCall = calls[currentIndex];
			const arrayProperties = arrayPropertiesByOptionsModel(currentCall.originalOptionsModel);

			graphQuery +=
				"# storeItem: " +
				currentCall.options.storeItem +
				"\n" +
				currentCall.options.id +
				": " +
				currentCall.options.query +
				"\n";

			if (arrayProperties) {
				const targetCollection = arrayPropertiesCollection.filter(ap => ap.arrayProperties == arrayProperties);

				if (targetCollection.length < 1)
					arrayPropertiesCollection.push({
						arrayProperties,
						calls: [currentCall]
					});
				else targetCollection[0].calls.push(currentCall);
			}

			for (const optionIndex in currentCall.options.extraOptions) {
				if (typeof extraOptions[optionIndex] == "object")
					extraOptions[optionIndex] = Object.assign(
						extraOptions[optionIndex],
						currentCall.options.extraOptions[optionIndex]
					);
				else extraOptions[optionIndex] = currentCall.options.extraOptions;
			}
		}

		graphQuery += "\n}";

		_numLoadingInstances++;

		axiosInstance.post(currentUrl, graphQuery, extraOptions).then(
			function(httpData: any) {
				const returnValues: any = {};

				for (const currentIndex in httpData.data) {
					const currentStoreItem = _callIdsToStoreItems[currentIndex];

					returnValues[currentStoreItem] = httpData.data[currentIndex];

					const targetCall = calls.find(c => c.options.id == currentIndex);
					if (targetCall) {
						const arrayProperties = arrayPropertiesByOptionsModel(targetCall.originalOptionsModel);

						if (arrayProperties) arrayProperties.values[currentStoreItem] = httpData.data[currentIndex];

						if (currentStoreItem.indexOf("unnamedCall_") != 0)
							onSuccess(
								{
									storeItem: currentStoreItem,
									httpData: {
										body: httpData.data[currentIndex]
									}
								},
								targetCall.options.mode
							);
					}
				}

				for (const currentIndex in calls) {
					const currentCall = calls[currentIndex];

					if (
						typeof currentCall.options.then != "undefined" &&
						typeof currentCall.options.then.success == "function"
					) {
						const response: IAddResponse<any> = {
							status: ResponseStatuses.success,
							data: returnValues[currentCall.options.storeItem]
						};

						currentCall.options.then.success.apply(_loadOptimizer, [response]);
					}

					if (typeof currentCall.options.onDone == "function")
						currentCall.options.onDone.apply(_loadOptimizer);
				}

				onLoadDone(currentLoadIndex, arrayPropertiesCollection);
			},
			function() {
				onError.apply(_loadOptimizer);

				onLoadFailedGraph(calls, arrayPropertiesCollection);

				onLoadDone(currentLoadIndex, arrayPropertiesCollection);
			}
		);
	};

	const onSuccess = function(data: { storeItem: string; httpData: any }, mode?: LoadingModes) {
		if (typeof mode == "undefined") mode = LoadingModes.replace;

		switch (mode) {
			case LoadingModes.replace:
				store.dispatch("loadOptimizer/fillLoadedStoreItem", data);
				break;
			case LoadingModes.add:
				store.dispatch("loadOptimizer/addLoadedStoreItem", data);
				break;
			case LoadingModes.prepend:
				store.dispatch("loadOptimizer/prependLoadedStoreItem", data);
				break;
			case LoadingModes.extend:
				store.dispatch("loadOptimizer/extendLoadedStoreItem", data);
				break;
		}
	};

	const onError = function(relatedError?: IError) {
		const error: IError = {
			code: app.i18n.t("errors.unableToLoadApiInfo.code"),
			title: app.i18n.t("errors.unableToLoadApiInfo.title"),
			message: app.i18n.t("errors.unableToLoadApiInfo.description"),
			info: relatedError,
			timestamp: new Date()
		};
		showReportNotification(error, store.getters["settings/settings"]);
	};

	const handleErrorForRestCall = function(currentCall: Call, args: []) {
		const arrayProperties = arrayPropertiesByOptionsModel(currentCall.originalOptionsModel);
		const end = now();

		if (typeof currentCall.options.then != "undefined" && typeof currentCall.options.then.error == "function")
			currentCall.options.then.error.apply(_loadOptimizer, args);

		if (typeof currentCall.options.onDone == "function") currentCall.options.onDone.apply(_loadOptimizer);

		if (arrayProperties) {
			arrayProperties.errors.push(args);
		}

		try {
			const response = (args as any)[0].response;
			const error: IError = {
				code: app.i18n.t("errors.invalidApiCall.code"),
				title: app.i18n.t("errors.invalidApiCall.title"),
				message: app.i18n.t("errors.invalidApiCall.description", [currentCall.options.url]),
				timestamp: new Date()
			};

			if (response && response.status && response.data !== undefined && response.statusText !== undefined) {
				log(
					{
						short_message: `[_ID_] | ${currentCall.options.method.toUpperCase()} (${
							currentCall.originalOptionsModel.url
						}) >> ${response.status}`,
						full_message: safeStringify(currentCall.options),
						level: 3
					},
					{
						status: response.status,
						duration: (end - currentCall.start).toFixed(3)
					}
				);
				error.info = {
					data: response.data,
					headers: response.headers,
					config: response.config
				};
				error.title = `${response.status} - error - ${response.statusText}`;
			} else {
				log(
					{
						short_message: `[_ID_] | ${currentCall.options.method.toUpperCase()} (${
							currentCall.originalOptionsModel.url
						}) >> 555 : NULL`,
						full_message: safeStringify(currentCall.options),
						level: 3
					},
					{
						response: response,
						status: 555,
						duration: (end - currentCall.start).toFixed(3)
					}
				);
			}

			if (response && (response.status == 401 || response.status == 403)) {
				store.commit("error/addWarning", error);
			} else {
				onError.apply(_loadOptimizer, [error]);
				store.commit("error/addError", error);
			}
		} catch (error) {
			// Creating an error message creates an error ¯\_(ツ)_/¯
			// Log the best error possible in the console.
			if (app && app.i18n) {
				if (
					currentCall &&
					currentCall.options &&
					currentCall.originalOptionsModel &&
					currentCall.originalOptionsModel.url &&
					currentCall.options.method
				) {
					log({
						short_message: `[_ID_] | ${currentCall.options.method.toUpperCase()} (${
							currentCall.originalOptionsModel.url
						}) > ERROR handling ERROR`,
						full_message: safeStringify(error),
						level: 2
					});
					console.error(
						app.i18n.t("errors.invalidApiCall.code") +
							": " +
							app.i18n.t("errors.invalidApiCall.description", [currentCall.options.url])
					);
				} else {
					log({
						short_message: "[_ID_] | Unknown ERROR handling ERROR",
						full_message: safeStringify(error),
						level: 2
					});
					console.error(
						app.i18n.t("errors.invalidApiCall.code") + ": " + app.i18n.t("errors.invalidApiCall.title")
					);
				}
			} else {
				log({
					short_message: "[_ID_] | Unknown ERROR handling ERROR",
					full_message: safeStringify(error),
					level: 2
				});
				console.error("An unknown error occured in a rest call");
			}
		}
	};

	const onLoadFailedRest = function(currentCall: Call, args: []) {
		const calls: Call[] = store.getters["loadOptimizer/pendingCall"](currentCall.originalOptionsModel);

		if (calls) {
			calls.forEach(c => {
				handleErrorForRestCall(c, args);
			});
		}

		store.dispatch("loadOptimizer/removePendingCall", {
			callOptionsModel: currentCall.originalOptionsModel
		});
	};

	const onLoadFailedGraph = function(calls: Call[], arrayPropertiesCollection: any[]) {
		for (const currentIndex in calls) {
			const currentCall = calls[currentIndex];

			if (typeof currentCall.options.then != "undefined" && typeof currentCall.options.then.error == "function")
				currentCall.options.then.error.apply(_loadOptimizer, arguments);

			if (typeof currentCall.options.onDone == "function") currentCall.options.onDone.apply(_loadOptimizer);
		}

		for (const currentIndex in arrayPropertiesCollection) {
			const currentArrayProperties = arrayPropertiesCollection[currentIndex].arrayProperties;

			if (
				typeof currentArrayProperties.then != "undefined" &&
				typeof currentArrayProperties.then.error == "function"
			)
				currentArrayProperties.then.error.apply(_loadOptimizer, arguments);

			currentArrayProperties.errors.push(arguments);
		}
	};

	const onLoadDone = function(currentLoadIndex: number, arrayPropertiesCollection: any[]) {
		_numLoadingInstances--;

		for (const currentIndex in arrayPropertiesCollection) {
			const arrayProperties = arrayPropertiesCollection[currentIndex].arrayProperties;

			if (typeof arrayProperties != "undefined") {
				arrayProperties.numberOfLoadingItems -= arrayPropertiesCollection[currentIndex].calls.length;

				if (arrayProperties.numberOfLoadingItems == 0) {
					if (
						typeof arrayProperties.then != "undefined" &&
						typeof arrayProperties.then.success == "function"
					) {
						if (!arrayProperties.errors.length) {
							const response: IAddResponse<any> = {
								status: ResponseStatuses.success,
								data: arrayProperties
							};
							arrayProperties.then.success.apply(_loadOptimizer, [response]);
						} else {
							const response: IAddResponse<any> = {
								status: ResponseStatuses.error,
								data: arrayProperties
							};
							arrayProperties.then.error.apply(_loadOptimizer, [response]);
						}
					}
				}
			}
		}

		if (_numLoadingInstances <= 0) {
			// Ensure that _numLoadingInstances is never negative
			_numLoadingInstances = 0;

			if (_calls.length > 0) load(currentLoadIndex);

			_highestLoadingPriority = 10000;
		}
	};

	const filterCalls = function(resolve?: Function) {
		if (resolve) _awaitServerCallsResolves.push(resolve);

		_serverSideCalls = _serverSideCalls.filter(call => call.options.loaded !== true);

		if (_serverSideCalls.length == 0) {
			for (const index in _awaitServerCallsResolves) {
				_awaitServerCallsResolves[index]();
			}

			_awaitServerCallsResolves = [];
		}
	};

	const arrayPropertiesByOptionsModel = function(optionsModel: CallOptionsModel) {
		const result = _arrayProperties.find(ap => ap.callOptions.indexOf(optionsModel) > -1);

		if (result) return result.arrayProperties;

		return undefined;
	};

	// Create the loadOptimizer object.
	_loadOptimizer = {
		modes: LoadingModes,

		// Add a single or an array of calls to the loadOptimizer.
		add: function<T>(callOptions: CallOptionsModel | CallOptionsModel[], useCache = true) {
			// Check for Axios dependency.
			if (typeof axiosInstance == "undefined") throw 'Missing dependency "Axios" to use Load Optimizer.';

			// Check for vuex dependency.
			if (typeof store == "undefined") throw 'Missing dependency "Vuex" to use Load Optimizer.';

			// If the callOptions is an Array with multiple calls.
			if (Array.isArray(callOptions)) {
				// Create Array properties, so we can use this later to do actions
				// to the full Array in stead of a single call.
				const currentArrayProperties: IArrayProperties = {
					numberOfLoadingItems: callOptions.length,
					values: {},
					errors: []
				};

				_arrayProperties.push({ callOptions: callOptions, arrayProperties: currentArrayProperties });

				// Sort the callOptions Array based on priority.
				callOptions = callOptions.sort((a, b) => {
					const priorityA = a.priority || _defaultOptions.priority;
					const priorityB = b.priority || _defaultOptions.priority;

					if (priorityA < priorityB) return -1;
					else if (priorityA > priorityB) return 1;

					return 0;
				});

				for (let i = 0; i < callOptions.length; i++) {
					// Add each individual item to the loadOptimizer as separate call.
					this.add(callOptions[i], useCache);
				}

				// Return a 'then' object to be able to dispatch succes/error information
				// for the current Array.
				return {
					then: function(success: (response: IAddResponse<T>) => void, error: Function) {
						currentArrayProperties.then = {
							success: success,
							error: error
						};
						return this;
					}
				};
			}

			// Create a call object based on default values and the given call options.
			const call = new Call(callOptions, useCache, now());
			call.options.id = "call" + _callIndex++;

			// Check for required call properties.
			if (call.options.url.trim() == "" && call.options.query.trim() == "")
				throw 'Call option "url" (REST) or "query" (GraphQL) is required when using the Load Optimizer.';

			// If the vuex store item is not set, it will be treated as an unnamed call.
			if (call.options.storeItem.trim() == "") call.options.storeItem = "unnamedCall_" + _callIndex++;

			_callIdsToStoreItems[call.options.id] = call.options.storeItem;

			if (call.options.storeItem.trim().toLowerCase() == "storeitem")
				throw 'It\'s not allowed to use "storeItem" as your storeItem name.';

			if (call.options.url.trim() == "") call.options.url = "/graph";

			if (!/^(https{0,1}:){0,1}(\/\/)/.test(call.options.url)) call.options.url = _baseUrl + call.options.url;

			if (call.options.serverSide && ssrContext) {
				if (call.options.forwardCookies && _serverSideCookies && _serverSideCookies.trim() != "") {
					if (typeof call.options.extraOptions.headers == "undefined") call.options.extraOptions.headers = {};

					call.options.extraOptions.headers.cookie = _serverSideCookies;
				}

				call.options.onDone = function() {
					call.options.loaded = true;

					filterCalls();
				};

				_serverSideCalls.push(call);
			}

			_calls = _calls.filter(c => {
				if (
					c.options.storeItem == call.options.storeItem &&
					c.options.priority >= call.options.priority &&
					call.options.mode == LoadingModes.replace
				) {
					const error = { message: "Duplicate call skipped", call: c };
					const arrayProperties = arrayPropertiesByOptionsModel(c.originalOptionsModel);

					if (arrayProperties) {
						arrayProperties.numberOfLoadingItems--;
						arrayProperties.errors.push(error);
					} else {
						c.options.error = error;
					}

					if (c.options.then && c.options.then.success)
						c.options.then.success({ status: ResponseStatuses.skipped });

					if (typeof c.options.onDone == "function") c.options.onDone.apply(this);

					return false;
				} else return true;
			});

			if (!ssrContext) {
				if (!call.options.serverSide) {
					_calls.push(call);
				} else {
					if (_vue.$root && _vue.$root.$el && !(_vue.$root.$el as any).dataset["server-rendered"]) {
						_calls.push(call);
					} else {
						if (store.getters["loadOptimizer/isAlreadyExecutedServerSide"](callOptions)) {
							const arrayProperties = arrayPropertiesByOptionsModel(call.originalOptionsModel);

							store.dispatch("loadOptimizer/removeServerSideExecutedCall", callOptions);

							call.options.skip = true;

							Vue.nextTick(() => {
								onLoadDone(_loadIndex, [
									{
										arrayProperties,
										calls: [call]
									}
								]);
							});
						} else {
							_calls.push(call);
						}
					}
				}
			} else if (call.options.serverSide) {
				store.dispatch("loadOptimizer/addExecutedServerSideCall", callOptions);
				_calls.push(call);
			} else {
				const arrayProperties = arrayPropertiesByOptionsModel(call.originalOptionsModel);

				call.options.skip = true;

				if (arrayProperties) arrayProperties.numberOfLoadingItems--;
			}

			if (_highestLoadingPriority >= call.options.priority && !_isStartLoadTimoutStarted) {
				_isStartLoadTimoutStarted = true;

				clearTimeout(_startLoadTimeout);

				_startLoadTimeout = setTimeout(function() {
					startLoad();
				}, 40);
			}

			return {
				then: function(success?: (response: IAddResponse<T>) => void, error?: Function) {
					if (call.options.skip) {
						const arrayProperties = arrayPropertiesByOptionsModel(call.originalOptionsModel);

						if (success) success({ status: ResponseStatuses.skipped });

						onLoadDone(_loadIndex, [
							{
								arrayProperties,
								calls: [call]
							}
						]);

						return this;
					}

					const currentCallTimeout = setTimeout(() => {
						log({
							short_message: `[_ID_] | ${call.options.method.toUpperCase()} (${
								call.originalOptionsModel.url
							}) > TIMEOUT`,
							full_message: safeStringify(call.options),
							level: 2
						});

						if (call.options.query.trim() != "") onLoadFailedGraph([call], []);
						else onLoadFailedRest(call, []);

						call.options.then = {
							success: undefined,
							error: undefined
						};
					}, 20000);

					call.options.then = {
						success: function(response: IAddResponse<T>) {
							clearTimeout(currentCallTimeout);

							if (success) success.apply(_loadOptimizer, [response]);
						},
						error: function() {
							clearTimeout(currentCallTimeout);

							if (error) error.apply(_loadOptimizer, arguments);
						}
					};
					return this;
				}
			};
		},

		clearCache() {
			store.dispatch("loadOptimizer/clearCache");
		},

		clearPendingCalls() {
			store.dispatch("loadOptimizer/clearPendingCalls");
		},

		awaitServerCalls: function() {
			return new Promise(resolve => {
				filterCalls(resolve);
			});
		},

		setServerSideCookies: function(cookieString: string) {
			_serverSideCookies = cookieString;
		},

		setAccessToken(accessToken: string) {
			_accessToken = accessToken;
		},

		accessTokenSet() {
			return _accessToken !== undefined;
		},

		setBaseUrl(url: string) {
			_baseUrl = url;
		},

		setVueInstance(vue: Vue) {
			if (vue.$store || !store) _vue = vue;
		}
	};

	return _loadOptimizer;
}
