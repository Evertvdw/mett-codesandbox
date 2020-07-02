import Backside from "../Backside.vue";
import { createWrapper } from "utils/wrapper";

describe("Backside", () => {
	it("should emit flip on button click", async () => {
		const wrapper = await createWrapper(Backside, {
			themePark: true,
			store: true,
			props: {
				item: {
					guid: "test_guid"
				}
			}
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".mett-list-item-back-button");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().flip).toBeTruthy();
	});
});
