/* eslint-disable jest/no-disabled-tests */
import createLoadOptimizer from "src/mett/communication/load-optimizer";
import { createWrapperStore } from "utils/wrapper";
import { Store } from "vuex";
import { Methods, LoadingModes, DefaultOptions, ResponseStatuses } from "../types";
import mockAxios from "jest-mock-axios";
import { AxiosRequestConfig } from "axios";
import { CallOptionsModel } from "src/mett/communication/load-optimizer/types";

let options: AxiosRequestConfig;
let defaultCall: CallOptionsModel;

const cloneDefaultCall = function() {
	const clone: CallOptionsModel = {};

	for (const key in defaultCall) {
		(clone as any)[key] = (defaultCall as any)[key];
	}

	return clone;
};

afterEach(() => {
	// cleaning up the mess left behind the previous test
	mockAxios.reset();
	defaultCall = {
		url: "/api/hosts",
		storeItem: "test/null",
		serverSide: true
	};
	options = { timeout: 20000, withCredentials: true };
});

describe("Load optimizer", () => {
	const defaultWrapperOptions = {
		loadOptimizer: {
			SSR: false
		},
		store: true
	};

	const createTestModule = function(store: Store<object>) {
		store.registerModule("test", {
			namespaced: true,
			state: {
				array: [],
				null: null,
				obj: {},
				string: "Hello!"
			},
			getters: {
				array: state => state.array,
				null: state => state.null,
				obj: state => state.obj,
				string: state => state.string
			}
		});
	};

	it("should successfully initialize a load-optimizer", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);

		expect(store.$loadOptimizer).toBeDefined();
	});

	it("should execute a call when add is called", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);

		const thenFn = jest.fn();
		store.$loadOptimizer.add(defaultCall).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).toHaveBeenCalledWith("/api/hosts", options);
		mockAxios.mockResponse({ data: true });
		expect(thenFn).toBeCalled();
	});

	it("should execute two calls", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);

		const thenFn = jest.fn();

		const call1 = defaultCall;
		const call2 = {
			url: "/api/users",
			storeItem: "test/string", // Need to change storeItem otherwise the first call wont be done.
			serverSide: true
		};

		store.$loadOptimizer.add(call1).then(thenFn);
		store.$loadOptimizer.add(call2).then(thenFn);

		await new Promise(resolve => setTimeout(resolve, 50));

		mockAxios.mockResponseFor("/api/users", { data: "hallo" });
		mockAxios.mockResponseFor("/api/hosts", { data: "hallo" });

		expect(mockAxios.get).toHaveBeenCalledTimes(2);
		expect(thenFn).toHaveBeenCalledTimes(2);
	});

	it("should not execute two calls if they are targeting the same storeItem", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		const thenFn = jest.fn();

		const call1 = defaultCall;
		const call2 = {
			...defaultCall,
			url: "/api/users"
		};
		// Do the call two times
		store.$loadOptimizer.add(call1).then(thenFn);
		store.$loadOptimizer.add(call2).then(thenFn);

		await new Promise(resolve => setTimeout(resolve, 50));

		expect(store.getters["loadOptimizer/pendingCall"](call1)).toBeUndefined();
		expect(store.getters["loadOptimizer/pendingCall"](call2)).not.toBeUndefined();

		mockAxios.mockResponseFor(call2.url, { data: "hallo" });

		expect(mockAxios.get).toHaveBeenCalledTimes(1);
		expect(thenFn).toHaveBeenNthCalledWith(1, { status: "skipped" });
		expect(thenFn).toHaveBeenNthCalledWith(2, { data: "hallo", status: "success" });
	});

	it("should add a response to a call to the specified store item", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();
		store.$loadOptimizer.add(defaultCall).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).toHaveBeenCalledWith("/api/hosts", options);

		const responseObj = { data: "server says hello!" };
		mockAxios.mockResponse(responseObj);

		expect(thenFn).toHaveBeenCalledWith({ ...responseObj, status: "success" });
		expect(store.getters["test/null"]).toEqual(responseObj.data);
	});

	it("should use POST method when specified", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		const call = cloneDefaultCall();
		call.method = Methods.post;
		store.$loadOptimizer.add(call);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.post).toHaveBeenCalled();
	});

	it("should use DELETE method when specified", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);

		const call = cloneDefaultCall();
		call.method = Methods.delete;
		store.$loadOptimizer.add(call);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.delete).toHaveBeenCalled();
	});

	it("should use PUT method when specified", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);

		const call = cloneDefaultCall();
		call.method = Methods.put;
		store.$loadOptimizer.add(call);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.put).toHaveBeenCalled();
	});

	it("should add query to a call", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);

		const call = cloneDefaultCall();
		call.model = {
			id: 123456789,
			guid: 123456789
		};
		store.$loadOptimizer.add(call);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).toHaveBeenCalledWith("/api/hosts?id=123456789&guid=123456789", options);
	});

	it("should add extra options to a call when specified", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		defaultCall.extraOptions = {
			params: {
				hallo: "Hi there"
			},
			headers: {
				someHeader: "Mett4 is awesome"
			},
			timeout: 15000, // Need to be able to overwrite default values
			withCredentials: false
		};
		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).toHaveBeenCalledWith("/api/hosts", { ...options, ...defaultCall.extraOptions });
	});

	it("should add authentication token to header if available", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		store.$loadOptimizer.setAccessToken("hallowateenwaardelozetokenisditzeg");
		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).toHaveBeenCalledWith("/api/hosts", {
			...options,
			headers: { Authorization: "bearer " + "hallowateenwaardelozetokenisditzeg" }
		});
	});

	it("should not execute client-side calls serverside", async () => {
		const store = await createWrapperStore({
			loadOptimizer: {
				SSR: true
			},
			store: true
		});
		createTestModule(store);
		defaultCall.serverSide = false;
		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).not.toHaveBeenCalled();
	});

	it("should execute server-side calls serverside", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).toHaveBeenCalled();
	});

	it("should replace the item in the store", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();
		defaultCall.mode = LoadingModes.replace;
		// First set some data in the store
		store.$loadOptimizer.add(defaultCall).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).toHaveBeenCalled();

		mockAxios.mockResponse({ data: "server says hi!" });
		expect(store.getters["test/null"]).toEqual("server says hi!");
		// Replace the data with something else
		defaultCall.url = "/iets/anders"; // Change url to prevent caching
		store.$loadOptimizer.add(defaultCall).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).toHaveBeenCalled();

		mockAxios.mockResponse({ data: "server says hello!" });
		expect(store.getters["test/null"]).toEqual("server says hello!");
	});

	it("should not add an item to an object in the store", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();
		defaultCall.mode = LoadingModes.add;
		defaultCall.storeItem = "test/obj";
		// First set some data in the store
		store.$loadOptimizer.add(defaultCall).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));
		expect(mockAxios.get).toHaveBeenCalled();
		mockAxios.mockResponse({ data: "server says hi!" });
		expect(store.getters["test/obj"]).toEqual({});
		expect(store.getters["error/warnings"]).toHaveLength(1);
	});

	it("should add the item to array in the store", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();
		defaultCall.mode = LoadingModes.add;
		defaultCall.storeItem = "test/array";

		store.$loadOptimizer.add(defaultCall).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: "server says hi!" });
		expect(store.getters["test/array"]).toEqual(["server says hi!"]);
	});

	it("should add an array to an empty item in the store", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();
		defaultCall.mode = LoadingModes.add;

		store.$loadOptimizer.add(defaultCall).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: ["server says hi!"] });
		expect(store.getters["test/null"]).toEqual(["server says hi!"]);
	});

	it("should add an item to an array if the storeItem is null", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();
		defaultCall.mode = LoadingModes.add;

		store.$loadOptimizer.add(defaultCall).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: "server says hi!" });
		expect(store.getters["test/null"]).toEqual(["server says hi!"]);
	});

	it("should add two calls to an item in the store", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();
		const call2 = cloneDefaultCall();
		call2.mode = LoadingModes.add;

		store.$loadOptimizer.add(defaultCall).then(thenFn);
		call2.url = "/api/users";
		store.$loadOptimizer.add(call2).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));

		mockAxios.mockResponse({ data: ["hi"] });
		mockAxios.mockResponse({ data: ["hello"] });

		expect(mockAxios.get).toHaveBeenCalledTimes(2);

		expect(store.getters["test/null"]).toEqual(["hi", "hello"]);
	});

	it("should prepend to an item in the store", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		defaultCall.mode = LoadingModes.prepend;
		// First set some data in the store
		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: ["server says hi!"] });

		expect(store.getters["test/null"]).toEqual(["server says hi!"]);

		defaultCall.url = "/iets/anders"; // Change url to prevent caching
		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: "First!" });

		expect(store.getters["test/null"]).toEqual(["First!", "server says hi!"]);
	});

	it("should prepend an array to an item in the store", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		defaultCall.mode = LoadingModes.prepend;
		// First set some data in the store
		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: ["server says hi!"] });

		expect(store.getters["test/null"]).toEqual(["server says hi!"]);

		defaultCall.url = "/iets/anders"; // Change url to prevent caching
		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: ["First!"] });

		expect(store.getters["test/null"]).toEqual(["First!", "server says hi!"]);
	});

	it("should prepend two calls to an item in the store", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		defaultCall.mode = LoadingModes.prepend;
		const call2 = cloneDefaultCall();

		store.$loadOptimizer.add(defaultCall);
		call2.url = "/api/users";
		store.$loadOptimizer.add(call2);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).toHaveBeenCalledTimes(2);

		mockAxios.mockResponse({ data: ["hi"] });
		mockAxios.mockResponse({ data: ["hello"] });

		expect(store.getters["test/null"]).toEqual(["hello", "hi"]);
	});

	it("should not extend with string data", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		defaultCall.mode = LoadingModes.extend;
		defaultCall.storeItem = "test/obj";

		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: "hello" });
		expect(store.getters["test/obj"]).toEqual({});
		expect(store.getters["error/warnings"]).toHaveLength(1);
	});

	it("should not extend with boolean data", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		defaultCall.mode = LoadingModes.extend;
		defaultCall.storeItem = "test/obj";

		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: true });
		expect(store.getters["test/obj"]).toEqual({});
		expect(store.getters["error/warnings"]).toHaveLength(1);
	});

	it("should not extend with number data", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		defaultCall.mode = LoadingModes.extend;
		defaultCall.storeItem = "test/obj";

		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: 1234 });
		expect(store.getters["test/obj"]).toEqual({});
		expect(store.getters["error/warnings"]).toHaveLength(1);
	});

	it("should not extend with array data", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		defaultCall.mode = LoadingModes.extend;
		defaultCall.storeItem = "test/obj";

		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: [true] });
		expect(store.getters["test/obj"]).toEqual({});
		expect(store.getters["error/warnings"]).toHaveLength(1);
	});

	it("should extend with object data", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		defaultCall.mode = LoadingModes.extend;
		defaultCall.storeItem = "test/obj";

		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: { hi: "Hello there" } });
		expect(store.getters["test/obj"]).toEqual({ hi: "Hello there" });

		defaultCall.url = "/iets/anders"; // Change url to prevent caching
		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: { hello: "Hi there" } });

		expect(store.getters["test/obj"]).toEqual({ hi: "Hello there", hello: "Hi there" });
	});

	it("should extend two calls to an item in the store", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		defaultCall.mode = LoadingModes.extend;
		defaultCall.storeItem = "test/obj";
		const call2 = cloneDefaultCall();

		store.$loadOptimizer.add(defaultCall);
		call2.url = "/api/users";
		store.$loadOptimizer.add(call2);
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).toHaveBeenCalledTimes(2);

		mockAxios.mockResponse({ data: { hi: "hi" } });
		mockAxios.mockResponse({ data: { hello: "hello" } });

		expect(store.getters["test/obj"]).toEqual({ hi: "hi", hello: "hello" });
	});

	it("should extend with object data, overwriting the original", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		defaultCall.mode = LoadingModes.extend;
		defaultCall.storeItem = "test/obj";

		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: { hi: "Hello there" } });
		expect(store.getters["test/obj"]).toEqual({ hi: "Hello there" });

		defaultCall.url = "/iets/anders"; // Change url to prevent caching
		store.$loadOptimizer.add(defaultCall);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: { hi: "Hi there" } });

		expect(store.getters["test/obj"]).toEqual({ hi: "Hi there" });
	});

	it("should cache a call", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();

		// Do the call two times
		store.$loadOptimizer.add(defaultCall).then(thenFn);
		store.$loadOptimizer.add(defaultCall).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: true });
		expect(mockAxios.get).toHaveBeenCalledTimes(1);
		expect(thenFn).toBeCalledTimes(2);
	});

	it("should not cache a call when specified", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();

		// Do the call two times
		store.$loadOptimizer.add(defaultCall).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: true });

		store.$loadOptimizer.add(defaultCall, false).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));
		mockAxios.mockResponse({ data: true });

		expect(mockAxios.get).toHaveBeenCalledTimes(2);
		expect(thenFn).toBeCalledTimes(2);
	});

	it("should set defaultoptions", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const defaultoptions = new DefaultOptions();
		const call = {
			url: "/api/hosts",
			storeItem: "test/null"
		};
		store.$loadOptimizer.add(call);
		await new Promise(resolve => setTimeout(resolve, 50));
		expect(store.getters["loadOptimizer/pendingCall"](call)).not.toBeUndefined();
		expect(store.getters["loadOptimizer/pendingCall"](call)[0].options).toMatchObject(
			Object.assign(defaultoptions, call)
		);
	});

	it("should send an array of calls", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();
		const call1 = {
			url: "/api/hosts",
			storeItem: "test/null"
		};
		const call2 = {
			url: "/iets/anders",
			storeItem: "test/string"
		};
		store.$loadOptimizer.add([call1, call2]).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));
		expect(mockAxios.get).toHaveBeenCalledTimes(2);
		mockAxios.mockResponseFor("/api/hosts", { data: true });
		expect(store.getters["test/null"]).toBe(true);
		expect(thenFn).not.toHaveBeenCalled();
		mockAxios.mockResponseFor("/iets/anders", { data: false });
		expect(store.getters["test/string"]).toBe(false);
		expect(thenFn).toHaveBeenCalled();
	});

	it("should not call success on a failed array of calls", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const successFn = jest.fn();
		const errorFn = jest.fn();
		const call1 = {
			url: "/api/hosts",
			storeItem: "test/null"
		};
		store.$loadOptimizer.add([call1]).then(successFn, errorFn);
		await new Promise(resolve => setTimeout(resolve, 50));
		expect(mockAxios.get).toHaveBeenCalledTimes(1);
		mockAxios.mockError({ response: "er is helaas iets misgegaan" });
		expect(errorFn).toHaveBeenCalled();
		expect(successFn).not.toHaveBeenCalled();
	});

	it("should not execute a call that was already done serverside", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();
		const call2 = cloneDefaultCall();

		// Do the call two times
		store.$loadOptimizer.add(defaultCall).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 50));
		const responseObj = { data: "server says hello!" };
		mockAxios.mockResponse(responseObj);

		const loadOptimizer = createLoadOptimizer(
			{
				$root: {
					$el: {
						dataset: {
							"server-rendered": false
						}
					}
				}
			},
			store,
			undefined
		);

		store.$loadOptimizer = loadOptimizer;

		store.$loadOptimizer.add(call2).then(thenFn);
		await new Promise(resolve => setTimeout(resolve, 200));

		expect(mockAxios.get).toHaveBeenCalledTimes(1);
		expect(thenFn).toBeCalledTimes(2);
	});

	it("replaces the the previous call with same storeItem if LoadingMode is Replace", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();
		const thenFn2 = jest.fn();

		// Do the call two times
		store.$loadOptimizer.add(defaultCall).then(thenFn);
		store.$loadOptimizer.add(cloneDefaultCall()).then(thenFn2);
		await new Promise(resolve => setTimeout(resolve, 50));
		const responseObj = { data: "server says hello!" };
		mockAxios.mockResponse(responseObj);

		expect(mockAxios.get).toHaveBeenCalledTimes(1);
		expect(thenFn).toBeCalledWith({ status: ResponseStatuses.skipped });
		expect(thenFn2).toBeCalled();
	});

	it("executes both calls with same storeItem if 2nd LoadingMode is not Replace", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();
		const thenFn2 = jest.fn();
		const call2 = cloneDefaultCall();
		const modesToTest = [LoadingModes.add, LoadingModes.extend, LoadingModes.prepend];

		for (const index in modesToTest) {
			call2.mode = modesToTest[index];

			// Do the call two times
			store.$loadOptimizer.add(defaultCall).then(thenFn);
			store.$loadOptimizer.add(call2).then(thenFn2);
			await new Promise(resolve => setTimeout(resolve, 50));
			const responseObj = { data: "server says hello!" };
			mockAxios.mockResponse(responseObj);
			mockAxios.mockResponse(responseObj);

			expect(mockAxios.get).toHaveBeenCalledTimes(2);
			expect(thenFn).not.toBeCalledWith({ status: ResponseStatuses.skipped });
			expect(thenFn2).toBeCalled();

			mockAxios.reset();
			store.$loadOptimizer.clearCache();
		}
	});

	it("should do a call with higher priority before a lower priority call", async () => {
		const store = await createWrapperStore(defaultWrapperOptions);
		createTestModule(store);
		const thenFn = jest.fn();

		const call1 = defaultCall;
		const call2 = {
			url: "/api/users",
			storeItem: "test/string", // Need to change storeItem otherwise the first call wont be done.
			serverSide: true,
			priority: 2
		};

		store.$loadOptimizer.add(call1).then(thenFn);
		store.$loadOptimizer.add(call2).then(thenFn);

		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).toHaveBeenCalledTimes(1);
		expect(mockAxios.get).toHaveBeenNthCalledWith(1, "/api/users", options);
		mockAxios.mockResponse({ data: "hallo" });
		expect(thenFn).toHaveBeenCalledTimes(1);

		await new Promise(resolve => setTimeout(resolve, 50));
		expect(mockAxios.get).toHaveBeenCalledTimes(2);
		expect(mockAxios.get).toHaveBeenNthCalledWith(2, "/api/hosts", options);
		mockAxios.mockResponse({ data: "hoi" });
		expect(thenFn).toHaveBeenCalledTimes(2);
	});
});
