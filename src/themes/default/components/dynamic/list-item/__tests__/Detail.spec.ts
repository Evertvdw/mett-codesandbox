import Detail from "../Detail.vue";
import { createWrapper } from "utils/wrapper";

describe("Detail", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(Detail, {
			themePark: true
		});
		await wrapper.vm.$nextTick();
		expect(wrapper).toBeDefined();
	});
});
