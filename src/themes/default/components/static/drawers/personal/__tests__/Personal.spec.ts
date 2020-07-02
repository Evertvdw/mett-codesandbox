import Personal from "../Personal.vue";
import { createWrapper } from "utils/wrapper";

describe("Personal", () => {
	it("should have a header with mini-state set", async () => {
		const wrapper = await createWrapper(Personal, {
			themePark: true,
			store: true,
			props: {
				miniState: true
			}
		});
		await wrapper.vm.$nextTick();
		const item = wrapper.find(".mett-personal-drawer-header");
		expect(item.exists()).toBe(true);
		expect(item.attributes("mini-state")).toBe("true");
	});

	it("should have a list with mini-state set", async () => {
		const wrapper = await createWrapper(Personal, {
			themePark: true,
			store: true,
			props: {
				miniState: true
			}
		});
		await wrapper.vm.$nextTick();
		const item = wrapper.find(".mett-personal-drawer-list");
		expect(item.exists()).toBe(true);
		expect(item.attributes("mini-state")).toBe("true");
	});
});
