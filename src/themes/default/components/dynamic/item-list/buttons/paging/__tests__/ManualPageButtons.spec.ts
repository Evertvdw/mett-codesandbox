import ManualPageButtons from "../ManualPageButtons.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";

describe("ManualPageButtons", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true,
		props: {
			item: {
				guid: "test_guid"
			}
		}
	};

	it("should have currentPage button highlighted with primary text color", async () => {
		const wrapper = await createWrapper(ManualPageButtons, {
			...defaultWrapperOptions,
			computed: {
				currentPage() {
					return 1;
				},
				pageSize() {
					return 10;
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect((wrapper.vm as any).currentPage).toBe(1);
		const btn = wrapper.find(".q-btn.text-primary");
		expect(btn).toBeDefined();
		expect(btn.text()).toBe("1");
	});

	it("should have all other buttons with secondary text color", async () => {
		const wrapper = await createWrapper(ManualPageButtons, {
			...defaultWrapperOptions,
			computed: {
				currentPage() {
					return 1;
				},
				pageSize() {
					return 10;
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect((wrapper.vm as any).currentPage).toBe(1);
		const btns = wrapper.findAll(".q-btn.text-secondary");
		expect(btns.length).toBe((wrapper.vm as any).manualPages.length - 1);
	});

	it("should have a maximum of 7 buttons", async () => {
		const wrapper = await createWrapper(ManualPageButtons, {
			...defaultWrapperOptions,
			computed: {
				currentPage() {
					return 1;
				},
				pageSize() {
					return 10;
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect((wrapper.vm as any).manualPages.length).toBeLessThanOrEqual(7);
	});

	it("should have a maximum of 7 buttons above and below the currentpage", async () => {
		const wrapper = await createWrapper(ManualPageButtons, {
			...defaultWrapperOptions,
			computed: {
				currentPage() {
					return 5;
				},
				pageSize() {
					return 10;
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect((wrapper.vm as any).manualPages.length).toBeLessThanOrEqual(7);
		expect((wrapper.vm as any).manualPages).toEqual([2, 3, 4, 5, 6, 7, 8]);
	});

	it("should not have more buttons than the pageSize", async () => {
		const wrapper = await createWrapper(ManualPageButtons, {
			...defaultWrapperOptions,
			computed: {
				currentPage() {
					return 1;
				},
				pageSize() {
					return 5;
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect((wrapper.vm as any).manualPages.length).toBeLessThanOrEqual(5);
		expect((wrapper.vm as any).manualPages).toEqual([1, 2, 3, 4, 5]);
	});

	it("should change the currentPage if a manualPagebutton is clicked", async () => {
		const wrapper = await createWrapper(ManualPageButtons, {
			...defaultWrapperOptions,
			computed: {
				pageSize() {
					return 10;
				}
			}
		});
		const mockFn = jest.fn();
		wrapper.vm.$store.hotUpdate({
			actions: { "settings/setQuerySetting": mockFn }
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn.text-secondary");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(mockFn).toHaveBeenCalled();
		expect((wrapper.vm as any).currentPage).toBe(Number(btn.text()));
	});
});
