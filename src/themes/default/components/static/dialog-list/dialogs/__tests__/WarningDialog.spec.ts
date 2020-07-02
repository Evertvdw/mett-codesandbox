import WarningDialog from "../WarningDialog.vue";
import { createWrapper } from "utils/wrapper";
import { IError } from "src/store/error/types";
import { ClosePopup } from "quasar";

WarningDialog.directive("close-popup", ClosePopup);

describe("WarningDialog", () => {
	it("should show the message of the error", async () => {
		const wrapper = await createWrapper(WarningDialog, {
			store: true
		});
		const error: IError = {
			title: "test",
			timestamp: new Date(),
			message: "Something terrible happened!"
		};
		wrapper.vm.$store.dispatch("error/addWarning", error);
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toContain(error.message);
	});

	it("should show a list of errors", async () => {
		const wrapper = await createWrapper(WarningDialog, {
			store: true
		});
		const error: IError = {
			title: "test",
			timestamp: new Date(),
			message: "Something terrible happened!"
		};
		wrapper.vm.$store.dispatch("error/addWarning", error);
		wrapper.vm.$store.dispatch("error/addWarning", error);
		wrapper.vm.$store.dispatch("error/addWarning", error);
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll(".q-item")).toHaveLength(3);
	});

	it("should show the timestamp of the error", async () => {
		const wrapper = await createWrapper(WarningDialog, {
			store: true
		});
		const error: IError = {
			title: "test",
			timestamp: new Date(),
			message: "Something terrible happened!"
		};
		wrapper.vm.$store.dispatch("error/addWarning", error);
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toMatch(/[0-2][0-9]:[0-5][0-9]:[0-5][0-9]/);
	});

	it("should hide the extra info of the error", async () => {
		const wrapper = await createWrapper(WarningDialog, {
			store: true
		});
		const error: IError = {
			title: "test",
			timestamp: new Date(),
			message: "Something terrible happened!",
			info: "Really terrible stuff."
		};
		wrapper.vm.$store.dispatch("error/addWarning", error);
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).not.toContain(error.info);
	});

	it("should toggle the extra info of the error", async () => {
		const wrapper = await createWrapper(WarningDialog, {
			store: true
		});
		const error: IError = {
			title: "test",
			timestamp: new Date(),
			message: "Something terrible happened!",
			info: "Really terrible stuff."
		};
		wrapper.vm.$store.dispatch("error/addWarning", error);
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).not.toContain(error.info);
		const btn = wrapper.find(".q-item .q-btn");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toContain(error.info);
		const btn2 = wrapper.find(".q-item .q-btn");
		btn2.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).not.toContain(error.info);
	});

	it("should log the info to the console on click", async () => {
		const wrapper = await createWrapper(WarningDialog, {
			store: true
		});
		const error: IError = {
			title: "test",
			timestamp: new Date(),
			message: "Something terrible happened!",
			info: "Really terrible stuff."
		};
		const logSpy = jest.spyOn(global.console, "log");
		wrapper.vm.$store.dispatch("error/addWarning", error);
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).not.toContain(error.info);
		const btn = wrapper.find(".q-item .q-btn");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toContain(error.info);
		const info = wrapper.find("pre");
		info.trigger("click");
		expect(logSpy).toHaveBeenCalled();
	});
});
