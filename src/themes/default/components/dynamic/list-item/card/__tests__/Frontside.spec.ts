import Frontside from "../Frontside.vue";
import { createWrapper } from "utils/wrapper";

describe("Frontside", () => {
	it("should emit flip on settings-button click", async () => {
		const wrapper = await createWrapper(Frontside, {
			themePark: true,
			props: {
				item: {
					guid: "test_guid"
				}
			}
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".mett-list-item-settings-button");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().flip).toBeTruthy();
	});

	it("should emit flip on publish-button click", async () => {
		const wrapper = await createWrapper(Frontside, {
			themePark: true,
			props: {
				item: {
					guid: "test_guid"
				}
			}
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".mett-list-item-publish-button");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().flip).toBeTruthy();
	});
});
