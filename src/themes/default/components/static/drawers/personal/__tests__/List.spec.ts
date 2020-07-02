import List from "../List.vue";
import { createWrapper } from "utils/wrapper";

List.directive("ripple", {
	bind() {
		return;
	}
});

describe("List", () => {
	it("should set mini class on list if mini-state prop is passed", async () => {
		const wrapper = await createWrapper(List, {
			themePark: true,
			props: {
				miniState: true
			}
		});
		await wrapper.vm.$nextTick();
		const list = wrapper.find(".q-list");
		expect(list.exists()).toBe(true);
		expect(list.classes()).toContain("mini");
	});

	it("should not set mini class on list if mini-state prop is false", async () => {
		const wrapper = await createWrapper(List, {
			themePark: true,
			props: {
				miniState: false
			}
		});
		await wrapper.vm.$nextTick();
		const list = wrapper.find(".q-list");
		expect(list.exists()).toBe(true);
		expect(list.classes()).not.toContain("mini");
	});

	it("should use uppercase text in list", async () => {
		const wrapper = await createWrapper(List, {
			themePark: true
		});
		await wrapper.vm.$nextTick();
		const list = wrapper.find(".q-list");
		expect(list.exists()).toBe(true);
		expect(list.classes()).toContain("text-uppercase");
	});

	it("should set opacity-0 class on add item if ministate is true", async () => {
		const wrapper = await createWrapper(List, {
			themePark: true,
			props: {
				miniState: true
			}
		});
		wrapper.vm.$q.screen.lt.md = false; // Prevent overflow effect from other tests as Quasar is installed on global Vue
		await wrapper.vm.$nextTick();
		const item = wrapper.find(".q-item");
		expect(item.exists()).toBe(true);
		expect(item.classes()).toContain("mett-opacity-0");
		expect(item.classes()).not.toContain("mett-opacity-1");
	});

	it("should set opacity-1 class on add item if ministate is false", async () => {
		const wrapper = await createWrapper(List, {
			themePark: true,
			props: {
				miniState: false
			}
		});
		wrapper.vm.$q.screen.lt.md = false; // Prevent overflow effect from other tests as Quasar is installed on global Vue
		await wrapper.vm.$nextTick();
		const item = wrapper.find(".q-item");
		expect(item.exists()).toBe(true);
		expect(item.classes()).toContain("mett-opacity-1");
		expect(item.classes()).not.toContain("mett-opacity-0");
	});
});
