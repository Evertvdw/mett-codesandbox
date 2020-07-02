import { createWrapper } from "utils/wrapper";
import AddComment from "../AddComment.vue";

describe("AddComment", () => {
	it("should have an avatar displayed", async () => {
		const wrapper = await createWrapper(AddComment, {
			themePark: true,
			store: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.contains(".q-avatar")).toBe(true);
	});

	it("should have an input textarea field", async () => {
		const wrapper = await createWrapper(AddComment, {
			themePark: true,
			store: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.contains("textarea")).toBe(true);
	});

	it("should have a submit button", async () => {
		const wrapper = await createWrapper(AddComment, {
			themePark: true,
			store: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.contains(".q-btn")).toBe(true);
	});

	// Todo: Create more tests if necessary, when content is dynamic
});
