import SearchButton from "../SearchButton.vue";
import { createWrapper } from "utils/wrapper";

describe("SearchButton", () => {
	it("should show the action-drawer when clicking the button", async () => {
		const wrapper = await createWrapper(SearchButton, {
			themePark: true,
			store: true,
			router: true
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["layout/actionDrawer"]).toBe(false);
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["layout/actionDrawer"]).toBe(true);
	});

	it("should set the action-drawer content when clicking the button", async () => {
		const wrapper = await createWrapper(SearchButton, {
			themePark: true,
			store: true,
			router: true
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["actionDrawer/content"]).toBe(null);
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		const comp = await wrapper.vm.$store.getters["actionDrawer/content"]();
		expect(comp.options.name).toBe("mettActionDrawerSearch");
	});

	it("should not display the button if it is a SearchPage", async () => {
		const wrapper = await createWrapper(SearchButton, {
			themePark: true,
			store: true,
			router: true
		});

		wrapper.vm.$router.push("/search");

		await wrapper.vm.$nextTick();
		const div = wrapper.find("div");
		expect(div.attributes("style")).toBe("display: none;");
	});
});
