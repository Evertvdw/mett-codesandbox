import Dialog from "../Dialog.vue";
import { createWrapper } from "utils/wrapper";

describe("Dialog", () => {
	it("dummy", async () => {
		const wrapper = await createWrapper(Dialog, {
			store: true,
			themePark: true,
			props: {
				dialog: {}
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper).toBeDefined();
	});
});
