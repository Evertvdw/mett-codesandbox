import CommentList from "../CommentList.vue";
import { createWrapper } from "utils/wrapper";

describe("CommentList", () => {
	it("should contain comment and addComment components", async () => {
		const wrapper = await createWrapper(CommentList, {
			themePark: true,
			store: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.find(".mett-add-comment").exists()).toBe(true);
		expect(wrapper.find(".mett-comment").exists()).toBe(true);
	});

	// Todo: Create tests if necessary, when content is dynamic
});
