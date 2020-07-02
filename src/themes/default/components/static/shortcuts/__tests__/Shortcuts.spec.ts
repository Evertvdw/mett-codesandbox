import Shortcuts from "../Shortcuts.vue";
import { createWrapper } from "utils/wrapper";

describe("Shortcuts", () => {
	it("should have gt-xs class on error and warning buttons", async () => {
		const wrapper = await createWrapper(Shortcuts, {
			themePark: true,
			store: true,
			router: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$route.name).toBe("ViewPage");

		expect(wrapper.find(".mett-shortcuts-error-button.gt-xs").exists()).toBe(true);
		expect(wrapper.find(".mett-shortcuts-warning-button.gt-xs").exists()).toBe(true);
	});
});
