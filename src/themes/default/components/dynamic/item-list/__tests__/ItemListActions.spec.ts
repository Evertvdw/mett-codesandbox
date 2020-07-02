import ItemListActions from "../ItemListActions.vue";
import { createWrapper } from "utils/wrapper";

describe("ItemListActions", () => {
	// This item currently has no suitable things to unit test
	// It's behaviour can better be tested with an integration test
	it("dummy test", async () => {
		const wrapper = await createWrapper(ItemListActions, {
			themePark: true
		});
		await wrapper.vm.$nextTick();
		expect(wrapper).toBeDefined();
	});
});
