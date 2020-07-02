import CmsItem from "../CmsItem.vue";
import { createWrapper } from "utils/wrapper";

CmsItem.directive("ripple", {
	bind() {
		return;
	}
});

describe("CmsItem", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(CmsItem, {});
		expect(wrapper).toBeDefined();
	});
});
