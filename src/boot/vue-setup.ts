import { IError } from "src/store/error/types";
import { ThemeDto } from "src/mett/communication/types";
import { Store } from "vuex";
import VueRouter, { Route } from "vue-router";
import { QSsrContext } from "@quasar/app";
import { Cookies } from "quasar";
import { VueConstructor } from "vue";
import { log } from "src/boot/logger";
import { safeStringify } from "src/mett/communication/load-optimizer/util";
import now from "performance-now";
import { MyComponentOptions } from "./types";

let _ssrContext: QSsrContext | undefined;

function loadTheme(app: MyComponentOptions, store: Store<object>) {
	return new Promise((resolve, reject) => {
		const theme: ThemeDto = store.getters["host/theme"];

		if (!theme || !theme.name) {
			if (_ssrContext)
				log({
					short_message: "[_ID_] | \u2716 No theme name available",
					full_message: safeStringify(store.getters["host/host"]),
					level: 4
				});
			if (app.i18n) {
				store.dispatch("error/addError", {
					code: app.i18n.t("errors.unableToLoadTheme.code"),
					title: app.i18n.t("errors.unableToLoadTheme.title"),
					message: app.i18n.t("errors.unableToLoadTheme.description", [undefined]),
					info: theme
				});
			}
			return reject({
				error: "No theme or theme name available",
				info: theme
			});
		}
		app.$themePark.loadTheme(theme.name).then(
			() => {
				if (_ssrContext) {
					log({
						short_message: `[_ID_] | \u2714 ${theme.name} theme loaded`,
						full_message: "",
						level: 7
					});
				}
				resolve();
			},
			(reason: any) => {
				if (_ssrContext) {
					log({
						short_message: `[_ID_] | \u2716 ${theme.name} theme failed to load`,
						full_message: "",
						level: 3
					});
				}
				store.dispatch("error/addError", {
					code: app.i18n.t("errors.unableToLoadTheme.code"),
					title: app.i18n.t("errors.unableToLoadTheme.title"),
					message: app.i18n.t("errors.unableToLoadTheme.description", [theme.name]),
					info: reason
				});
				reject(reason);
			}
		);
	});
}

function loadTemplates(app: any, store: Store<object>) {
	return new Promise((resolve, reject) => {
		return store.dispatch("template/loadTemplates").then(
			() => {
				if (_ssrContext)
					log({
						short_message: "[_ID_] | \u2714 Templates loaded",
						full_message: "",
						level: 7
					});
				resolve();
			},
			(reason: any) => {
				if (_ssrContext)
					log({
						short_message: "[_ID_] | \u2716 Templates failed to load",
						full_message: "",
						level: 3
					});

				store.dispatch("error/addError", {
					code: app.i18n.t("errors.unableToLoadTemplate.code"),
					title: app.i18n.t("errors.unableToLoadTemplate.title"),
					message: app.i18n.t("errors.unableToLoadTemplate.description")
				});
				reject(reason);
			}
		);
	});
}

function loadHostInfo(app: any, store: Store<object>) {
	return new Promise((resolve, reject) => {
		store.dispatch("host/loadHostInfo").then(
			() => {
				if (_ssrContext)
					log({
						short_message: "[_ID_] | \u2714 Host info loaded",
						full_message: "",
						level: 7
					});
				resolve();
			},
			(reason: any) => {
				// console.log(reason);
				if (_ssrContext)
					log({
						short_message: "[_ID_] | \u2716 Failed to load host info",
						full_message: "",
						level: 3
					});

				store.dispatch("error/addError", {
					code: app.i18n.t("errors.unableToLoadHostInfo.code"),
					title: app.i18n.t("errors.unableToLoadHostInfo.title"),
					message: app.i18n.t("errors.unableToLoadHostInfo.description")
				});
				reject(reason);
			}
		);
	});
}

