import ChatItem from "../ChatItem.vue";
import { createWrapper } from "utils/wrapper";

ChatItem.directive("ripple", {
	bind() {
		return;
	}
});

describe("ChatItem", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(ChatItem, {});
		expect(wrapper).toBeDefined();
	});
});
