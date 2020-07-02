import MenuButton from "../MenuButton.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";

describe("MenuButton", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true
	};

	it("should toggle the mobile menu in the store when clicking the button", async () => {
		const wrapper = await createWrapper(MenuButton, defaultWrapperOptions);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["layout/mobileMenuDrawer"]).toBe(false);
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["layout/mobileMenuDrawer"]).toBe(true);
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["layout/mobileMenuDrawer"]).toBe(false);
	});
});
