import Default from "../Default.vue";
import { createWrapper } from "utils/wrapper";
import { TemplateElementDisplayTypeDto } from "src/mett/communication/types";

describe("Default", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(Default, {
			data: {
				dpType: {
					value: () => TemplateElementDisplayTypeDto.List
				}
			},
			store: true
		});
		await wrapper.vm.$nextTick();
		expect(wrapper).toBeDefined();
	});
});
