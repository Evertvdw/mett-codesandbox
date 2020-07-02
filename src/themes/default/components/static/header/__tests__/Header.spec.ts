import Header from "../Header.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";

describe("Default Header", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true,
		themePark: true
	};

	it("should not show site-title if site-logo is visible", async () => {
		const wrapper = await createWrapper(Header, {
			...defaultWrapperOptions
		});
		await wrapper.vm.$nextTick();

		expect(wrapper.find(".mett-site-title").exists()).toBe(false);
		expect(wrapper.find(".mett-site-logo").exists()).toBe(true);
	});

	it("should not show site-logo if site-title is visible", async () => {
		const wrapper = await createWrapper(Header, {
			...defaultWrapperOptions,
			data: {
				showLogo: false
			}
		});
		await wrapper.vm.$nextTick();

		expect(wrapper.find(".mett-site-logo").exists()).toBe(false);
		expect(wrapper.find(".mett-site-title").exists()).toBe(true);
	});

	it("should have gt-sm class on the main-menu", async () => {
		const wrapper = await createWrapper(Header, {
			...defaultWrapperOptions
		});
		await wrapper.vm.$nextTick();

		const mainMenu = wrapper.find(".mett-main-menu");
		expect(mainMenu.exists()).toBe(true);
		expect(mainMenu.classes("gt-sm")).toBe(true);
	});

	it("should have gt-sm class on the shortcuts", async () => {
		const wrapper = await createWrapper(Header, {
			...defaultWrapperOptions
		});
		await wrapper.vm.$nextTick();

		const mainMenu = wrapper.find(".mett-shortcuts");
		expect(mainMenu.exists()).toBe(true);
		expect(mainMenu.classes("gt-sm")).toBe(true);
	});
});
