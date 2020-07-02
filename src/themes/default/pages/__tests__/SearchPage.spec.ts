import SearchPage from "../SearchPage.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";

describe("pages/SearchPage", () => {
	const defaultWrapperOptions: WrapperOptions = {
		themePark: true,
		router: {
			route: "/search?q=test%20query"
		}
	};

	it("gets query by route", async () => {
		const wrapper = await createWrapper(SearchPage, defaultWrapperOptions);

		await wrapper.vm.$nextTick();

		expect((wrapper.vm as any).query).toBe("test query");
	});
});
