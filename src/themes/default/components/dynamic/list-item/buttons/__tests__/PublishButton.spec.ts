import PublishButton from "../PublishButton.vue";
import { createWrapper } from "utils/wrapper";

describe("PublishButton", () => {
	it("should call action on button click", async () => {
		const wrapper = await createWrapper(PublishButton, {
			themePark: true,
			store: true,
			props: {
				item: {
					guid: "test_guid"
				}
			}
		});
		const publishFn = jest.fn();
		wrapper.vm.$store.hotUpdate({
			actions: {
				"search/indexItem": publishFn
			}
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(publishFn).toHaveBeenCalled();
	});
});
