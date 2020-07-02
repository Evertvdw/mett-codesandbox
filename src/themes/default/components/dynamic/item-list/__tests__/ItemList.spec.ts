import ItemList from "../ItemList.vue";
import { createWrapper } from "utils/wrapper";
import { TemplateElementDisplayTypeDto } from "src/mett/communication/types";
import { ViewTypes } from "src/store/settings/types";
import { WrapperOptions } from "utils/types";

describe("ItemList", () => {
	const defaultWrapperOptions: WrapperOptions = {
		props: {
			item: {
				id: 5,
				itemType: "Element",
				name: "Item description",
				value: "Home description",
				valueType: "String",
				template: null,
				templateElement: null,
				templateModelElement: {
					name: "Item description",
					modelElementType: "Text",
					displayType: "Default",
					options: null,
					guid: "9c5f1201-ee7b-4604-a522-134d45f79f09",
					createdOn: "2020-03-31T11:02:14.8719086",
					updatedOn: "0001-01-01T00:00:00"
				},
				relatedItems: [],
				file: null,
				options: null,
				likeCount: 0,
				childItemCount: 0,
				createdById: 1,
				updatedById: 0,
				isBeingDeleted: false,
				guid: "c5c80f22-8bfc-4721-bf27-5d3b695bbc7c",
				createdOn: "2020-03-31T09:02:15.6839366",
				updatedOn: "0001-01-01T00:00:00"
			}
		},
		data: {
			dpType: {
				value: () => TemplateElementDisplayTypeDto.List
			}
		},
		themePark: true,
		store: true,
		router: true
	};

	it("should have a viewswitch component", async () => {
		const wrapper = await createWrapper(ItemList, defaultWrapperOptions);
		await wrapper.vm.$nextTick();
		expect(wrapper.contains(".mett-view-switch")).toBe(true);
	});

	it("should have an itemsplaceholder", async () => {
		const wrapper = await createWrapper(ItemList, defaultWrapperOptions);
		await wrapper.vm.$nextTick();
		expect(wrapper.contains(".mett-items-placeholder")).toBe(true);
	});

	it("should have an previous page button", async () => {
		const wrapper = await createWrapper(ItemList, defaultWrapperOptions);
		await wrapper.vm.$nextTick();
		expect(wrapper.contains(".mett-previous-page-button")).toBe(true);
	});

	it("should have manual page buttons", async () => {
		const wrapper = await createWrapper(ItemList, defaultWrapperOptions);
		await wrapper.vm.$nextTick();
		expect(wrapper.contains(".mett-manual-page-buttons")).toBe(true);
	});

	it("should have an next page button", async () => {
		const wrapper = await createWrapper(ItemList, defaultWrapperOptions);
		await wrapper.vm.$nextTick();
		expect(wrapper.contains(".mett-next-page-button")).toBe(true);
	});

	it("should have a not have a item-list-actions component in view mode", async () => {
		const wrapper = await createWrapper(ItemList, defaultWrapperOptions);
		await wrapper.vm.$nextTick();
		expect(wrapper.contains(".mett-item-list-actions")).toBe(false);
	});

	it("should not have a item-list-actions component in edit mode", async () => {
		const wrapper = await createWrapper(ItemList, defaultWrapperOptions);
		wrapper.vm.$router.push("home/edit");
		await wrapper.vm.$nextTick();
		expect((wrapper.vm as any).isEdit).toBe(true);
		expect(wrapper.vm.$route.name).toBe("EditPage");
		await wrapper.vm.$nextTick();
		expect(wrapper.contains(".mett-item-list-actions")).toBe(true);
	});

	it("should not have a view-switch component in edit mode", async () => {
		const wrapper = await createWrapper(ItemList, defaultWrapperOptions);
		wrapper.vm.$router.push("home/edit");
		await wrapper.vm.$nextTick();
		expect(wrapper.contains(".mett-view-switch")).toBe(false);
	});

	it("should default to a card list view", async () => {
		const wrapper = await createWrapper(ItemList, defaultWrapperOptions);
		await wrapper.vm.$nextTick();
		expect((wrapper.vm as any).viewType).toBe(ViewTypes.card);
	});

	it("should use a row list view if specified", async () => {
		const wrapper = await createWrapper(ItemList, defaultWrapperOptions);
		wrapper.vm.$store.dispatch("settings/setPersonalSetting", {
			key: (wrapper.vm as any).item.guid + "_viewType",
			value: ViewTypes.list
		});
		await wrapper.vm.$nextTick();
		expect((wrapper.vm as any).viewType).toBe(ViewTypes.list);
	});

	it("should get new pageItems if the current page of the list changes", async () => {
		const wrapper = await createWrapper(ItemList, defaultWrapperOptions);
		const mockFn = jest.fn();
		wrapper.vm.$store.hotUpdate({
			actions: { "page/loadChildItems": mockFn }
		});
		wrapper.vm.$store.dispatch("settings/setQuerySetting", {
			key: (wrapper.vm as any).item.guid,
			value: { page: 2 }
		});
		await wrapper.vm.$nextTick();
		expect(mockFn).toHaveBeenCalled();
	});
});
