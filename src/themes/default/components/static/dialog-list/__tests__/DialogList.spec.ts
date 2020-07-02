import DialogList from "../DialogList.vue";
import { createWrapper } from "utils/wrapper";
import { Substitute } from "@fluffy-spoon/substitute";
import { IDialogItem } from "src/store/dialog/types";

describe("default/components/static/DialogList", () => {
	it("does not show the DialogList by default", async () => {
		const wrapper = await createWrapper(DialogList, {
			themePark: true,
			store: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.find(".mett-dialog-list").exists()).toBe(false);
	});

	it("shows the DialogList when dialogs is not empty", async () => {
		const wrapper = await createWrapper(DialogList, {
			themePark: true,
			store: true
		});

		const dialogItem: IDialogItem = Substitute.for<IDialogItem>();

		wrapper.vm.$store.commit("dialog/addDialogItem", dialogItem);

		await wrapper.vm.$nextTick();

		expect(wrapper.find(".mett-dialog-list").exists()).toBe(true);
	});

	it("shows the Dialogs when they exist", async () => {
		const wrapper = await createWrapper(DialogList, {
			themePark: true,
			store: true
		});
		const dialogItem: IDialogItem = Substitute.for<IDialogItem>();

		wrapper.vm.$store.commit("dialog/addDialogItem", dialogItem);
		wrapper.vm.$store.commit("dialog/addDialogItem", dialogItem);

		// Double await to wait for animations to start
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();

		expect(wrapper.findAll(".mett-dialog")).toHaveLength(2);
	});

	it("should close the dialogs on a mouseclick on dialoglist", async () => {
		const wrapper = await createWrapper(DialogList, {
			themePark: true,
			store: true
		});
		const dialogItem: IDialogItem = Substitute.for<IDialogItem>();

		wrapper.vm.$store.commit("dialog/addDialogItem", dialogItem);
		wrapper.vm.$store.commit("dialog/addDialogItem", dialogItem);

		// Double await to wait for animations to start
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();

		expect(wrapper.findAll(".mett-dialog")).toHaveLength(2);

		wrapper.trigger("mousedown.left");

		await wrapper.vm.$nextTick();

		expect(wrapper.findAll(".mett-dialog")).toHaveLength(0);
	});
});
