import ViewSwitch from "../ViewSwitch.vue";
import { createWrapper } from "utils/wrapper";
import { ViewTypes } from "src/store/settings/types";
import { WrapperOptions } from "utils/types";

describe("ViewSwitch", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true,
		props: {
			item: {
				guid: "test_guid"
			},
			currentViewType: ViewTypes.card
		}
	};

	it("should have a card and list button", async () => {
		const wrapper = await createWrapper(ViewSwitch, defaultWrapperOptions);
		await wrapper.vm.$nextTick();
		expect(wrapper.contains(".mett-view-switch-button-list")).toBe(true);
		expect(wrapper.contains(".mett-view-switch-button-card")).toBe(true);
	});

	it("should change viewType to list when clicking list button", async () => {
		const wrapper = await createWrapper(ViewSwitch, defaultWrapperOptions);
		await wrapper.vm.$nextTick();
		const listBtn = wrapper.find(".mett-view-switch-button-list");
		expect(listBtn.classes("mett-selected")).toBe(false);
		listBtn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["settings/personalByKey"]("test_guid_viewType")).toBe(ViewTypes.list);
		expect(listBtn.classes("mett-selected")).toBe(true);
	});

	it("should change viewType to card when clicking card button", async () => {
		const wrapper = await createWrapper(ViewSwitch, {
			store: true,
			props: {
				item: {
					guid: "test_guid"
				},
				currentViewType: ViewTypes.list
			}
		});
		await wrapper.vm.$nextTick();
		const cardBtn = wrapper.find(".mett-view-switch-button-card");
		expect(cardBtn.classes("mett-selected")).toBe(false);
		cardBtn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["settings/personalByKey"]("test_guid_viewType")).toBe(ViewTypes.card);
		expect(cardBtn.classes("mett-selected")).toBe(true);
	});
});
