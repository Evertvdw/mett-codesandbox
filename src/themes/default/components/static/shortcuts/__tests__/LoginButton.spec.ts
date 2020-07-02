import LoginButton from "../LoginButton.vue";
import { createWrapper } from "utils/wrapper";

describe("LoginButton", () => {
	it("should open a dialog when clicking the button", async () => {
		const wrapper = await createWrapper(LoginButton, {
			themePark: true,
			store: true
		});
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		const dialog = wrapper.vm.$store.getters["dialog/dialogs"][0];
		expect(dialog).toBeDefined();
		const comp = await dialog.component();
		expect(comp.options.name).toBe("mettLoginDialog");
	});
});
