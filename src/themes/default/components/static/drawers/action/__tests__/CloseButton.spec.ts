import { createWrapper } from "utils/wrapper";
import CloseButton from "../CloseButton.vue";

describe("CloseButton", () => {
	it("should close the action drawer on click", async () => {
		const wrapper = await createWrapper(CloseButton, {
			store: true
		});
		wrapper.vm.$store.dispatch("layout/setActionDrawer", true);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["layout/actionDrawer"]).toBe(true);
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		expect(wrapper.vm.$store.getters["layout/actionDrawer"]).toBe(false);
	});
});
