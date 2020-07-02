import Footer from "../Footer.vue";
import { createWrapper } from "utils/wrapper";

describe("Footer", () => {
	it("dummy test", async () => {
		const wrapper = await createWrapper(Footer, {});

		await wrapper.vm.$nextTick();
		expect(true).toBe(true);
	});
});
