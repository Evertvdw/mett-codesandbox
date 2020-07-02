import SaveButton from "../SaveButton.vue";
import { createWrapper } from "utils/wrapper";
// Save button is a q-fab-action and needs to be child of q-fab in order to work
import container from "./_container.vue";
import mockAxios from "jest-mock-axios";

afterEach(() => {
	// cleaning up the mess left behind the previous test
	mockAxios.reset();
});

describe("SaveButton", () => {
	it("should disable the save button if there are no changed items", async () => {
		const wrapper = await createWrapper(container, {
			store: true,
			props: {
				comp: SaveButton
			}
		});
		const btn = wrapper.find(".mett-save-button");
		expect(btn.exists()).toBe(true);
		const values = wrapper.vm.$store.getters["page/originalValues"];
		expect(Object.keys(values).length).toBe(0);
		expect(btn.attributes()).toHaveProperty("disabled");
	});

	it("should enable the save button if there are changed items", async () => {
		const wrapper = await createWrapper(container, {
			store: true,
			props: {
				comp: SaveButton
			}
		});
		const btn = wrapper.find(".mett-save-button");
		expect(btn.exists()).toBe(true);
		wrapper.vm.$store.commit("page/setOriginalValue", { guid: "hoi", value: "hallo" });
		const values = wrapper.vm.$store.getters["page/originalValues"];
		expect(Object.keys(values).length).toBe(1);
		await wrapper.vm.$nextTick();
		expect(btn.attributes()).not.toHaveProperty("disabled");
	});

	it("should call the action if save button is clicked", async () => {
		const wrapper = await createWrapper(container, {
			store: true,
			props: {
				comp: SaveButton
			}
		});
		const mockFn = jest.fn();
		wrapper.vm.$store.hotUpdate({
			actions: {
				"page/saveChangedItems": mockFn
			}
		});
		const btn = wrapper.find(".mett-save-button");
		expect(btn.exists()).toBe(true);
		wrapper.vm.$store.commit("page/setOriginalValue", { guid: "hoi", value: "hallo" });
		const values = wrapper.vm.$store.getters["page/originalValues"];
		expect(Object.keys(values).length).toBe(1);
		await wrapper.vm.$nextTick();
		expect(btn.attributes()).not.toHaveProperty("disabled");
		btn.trigger("click");
		expect(mockFn).toHaveBeenCalled();
	});

	it("should empty the changed items if save button action is resolved", async () => {
		const wrapper = await createWrapper(container, {
			store: true,
			loadOptimizer: {
				SSR: false
			},
			props: {
				comp: SaveButton
			}
		});
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const containers = require("src/mett/helpers/__tests__/containers.json");
		wrapper.vm.$store.state.page.page = {
			page: {
				guid: "whatever"
			}
		};
		await wrapper.vm.$store.dispatch("page/updateContainers", { containers });
		const btn = wrapper.find(".mett-save-button");
		expect(wrapper.vm.$store.getters["page/containers"]).toBeDefined();
		expect(btn.exists()).toBe(true);
		wrapper.vm.$store.commit("page/setOriginalValue", {
			guid: "0115ed1f-80de-4cbf-9bbb-f59696cb443a",
			value: "Nieuwe title"
		});
		await wrapper.vm.$nextTick();
		btn.trigger("click");
		await new Promise(resolve => setTimeout(resolve, 50));
		expect(mockAxios.put).toHaveBeenCalled();
		mockAxios.mockResponse({ data: true });
		expect(wrapper.vm.$store.getters["page/changedItems"]).toHaveLength(0);
	});

	it("should not empty the changed items if save button action is rejected", async () => {
		const wrapper = await createWrapper(container, {
			store: true,
			loadOptimizer: {
				SSR: false
			},
			props: {
				comp: SaveButton
			}
		});
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const containers = require("src/mett/helpers/__tests__/containers.json");
		wrapper.vm.$store.state.page.page = {
			page: {
				guid: "whatever"
			}
		};
		await wrapper.vm.$store.dispatch("page/updateContainers", { containers });
		const btn = wrapper.find(".mett-save-button");
		expect(wrapper.vm.$store.getters["page/containers"]).toBeDefined();
		expect(btn.exists()).toBe(true);
		wrapper.vm.$store.commit("page/setOriginalValue", {
			guid: "0115ed1f-80de-4cbf-9bbb-f59696cb443a",
			value: "Nieuwe title"
		});
		await wrapper.vm.$nextTick();
		btn.trigger("click");
		await new Promise(resolve => setTimeout(resolve, 50));
		expect(mockAxios.put).toHaveBeenCalledTimes(1);
		mockAxios.mockError({ response: { status: 500 } });
		expect(wrapper.vm.$store.getters["page/changedItems"]).toHaveLength(1);
	});
});
