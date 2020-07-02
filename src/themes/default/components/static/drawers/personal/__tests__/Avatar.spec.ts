import Avatar from "../Avatar.vue";
import { createWrapper } from "utils/wrapper";

describe("Avatar", () => {
	it("should pass size prop to q-avatar", async () => {
		const wrapper = await createWrapper(Avatar, {
			themePark: true,
			props: {
				size: "96px"
			}
		});
		await wrapper.vm.$nextTick();
		const avatar = wrapper.find(".q-avatar");
		expect(avatar.exists()).toBe(true);
		expect(avatar.attributes("style")).toMatch(/font-size: 96px/);
	});
});
