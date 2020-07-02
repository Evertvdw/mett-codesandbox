import CmsPage from "../CmsPage.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";

describe("pages/CmsPage", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true,
		loadOptimizer: { SSR: false },
		themePark: true,
		router: true
	};

	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(CmsPage, defaultWrapperOptions);
		expect(wrapper).toBeDefined();
	});
});
