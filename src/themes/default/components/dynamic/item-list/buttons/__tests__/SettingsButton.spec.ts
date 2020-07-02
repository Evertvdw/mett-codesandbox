import SettingsButton from "../SettingsButton.vue";
import { WrapperOptions } from "utils/types";
import { createWrapper } from "utils/wrapper";

describe("SettingsButton", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true,
		props: {
			item: {
				guid: "test_guid"
			}
		}
	};

	it("should call actions on button click", async () => {
		const wrapper = await createWrapper(SettingsButton, defaultWrapperOptions);
		const mockFn = jest.fn();
		wrapper.vm.$store.hotUpdate({
			actions: {
				"actionDrawer/setContent": mockFn,
				"layout/setActionDrawer": mockFn
			}
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(mockFn).toHaveBeenCalledTimes(2);
	});
});
