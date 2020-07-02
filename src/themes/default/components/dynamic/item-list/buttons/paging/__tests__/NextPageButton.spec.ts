import NextPageButton from "../NextPageButton.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";

describe("NextPageButton", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true,
		props: {
			item: {
				guid: "test_guid"
			}
		}
	};

	it("should go to next page on button click", async () => {
		const wrapper = await createWrapper(NextPageButton, {
			...defaultWrapperOptions
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect((wrapper.vm as any).currentPage).toBe(2);
	});

	it("should disable the button if currentPage equals pageSize", async () => {
		const wrapper = await createWrapper(NextPageButton, {
			...defaultWrapperOptions,
			computed: {
				currentPage() {
					return 5;
				},
				pageSize() {
					return 5;
				}
			}
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		expect(btn.attributes("disabled")).toBeDefined();
	});

	it("should not disable the button if currentPage does not equal pageSize", async () => {
		const wrapper = await createWrapper(NextPageButton, {
			...defaultWrapperOptions,
			computed: {
				currentPage() {
					return 4;
				},
				pageSize() {
					return 5;
				}
			}
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		expect(btn.attributes("disabled")).not.toBeDefined();
	});
});
