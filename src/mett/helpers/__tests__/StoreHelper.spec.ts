import { Store } from "vuex";
import createStore from "src/store";
import { getStoreItemDataByPath, invalidArgument } from "src/mett/helpers/store-helper";
import { ArgumentType } from "../types";

jest.unmock("src/mett/helpers/store-helper");

describe("Store helper functions", () => {
	let store: Store<object>;

	const createStoreWrapper = function() {
		store = createStore();
		store.registerModule("test", {
			state: {
				array: [],
				nested: {
					item: "hello!"
				}
			}
		});
		return store;
	};

	describe("getStoreItemDataByPath", () => {
		it("should find a store item by path", () => {
			const store = createStoreWrapper();
			const storeItem = getStoreItemDataByPath(store.state, "test/array");
			expect(storeItem).toBeDefined();
			if (storeItem) expect(storeItem.module[storeItem.item]).toEqual([]);
		});

		it("should find a nested store item by path", () => {
			const store = createStoreWrapper();
			const storeItem = getStoreItemDataByPath(store.state, "test/nested/item");
			expect(storeItem).toBeDefined();
			if (storeItem) expect(storeItem.module[storeItem.item]).toEqual("hello!");
		});

		it("should return undefined for a module that does not exist", () => {
			const store = createStoreWrapper();
			const storeItem = getStoreItemDataByPath(store.state, "meh/whatever");
			expect(storeItem).toBeUndefined();
		});

		it("should return undefined for an item that does not exist", () => {
			const store = createStoreWrapper();
			const storeItem = getStoreItemDataByPath(store.state, "test/whatever");
			expect(storeItem).toBeUndefined();
		});

		it("should return undefined if no item is specified", () => {
			const store = createStoreWrapper();
			const storeItem = getStoreItemDataByPath(store.state, "test");
			expect(storeItem).toBeUndefined();
			const storeItem2 = getStoreItemDataByPath(store.state, "test/");
			expect(storeItem2).toBeUndefined();
		});
	});

	describe("invalidArgument", () => {
		it("should return false if one argument matches", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: "Hello there",
					type: [ArgumentType.string]
				}
			]);
			expect(result).toBe(false);
		});

		it("should return false if multiple arguments match", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: "Hello there",
					type: [ArgumentType.string]
				},
				{
					value: true,
					type: [ArgumentType.boolean]
				}
			]);
			expect(result).toBe(false);
		});

		it("should return false if value is one of the types", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: true,
					type: [ArgumentType.boolean, ArgumentType.string]
				}
			]);
			expect(result).toBe(false);
		});

		it("should return false if argument is correctly an array", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: ["Hello there"],
					type: [ArgumentType.array]
				}
			]);
			expect(result).toBe(false);
		});

		it("should return false if argument is correctly null", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: null,
					type: [ArgumentType.null]
				}
			]);
			expect(result).toBe(false);
		});

		it("should return false if argument is correctly undefined", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: undefined,
					type: [ArgumentType.undefined]
				}
			]);
			expect(result).toBe(false);
		});

		it("should return false if argument is correctly an object", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: {
						hi: "Hello"
					},
					type: [ArgumentType.object]
				}
			]);
			expect(result).toBe(false);
		});

		it("should return false if argument is correctly a number", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: 1928,
					type: [ArgumentType.number]
				}
			]);
			expect(result).toBe(false);
		});

		it("should return false if argument is correctly a function", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: () => {},
					type: [ArgumentType.function]
				}
			]);
			expect(result).toBe(false);
		});

		it("should return false if argument is any", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: 1928,
					type: [ArgumentType.any]
				},
				{
					value: "hello",
					type: [ArgumentType.any]
				},
				{
					value: { hi: "hello" },
					type: [ArgumentType.any]
				},
				{
					value: true,
					type: [ArgumentType.any]
				},
				{
					value: [true],
					type: [ArgumentType.any]
				},
				{
					value: null,
					type: [ArgumentType.any]
				},
				{
					value: undefined,
					type: [ArgumentType.any]
				},
				{
					value: () => {},
					type: [ArgumentType.any]
				}
			]);
			expect(result).toBe(false);
		});

		it("should return true if one argument of array does not match", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: "Hello there",
					type: [ArgumentType.string]
				},
				{
					value: 1828,
					type: [ArgumentType.string]
				}
			]);
			expect(result).toBe(true);
		});

		it("should return true if value string does not match type", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: "hello",
					type: [
						ArgumentType.null,
						ArgumentType.undefined,
						ArgumentType.object,
						ArgumentType.array,
						ArgumentType.number,
						ArgumentType.boolean,
						ArgumentType.function
					]
				}
			]);
			expect(result).toBe(true);
		});

		it("should return true if value array does not match type", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: ["hello"],
					type: [
						ArgumentType.null,
						ArgumentType.undefined,
						ArgumentType.object,
						ArgumentType.string,
						ArgumentType.number,
						ArgumentType.boolean,
						ArgumentType.function
					]
				}
			]);
			expect(result).toBe(true);
		});

		it("should return true if value null does not match type", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: null,
					type: [
						ArgumentType.array,
						ArgumentType.undefined,
						ArgumentType.object,
						ArgumentType.string,
						ArgumentType.number,
						ArgumentType.boolean,
						ArgumentType.function
					]
				}
			]);
			expect(result).toBe(true);
		});

		it("should return true if value undefined does not match type", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: undefined,
					type: [
						ArgumentType.array,
						ArgumentType.null,
						ArgumentType.object,
						ArgumentType.string,
						ArgumentType.number,
						ArgumentType.boolean,
						ArgumentType.function
					]
				}
			]);
			expect(result).toBe(true);
		});

		it("should return true if value number does not match type", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: 928,
					type: [
						ArgumentType.null,
						ArgumentType.undefined,
						ArgumentType.object,
						ArgumentType.string,
						ArgumentType.array,
						ArgumentType.boolean,
						ArgumentType.function
					]
				}
			]);
			expect(result).toBe(true);
		});

		it("should return true if value object does not match type", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: {},
					type: [
						ArgumentType.null,
						ArgumentType.undefined,
						ArgumentType.number,
						ArgumentType.string,
						ArgumentType.array,
						ArgumentType.boolean,
						ArgumentType.function
					]
				}
			]);
			expect(result).toBe(true);
		});

		it("should return true if value boolean does not match type", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: false,
					type: [
						ArgumentType.null,
						ArgumentType.undefined,
						ArgumentType.number,
						ArgumentType.string,
						ArgumentType.array,
						ArgumentType.object,
						ArgumentType.function
					]
				}
			]);
			expect(result).toBe(true);
		});

		it("should return true if value function does not match type", () => {
			const result = invalidArgument(store.dispatch, "example/Exampleaction", [
				{
					value: () => {},
					type: [
						ArgumentType.null,
						ArgumentType.undefined,
						ArgumentType.number,
						ArgumentType.string,
						ArgumentType.array,
						ArgumentType.object,
						ArgumentType.boolean
					]
				}
			]);
			expect(result).toBe(true);
		});
	});
});
