import WarningButton from "../WarningButton.vue";
import { createWrapper } from "utils/wrapper";
import Substitute from "@fluffy-spoon/substitute";
import { IError } from "src/store/error/types";

describe("WarningButton", () => {
	it("should not show the button if there are no warnings", async () => {
		const wrapper = await createWrapper(WarningButton, {
			themePark: true,
			store: true
		});
		await wrapper.vm.$nextTick();
		const div = wrapper.find("div");
		expect(wrapper.vm.$store.getters["error/warnings"]).toHaveLength(0);
		expect(div.attributes("style")).toBe("display: none;");
	});

	it("should show the button if there are warnings", async () => {
		const wrapper = await createWrapper(WarningButton, {
			themePark: true,
			store: true
		});
		wrapper.vm.$store.dispatch("error/addWarning", Substitute.for<IError>());
		await wrapper.vm.$nextTick();
		const div = wrapper.find("div");
		expect(wrapper.vm.$store.getters["error/warnings"]).toHaveLength(1);
		expect(div.attributes("style")).not.toBe("display: none;");
	});

	it("should show the amount of warnings as a badge on the button", async () => {
		const wrapper = await createWrapper(WarningButton, {
			themePark: true,
			store: true
		});
		wrapper.vm.$store.dispatch("error/addWarning", Substitute.for<IError>());
		await wrapper.vm.$nextTick();
		const badge = wrapper.find(".q-badge");
		expect(wrapper.vm.$store.getters["error/warnings"]).toHaveLength(1);
		expect(badge.text()).toBe("1");
	});

	it("should open a dialog when clicking the error button", async () => {
		const wrapper = await createWrapper(WarningButton, {
			themePark: true,
			store: true
		});
		wrapper.vm.$store.dispatch("error/addWarning", Substitute.for<IError>());
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		expect(wrapper.vm.$store.getters["error/warnings"]).toHaveLength(1);
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		const dialog = wrapper.vm.$store.getters["dialog/dialogs"][0];
		expect(dialog).toBeDefined();
		const comp = await dialog.component();
		expect(comp.options.name).toBe("mettWarningDialog");
	});

	it("should not clear the warning when resolving the dialog", async () => {
		const wrapper = await createWrapper(WarningButton, {
			themePark: true,
			store: true
		});
		wrapper.vm.$store.dispatch("error/addWarning", Substitute.for<IError>());
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		expect(wrapper.vm.$store.getters["error/warnings"]).toHaveLength(1);
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		const dialog = wrapper.vm.$store.getters["dialog/dialogs"][0];
		expect(dialog).toBeDefined();
		await wrapper.vm.$store.dispatch("dialog/resolveDialog", { dialog });
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["error/warnings"]).toHaveLength(1);
	});

	it("should clear the warnings when rejecting the dialog", async () => {
		const wrapper = await createWrapper(WarningButton, {
			themePark: true,
			store: true
		});
		wrapper.vm.$store.dispatch("error/addWarning", Substitute.for<IError>());
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		expect(wrapper.vm.$store.getters["error/warnings"]).toHaveLength(1);
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		const dialog = wrapper.vm.$store.getters["dialog/dialogs"][0];
		expect(dialog).toBeDefined();
		await wrapper.vm.$store.dispatch("dialog/rejectDialog", { dialog });
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["error/warnings"]).toHaveLength(0);
	});
});