function loadMenu(app: any, store: Store<object>) {
	return new Promise((resolve, reject) => {
		return store.dispatch("menu/setMenu", { menuId: "mainMenu" }).then(
			() => {
				if (_ssrContext)
					log({
						short_message: "[_ID_] | \u2714 Menu loaded",
						full_message: "",
						level: 7
					});

				resolve();
			},
			reason => {
				let warning: IError;

				if (_ssrContext)
					log({
						short_message: "[_ID_] | \u2716 Failed to load menu",
						full_message: "",
						level: 4
					});

				if (reason && reason.options && reason.options.error) {
					warning = {
						code: app.i18n.t("errors.unableToLoadMenu.code"),
						title: app.i18n.t("errors.unableToLoadMenu.title"),
						message: app.i18n.t("errors.unableToLoadMenu.description"),
						info: reason.options.error.message,
						timestamp: new Date()
					};
				} else {
					warning = {
						code: app.i18n.t("errors.unableToLoadMenu.code"),
						title: app.i18n.t("errors.unableToLoadMenu.title"),
						message: app.i18n.t("errors.unableToLoadMenu.description"),
						timestamp: new Date()
					};
				}

				store.dispatch("error/addWarning", warning);
				reject(reason);
			}
		);
	});
}

function loadPageMenuItems(app: any, store: Store<object>) {
	return new Promise((resolve, reject) => {
		return store.dispatch("page/loadPageMenuItems").then(
			() => {
				if (_ssrContext)
					log({
						short_message: "[_ID_] | \u2714 Pages loaded",
						full_message: "",
						level: 7
					});

				resolve();
			},
			reason => {
				let warning: IError;

				if (_ssrContext)
					log({
						short_message: "[_ID_] | \u2716 Failed to load pages",
						full_message: "",
						level: 4
					});

				if (reason && reason.options && reason.options.error) {
					warning = {
						code: app.i18n.t("errors.unableToLoadPageMenuItems.code"),
						title: app.i18n.t("errors.unableToLoadPageMenuItems.title"),
						message: app.i18n.t("errors.unableToLoadPageMenuItems.description"),
						info: reason.options.error.message,
						timestamp: new Date()
					};
				} else {
					warning = {
						code: app.i18n.t("errors.unableToLoadPageMenuItems.code"),
						title: app.i18n.t("errors.unableToLoadPageMenuItems.title"),
						message: app.i18n.t("errors.unableToLoadPageMenuItems.description"),
						timestamp: new Date()
					};
				}

				store.dispatch("error/addWarning", warning);

				reject(reason);
			}
		);
	});
}

function loadApplicationUser(app: any, store: Store<object>) {
	return new Promise(resolve => {
		return store.dispatch("user/loadApplicationUser").then(
			() => {
				if (_ssrContext)
					log({
						short_message: "[_ID_] | \u2714 Application user loaded",
						full_message: "",
						level: 7
					});
				resolve();
			},
			(reason: any) => {
				if (_ssrContext)
					log({
						short_message: "[_ID_] | \u2716 Application user failed to load",
						full_message: "",
						level: 4
					});

				resolve(reason);
				// Todo: Currently this call returns a 404 which is incorrect, don't reject for now
				// reject(reason)
			}
		);
	});
}

function initLocalStorageHandling(app: any, store: Store<object>) {
	if (_ssrContext) return;

	const storeItemsToWatch: any[] = store.getters["settings/localStorageItems"];
	const restoredModules: string[] = [];
	const dataToSave: any = {};

	storeItemsToWatch.forEach(si => {
		if (restoredModules.indexOf(si.moduleName) == -1 && localStorage[si.moduleName]) {
			store.commit("importLocalStorageItem", {
				moduleName: si.moduleName,
				value: JSON.parse(localStorage[si.moduleName])
			});
			restoredModules.push(si.moduleName);
		}
	});

	store.subscribe((mutation, state: any) => {
		storeItemsToWatch.forEach(si => {
			if (mutation.type.startsWith(si.moduleName + "/")) {
				if (!dataToSave[si.moduleName]) dataToSave[si.moduleName] = {};

				dataToSave[si.moduleName][si.itemName] = state[si.moduleName][si.itemName];
			}
		});

		for (const index in dataToSave) {
			localStorage.setItem(index, safeStringify(dataToSave[index]));
		}
	});
}

