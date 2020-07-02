import Avatar from "../Avatar.vue";
import { createWrapper } from "utils/wrapper";

describe("Avatar", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(Avatar, {});
		expect(wrapper).toBeDefined();
	});
});
