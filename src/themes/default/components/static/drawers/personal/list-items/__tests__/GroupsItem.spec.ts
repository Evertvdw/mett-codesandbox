import GroupsItem from "../GroupsItem.vue";
import { createWrapper } from "utils/wrapper";

GroupsItem.directive("ripple", {
	bind() {
		return;
	}
});

describe("GroupsItem", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(GroupsItem, {});
		expect(wrapper).toBeDefined();
	});
});
