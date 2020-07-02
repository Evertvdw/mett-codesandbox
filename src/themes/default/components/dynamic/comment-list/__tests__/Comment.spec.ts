import { createWrapper } from "utils/wrapper";
import Comment from "../Comment.vue";

describe("Comment", () => {
	it("should have an avatar displayed", async () => {
		const wrapper = await createWrapper(Comment, {
			themePark: true,
			store: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.contains(".q-avatar")).toBe(true);
	});

	it("should have an author displayd", async () => {
		const wrapper = await createWrapper(Comment, {
			themePark: true,
			store: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.contains(".mett-author")).toBe(true);
	});

	it("should have an date displayd", async () => {
		const wrapper = await createWrapper(Comment, {
			themePark: true,
			store: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.contains(".mett-date")).toBe(true);
	});

	it("should have an input textarea field", async () => {
		const wrapper = await createWrapper(Comment, {
			themePark: true,
			store: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.contains(".mett-comment-content")).toBe(true);
	});

	it("should have a reply button", async () => {
		const wrapper = await createWrapper(Comment, {
			themePark: true,
			store: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.contains(".q-btn")).toBe(true);
	});

	// Todo: Create more tests if necessary, when content is dynamic
});
