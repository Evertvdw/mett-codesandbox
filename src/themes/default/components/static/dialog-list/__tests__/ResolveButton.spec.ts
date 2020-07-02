import ResolveButton from "../ResolveButton.vue";
import { createWrapper } from "utils/wrapper";
import { ClosePopup } from "quasar";
import { IDialog } from "src/store/dialog/types";

ResolveButton.directive("close-popup", ClosePopup);

describe("ResolveButton", () => {
	it("should render a button with resolveText", async () => {
		const wrapper = await createWrapper(ResolveButton, {
			store: true,
			props: {
				dialog: {
					resolveText: "Ok!"
				}
			}
		});
		expect(wrapper).toBeDefined();
		expect(wrapper.text()).toBe("Ok!");
	});

	it("should resolve the dialog if button is clicked", async () => {
		const wrapper = await createWrapper(ResolveButton, {
			store: true,
			props: {
				dialog: {
					resolveText: "Ok!"
				}
			}
		});
		const mockFn = jest.fn();
		wrapper.vm.$store.hotUpdate({
			actions: { "dialog/resolveDialog": mockFn }
		});
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		expect(mockFn).toHaveBeenCalled();
	});

	it("should remove the dialog from the store when resolving", async () => {
		const dialog: IDialog = {
			resolveText: "Ok!"
		};
		const wrapper = await createWrapper(ResolveButton, {
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

	it("should call the resolve function specified on the dialog on resolve", async () => {
		const dialog: IDialog = {
			resolveText: "Ok!",
			reject: jest.fn(),
			resolve: jest.fn()
		};
		const wrapper = await createWrapper(ResolveButton, {
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
		expect(dialog.reject).not.toHaveBeenCalled();
		expect(dialog.resolve).toHaveBeenCalled();
	});
});
