import TasksItem from "../TasksItem.vue";
import { createWrapper } from "utils/wrapper";

TasksItem.directive("ripple", {
	bind() {
		return;
	}
});

describe("TasksItem", () => {
	// This item currently has no suitable things to unit test
	it("dummy test", async () => {
		const wrapper = await createWrapper(TasksItem, {});
		expect(wrapper).toBeDefined();
	});
});
