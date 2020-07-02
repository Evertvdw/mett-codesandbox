import SiteTitle from "../SiteTitle.vue";
import { createWrapper } from "utils/wrapper";

describe("SiteTitle", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(SiteTitle, {});
		expect(wrapper).toBeDefined();
	});
});
