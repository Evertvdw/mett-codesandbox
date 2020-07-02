import DialogContent from "../DialogContent.vue";
import { createWrapper } from "utils/wrapper";
import { IDialog } from "src/store/dialog/types";
import Test from "./_component.vue";
import { ClosePopup } from "quasar";

DialogContent.directive("close-popup", ClosePopup);

describe("DialogContent", () => {
	it("should render a title if the dialog has one", async () => {
		const wrapper = await createWrapper(DialogContent, {
			store: true,
			themePark: true,
			props: {
				dialog: {
					title: "Hallo daarzo!"
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toContain("Hallo daarzo!");
	});

	it("should render a close button", async () => {
		const wrapper = await createWrapper(DialogContent, {
			store: true,
			themePark: true,
			props: {
				dialog: {
					title: "Test"
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".q-btn i").text()).toBe("close");
	});

	it("should remove the dialog if close button is clicked", async () => {
		const dialog: IDialog = {
			title: "Test",
			message: "Hello, whadup?"
		};
		const wrapper = await createWrapper(DialogContent, {
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

	it("should remove the dialog if escape button is clicked", async () => {
		const dialog: IDialog = {
			message: "Hello, whadup?"
		};
		const wrapper = await createWrapper(DialogContent, {
			store: true,
			themePark: true,
			props: {
				dialog
			}
		});
		wrapper.vm.$store.dispatch("dialog/openDialog", { dialog });
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["dialog/dialogs"]).toHaveLength(1);
		wrapper.trigger("keydown.esc");
		expect(wrapper.vm.$store.getters["dialog/dialogs"]).toHaveLength(0);
	});

	it("should render a message if specified", async () => {
		const wrapper = await createWrapper(DialogContent, {
			store: true,
			themePark: true,
			props: {
				dialog: {
					message: "Ik ben onzichtbaar"
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toContain("Ik ben onzichtbaar");
	});

	it("should render a component if specified", async () => {
		const wrapper = await createWrapper(DialogContent, {
			store: true,
			themePark: true,
			props: {
				dialog: {
					component: Test
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toContain("Hallo vanuit Test!");
	});

	it("should render a reject & resolve buttons if specified", async () => {
		const wrapper = await createWrapper(DialogContent, {
			store: true,
			themePark: true,
			props: {
				dialog: {
					resolveText: "Ok",
					rejectText: "Annuleren"
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".mett-reject-button").exists()).toBe(true);
		expect(wrapper.find(".mett-resolve-button").exists()).toBe(true);
	});

	it("should render only a reject button", async () => {
		const wrapper = await createWrapper(DialogContent, {
			store: true,
			themePark: true,
			props: {
				dialog: {
					rejectText: "Meh"
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".mett-reject-button").exists()).toBe(true);
		expect(wrapper.find(".mett-resolve-button").exists()).toBe(false);
	});

	it("should render only a resolve button", async () => {
		const wrapper = await createWrapper(DialogContent, {
			store: true,
			themePark: true,
			props: {
				dialog: {
					resolveText: "Hi"
				}
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".mett-reject-button").exists()).toBe(false);
		expect(wrapper.find(".mett-resolve-button").exists()).toBe(true);
	});
});
