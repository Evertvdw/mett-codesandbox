import NotificationsItem from "../NotificationsItem.vue";
import { createWrapper } from "utils/wrapper";

NotificationsItem.directive("ripple", {
	bind() {
		return;
	}
});

describe("NotificationsItem", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(NotificationsItem, {});
		expect(wrapper).toBeDefined();
	});
});
