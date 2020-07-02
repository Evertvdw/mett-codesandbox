import ItemTitle from "../ItemTitle.vue";
import { createWrapper } from "utils/wrapper";
import { TemplateElementDisplayTypeDto } from "src/mett/communication/types";

describe("ItemTitle", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(ItemTitle, {
			themePark: true,
			data: {
				dpType: {
					value: () => TemplateElementDisplayTypeDto.List
				}
			},
			props: {
				item: {
					relatedItems: []
				}
			},
			store: true
		});
		await wrapper.vm.$nextTick();
		expect(wrapper).toBeDefined();
	});
});
