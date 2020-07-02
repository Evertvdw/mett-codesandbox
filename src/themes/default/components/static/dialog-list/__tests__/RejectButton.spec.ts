import RejectButton from "../RejectButton.vue";
import { createWrapper } from "utils/wrapper";
import { ClosePopup } from "quasar";
import { IDialog } from "src/store/dialog/types";

RejectButton.directive("close-popup", ClosePopup);

describe("RejectButton", () => {
	it("should render a button with rejectText", async () => {
		const wrapper = await createWrapper(RejectButton, {
			store: true,
			props: {
				dialog: {
					rejectText: "Annuleren"
				}
			}
		});
		expect(wrapper).toBeDefined();
		expect(wrapper.text()).toBe("Annuleren");
	});

	it("should reject the dialog if button is clicked", async () => {
		const wrapper = await createWrapper(RejectButton, {
			store: true,
			props: {
				dialog: {
					rejectText: "Annuleren"
				}
			}
		});
		const mockFn = jest.fn();
		wrapper.vm.$store.hotUpdate({
			actions: { "dialog/rejectDialog": mockFn }
		});
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		expect(mockFn).toHaveBeenCalled();
	});

	it("should remove the dialog from the store when rejecting", async () => {
		const dialog: IDialog = {
			rejectText: "Annuleren"
		};
		const wrapper = await createWrapper(RejectButton, {
			store: true,
			themePark: true,
			props: {
				dialog
			}
		});
		wrapper.vm.$store.dispatch("dialog/openDialog", { dialog });
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["dialog/dialogs"]).toHaveLength(1);
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		expect(wrapper.vm.$store.getters["dialog/dialogs"]).toHaveLength(0);
	});

	it("should call the reject function specified on the dialog on reject", async () => {
		const dialog: IDialog = {
			rejectText: "Annuleren",
			reject: jest.fn(),
			resolve: jest.fn()
		};
		const wrapper = await createWrapper(RejectButton, {
			store: true,
			themePark: true,
			props: {
				dialog
			}
		});
		wrapper.vm.$store.dispatch("dialog/openDialog", { dialog });
		await wrapper.vm.$nextTick();
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		expect(dialog.reject).toHaveBeenCalled();
		expect(dialog.resolve).not.toHaveBeenCalled();
	});
});
