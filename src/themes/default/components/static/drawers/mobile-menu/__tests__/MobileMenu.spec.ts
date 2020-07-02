import { createWrapper } from "utils/wrapper";
import MobileMenu from "../MobileMenu.vue";

MobileMenu.directive("touch-swipe", {
	bind() {
		return;
	}
});

describe("MobileMenu", () => {
	it("should show logo if that prop is true", async () => {
		const wrapper = await createWrapper(MobileMenu, {
			store: true,
			themePark: true,
			data: {
				showLogo: true
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".mett-site-logo").exists()).toBe(true);
	});

	it("should hide logo if that prop is false", async () => {
		const wrapper = await createWrapper(MobileMenu, {
			store: true,
			themePark: true,
			data: {
				showLogo: false
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".mett-site-logo").exists()).toBe(false);
	});

	// Tried to test touch-swipe close but could not get that to work :(
	// Probably a bit to complicated for a unit test -> Integration test?
});
