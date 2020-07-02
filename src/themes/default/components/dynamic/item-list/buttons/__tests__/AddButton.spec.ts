import AddButton from "../AddButton.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";

describe("AddButton", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true,
		props: {
			item: {
				guid: "test_guid"
			}
		}
	};

	it("should call action on button click", async () => {
		const wrapper = await createWrapper(AddButton, defaultWrapperOptions);
		const mockFn = jest.fn();
		wrapper.vm.$store.hotUpdate({
			actions: { "page/addItem": mockFn }
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(mockFn).toHaveBeenCalled();
	});
});
