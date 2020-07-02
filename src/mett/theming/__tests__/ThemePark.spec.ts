/* eslint-disable no-empty */
jest.unmock("src/mett/theming/theme-park");

import { createWrapper, createWrapperThemePark } from "utils/wrapper";

import TestComponent from "./components/TestComponent.vue";
import TestComponent2 from "./components/TestComponent2.vue";
import EmptyTestComponent from "./components/EmptyTestComponent.vue";

describe("ThemePark", () => {
	it("initialize the themepark", async () => {
		const themePark = await createWrapperThemePark();
		expect(themePark).toBeDefined();
	});

	it("should load a theme that exists", async () => {
		const themePark = await createWrapperThemePark();
		await expect(themePark.loadTheme("default", true)).resolves.toBeUndefined();
		expect(themePark.getThemeName()).toBe("Default Theme");
	});

	it("should not load a theme that does not exist", async () => {
		const themePark = await createWrapperThemePark();
		await expect(themePark.loadTheme("rinsestyle", true)).rejects.toThrow();
	});

	it("should get a component that exists", async () => {
		const themePark = await createWrapperThemePark();
		await expect(themePark.loadTheme("default", true)).resolves.toBeUndefined();
		await expect(themePark.getComponent("Components.DefaultComponent", "defaultComponent")).resolves.toBeDefined();
	});

	it("should not get a component that does not exist", async () => {
		const themePark = await createWrapperThemePark();
		await expect(themePark.loadTheme("default", true)).resolves.toBeUndefined();
		await expect(themePark.getComponent("Components.AwesomeComponent", "awesomeComponent")).rejects.toBeUndefined();
	});

	it("should get a component that exists in a folder", async () => {
		const themePark = await createWrapperThemePark();
		await expect(themePark.loadTheme("default", true)).resolves.toBeUndefined();
		await expect(themePark.getComponent("Components.Folder", "folder")).resolves.toBeDefined();
	});

	it("should not get a component that is not inherited", async () => {
		const themePark = await createWrapperThemePark();
		await expect(themePark.loadTheme("default", true)).resolves.toBeUndefined();
		await expect(themePark.getComponent("Components.AwesomeComponent", "awesomeComponent")).rejects.toBeUndefined();
	});

	it("should get a component that is inherited", async () => {
		const themePark = await createWrapperThemePark();
		await expect(themePark.loadTheme("awesome", true)).resolves.toBeUndefined();
		await expect(themePark.getComponent("Components.Folder", "folder")).resolves.toBeDefined();
	});

	it("should load a component through the themepark when mounting", async () => {
		const wrapper = await createWrapper(TestComponent, {
			themePark: true,
			store: true,
			router: true
		});
		await wrapper.vm.$themePark.loadTheme("default", true);
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toBe("DefaultComponent");
	});

	it("should execute send asyncPayload to asyncLoad function", async () => {
		const wrapper = await createWrapper(TestComponent2, {
			themePark: true,
			store: true,
			router: true
		});
		wrapper.vm.$store.registerModule("test", {
			namespaced: true,
			state: {
				test: null
			},
			getters: {
				test: state => state.test
			},
			mutations: {
				test(state, payload) {
					state.test = payload;
				}
			}
		});
		await wrapper.vm.$themePark.loadTheme("default", true);
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toBe("DefaultComponent");
		expect(wrapper.vm.$store.getters["test/test"]).toEqual("whatever");
	});

	it("should be able to load the error theme", async () => {
		const themePark = await createWrapperThemePark();
		await expect(themePark.loadErrorTheme()).resolves.toBeUndefined();
		expect(themePark.getThemeName()).toBe("Error");
	});

	it("should set errorThemeLoaded to true in the host store when Error Theme is loaded", async () => {
		const wrapper = await createWrapper(EmptyTestComponent, {
			themePark: true,
			store: true,
			router: true
		});

		await expect(wrapper.vm.$themePark.loadErrorTheme()).resolves.toBeUndefined();
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$store.getters["host/errorThemeLoaded"]).toBe(true);
	});
});
