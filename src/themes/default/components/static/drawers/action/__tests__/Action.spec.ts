import { createWrapper } from "utils/wrapper";
import Action from "../Action.vue";
import test from "./_test.vue";

describe("Action", () => {
	it("should display the component in mettContent", async () => {
		const wrapper = await createWrapper(Action, {
			themePark: true,
			store: true,
			computed: {
				mettContent() {
					return test;
				}
			}
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toBe("Hello there!");
	});

	it("should have a close button", async () => {
		const wrapper = await createWrapper(Action, {
			themePark: true,
			store: true,
			computed: {
				mettContent() {
					return test;
				}
			}
		});

		await wrapper.vm.$nextTick();
		expect(wrapper.find(".mett-action-drawer-close-button").exists()).toBe(true);
	});
});
