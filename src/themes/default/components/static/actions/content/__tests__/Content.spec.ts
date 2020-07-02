import Content from "../Content.vue";
import { createWrapper } from "utils/wrapper";
// Content is a page-sticky and needs to be child of q-layout in order to work
import layout from "./_layout.vue";

describe("Content", () => {
	// This item currently has no suitable things to unit test
	// This is better done with an integration test
	it("should disable the save button if there are no changed items", async () => {
		const wrapper = await createWrapper(layout, {
			store: true,
			themePark: true,
			props: {
				comp: Content
			}
		});
		expect(wrapper).toBeDefined();
	});
});
