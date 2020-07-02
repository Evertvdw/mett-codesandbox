import PreviousPageButton from "../PreviousPageButton.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";

describe("PreviousPageButton", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true,
		props: {
			item: {
				guid: "test_guid"
			}
		}
	};
	it("should go to previous page on button click", async () => {
		const wrapper = await createWrapper(PreviousPageButton, {
			...defaultWrapperOptions
		});
		await wrapper.vm.$nextTick();
		// Set currentPage to 2
		wrapper.vm.$store.dispatch("settings/setQuerySetting", {
			key: "test_guid",
			value: { page: 2 }
		});
		await wrapper.vm.$nextTick();
		expect((wrapper.vm as any).currentPage).toBe(2);
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect((wrapper.vm as any).currentPage).toBe(1);
	});

	it("should disable the button if currentPage equals one", async () => {
		const wrapper = await createWrapper(PreviousPageButton, {
			...defaultWrapperOptions,
			computed: {
				currentPage() {
					return 1;
				}
			}
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		expect(btn.attributes("disabled")).toBeDefined();
	});

	it("should not disable the button if currentPage does not equal 1", async () => {
		const wrapper = await createWrapper(PreviousPageButton, {
			...defaultWrapperOptions,
			computed: {
				currentPage() {
					return 4;
				}
			}
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		expect(btn.attributes("disabled")).not.toBeDefined();
	});
});
