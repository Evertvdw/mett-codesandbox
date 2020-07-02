import Card from "../Card.vue";
import { createWrapper } from "utils/wrapper";

describe("Card", () => {
	// Todo: Create a useful test for this component if possible. As everything is wrapped within a dynamic component, those elements are not rendered
	it("dummy test", async () => {
		const wrapper = await createWrapper(Card, {
			themePark: true
		});
		await wrapper.vm.$nextTick();
		expect(true).toBe(true);
	});
});
