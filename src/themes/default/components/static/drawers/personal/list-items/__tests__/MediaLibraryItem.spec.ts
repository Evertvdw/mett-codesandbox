import MediaLibraryItem from "../MediaLibraryItem.vue";
import { createWrapper } from "utils/wrapper";

MediaLibraryItem.directive("ripple", {
	bind() {
		return;
	}
});

describe("MediaLibraryItem", () => {
	it("should open the MediaLibrary dialog on item click", async () => {
		const wrapper = await createWrapper(MediaLibraryItem, {
			themePark: true,
			store: true
		});
		await wrapper.vm.$nextTick();
		const item = wrapper.find(".q-item");
		item.trigger("click");
		await wrapper.vm.$nextTick();
		const dialog = wrapper.vm.$store.getters["dialog/dialogs"][0];
		expect(dialog).toBeDefined();
		const comp = await dialog.component();
		expect(comp.options.name).toBe("mediaLibraryDialog");
	});
});
