import DeleteButton from "../DeleteButton.vue";
import { createWrapper } from "utils/wrapper";

describe("DeleteButton", () => {
	it("should call action on button click", async () => {
		const wrapper = await createWrapper(DeleteButton, {
			themePark: true,
			store: true,
			props: {
				item: {
					guid: "test_guid"
				}
			}
		});
		const deleteFn = jest.fn();
		wrapper.vm.$store.hotUpdate({
			actions: {
				"page/deleteItem": deleteFn
			}
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		const dialog = wrapper.vm.$store.getters["dialog/dialogs"][0];
		expect(dialog).toBeDefined();
		await wrapper.vm.$store.dispatch("dialog/resolveDialog", { dialog });
		await wrapper.vm.$nextTick();
		expect(deleteFn).toHaveBeenCalled();
	});
});
