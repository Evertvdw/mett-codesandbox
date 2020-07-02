import SiteLogo from "../SiteLogo.vue";
import { createWrapper } from "utils/wrapper";

describe("SiteLogo", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(SiteLogo, {});
		expect(wrapper).toBeDefined();
	});
});
