import Row from "../Row.vue";
import { createWrapper } from "utils/wrapper";

describe("Row", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(Row, {});
		await wrapper.vm.$nextTick();
		expect(wrapper).toBeDefined();
	});
});
