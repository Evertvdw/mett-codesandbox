import ItemDescription from "../ItemDescription.vue";
import { createWrapper } from "utils/wrapper";
import { TemplateElementDisplayTypeDto } from "src/mett/communication/types";

describe("ItemDescription", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(ItemDescription, {
			themePark: true,
			store: true,
			data: {
				dpType: {
					value: () => TemplateElementDisplayTypeDto.List
				}
			},
			props: {
				item: {
					relatedItems: []
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper).toBeDefined();
	});
});