function initQueryChangeWatch(app: any, store: Store<object>, router: VueRouter) {
	store.subscribe(mutation => {
		if (mutation.type == "settings/setQuerySetting") {
			const queryObject = store.getters["settings/formattedQuery"];

			router.push({ query: queryObject });
		}
	});
}

function getCookie(cookie: string | undefined, key: string) {
	if (!cookie) return undefined;

	const match = cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));

	if (match) return match[2];
	else return undefined;
}

export default ({
	app,
	store,
	ssrContext,
	Vue,
	router
}: {
	app: MyComponentOptions;
	store: Store<object>;
	ssrContext: QSsrContext;
	Vue: VueConstructor<Vue>;
	router: VueRouter;
}) => {
	_ssrContext = ssrContext;

	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async resolve => {
		const start = now();
		Vue.config.productionTip = false;

		const settings = store.getters["settings/settings"];

		router.beforeEach((to: Route, from: Route, next: () => void) => {
			if (!ssrContext) {
				store.dispatch("loadOptimizer/clearServerSideExecutedCalls");
				log({
					short_message: `[_ID_] | NAVIGATE (${from.path}) >> (${to.path})`,
					full_message: `(${from.fullPath}) >> (${to.fullPath})`,
					level: 7
				});
			}
			if (store.getters["error/status"] !== 500) store.dispatch("error/raise200");
			store.dispatch("settings/setQuery", { value: to.query });

			next();
		});

		if (ssrContext) {
			const accessToken = getCookie(ssrContext.req.headers.cookie, "access_token");

			app.$loadOptimizer.setAccessToken(accessToken);
			app.$loadOptimizer.setServerSideCookies(ssrContext.req.headers.cookie);
		} else if (Cookies.get("access_token")) {
			app.$loadOptimizer.setAccessToken(Cookies.get("access_token"));
		}

		app.$loadOptimizer.setBaseUrl(settings.api.url);

		try {
			await loadHostInfo(app, store);
			await loadTheme(app, store);
			const promises = Promise.all([
				loadMenu(app, store),
				loadPageMenuItems(app, store),
				loadTemplates(app, store)
			]);
			if (app.$loadOptimizer.accessTokenSet()) loadApplicationUser(app, store).catch(() => {});
			initLocalStorageHandling(app, store);
			initQueryChangeWatch(app, store, router);
			await promises;
			if (_ssrContext) {
				const end = now();
				log(
					{
						short_message: "[_ID_] | \u2714 Vue setup successful",
						full_message: "",
						level: 7
					},
					{
						duration: (end - start).toFixed(3)
					}
				);
			}
			resolve();
		} catch (error) {
			if (_ssrContext) {
				const end = now();
				log(
					{
						short_message: "[_ID_] | \u2716 Vue setup failed, trying to load error theme",
						full_message: safeStringify(error),
						level: 3
					},
					{
						duration: (end - start).toFixed(3)
					}
				);
			}
			store.dispatch("error/raise500");
			app.$themePark.loadErrorTheme().then(
				() => {
					if (_ssrContext)
						log({
							short_message: "[_ID_] | \u2714 Error theme loaded",
							full_message: "",
							level: 7
						});
					resolve();
				},
				(reason: any) => {
					if (_ssrContext)
						log({
							short_message: "[_ID_] | \u2716 Failed to load the error theme, resolving anyways.",
							full_message: safeStringify(reason),
							level: 3
						});

					resolve();
				}
			);
		}
	});
};
