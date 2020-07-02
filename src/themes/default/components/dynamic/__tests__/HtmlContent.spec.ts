import HtmlContent from "../HtmlContent.vue";
import { createWrapper } from "utils/wrapper";
import { TemplateElementDisplayTypeDto } from "src/mett/communication/types";

describe("HtmlContent", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(HtmlContent, {
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
