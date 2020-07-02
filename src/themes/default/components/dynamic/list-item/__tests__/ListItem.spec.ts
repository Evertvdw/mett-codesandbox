import ListItem from "../ListItem.vue";
import { createWrapper } from "utils/wrapper";
import { TemplateElementDisplayTypeDto } from "src/mett/communication/types";
import { ViewTypes } from "src/store/settings/types";

describe("ListItem", () => {
	const propsData = {
		item: {
			id: 5,
			guid: "c5c80f22-8bfc-4721-bf27-5d3b695bbc7c",
			menuItem: {
				id: 6,
				urlSegment: "nieuwsitem"
			}
		}
	};

	it("should use row as layout with viewType list", async () => {
		const wrapper = await createWrapper(ListItem, {
			themePark: true,
			router: true,
			store: true,
			props: Object.assign(propsData, { currentViewType: ViewTypes.list }),
			data: {
				dpType: {
					value: () => TemplateElementDisplayTypeDto.List
				}
			}
		});

		await wrapper.vm.$nextTick();
		const layout = await (wrapper.vm as any).layoutComponent();
		expect(layout.options.name).toBe("mettRow");
	});

	it("should use card as layout with viewType card", async () => {
		const wrapper = await createWrapper(ListItem, {
			themePark: true,
			router: true,
			store: true,
			props: Object.assign(propsData, { currentViewType: ViewTypes.card }),
			data: {
				dpType: {
					value: () => TemplateElementDisplayTypeDto.List
				}
			}
		});
		await wrapper.vm.$nextTick();
		const layout = await (wrapper.vm as any).layoutComponent();
		expect(layout.options.name).toBe("mettCard");
	});

	it("should use detail as layout with displayType page", async () => {
		const wrapper = await createWrapper(ListItem, {
			themePark: true,
			router: true,
			store: true,
			props: Object.assign(propsData, { currentViewType: ViewTypes.card }),
			data: {
				dpType: {
					value: () => TemplateElementDisplayTypeDto.Page
				}
			}
		});
		await wrapper.vm.$nextTick();
		const layout = await (wrapper.vm as any).layoutComponent();
		expect(layout.options.name).toBe("mettDetail");
	});

	it("should navigate to the menuItem on the item", async () => {
		const wrapper = await createWrapper(ListItem, {
			themePark: true,
			router: true,
			store: true,
			props: Object.assign(propsData, { currentViewType: ViewTypes.card }),
			data: {
				dpType: {
					value: () => TemplateElementDisplayTypeDto.Page
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.path).toBe("/home");
		(wrapper.vm as any).navigateToItem();
		expect(wrapper.vm.$route.path).toBe("/home/item/nieuwsitem");
	});
});
