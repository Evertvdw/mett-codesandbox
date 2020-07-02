import Header from "../Header.vue";
import { createWrapper } from "utils/wrapper";
import mockAxios from "jest-mock-axios";

afterEach(() => {
	// cleaning up the mess left behind the previous test
	mockAxios.reset();
});

describe("Header", () => {
	it("should show the full name if there is an application user set", async () => {
		const wrapper = await createWrapper(Header, {
			themePark: true,
			store: true
		});
		wrapper.vm.$store.commit("user/setApplicationUser", {
			applicationUser: {
				firstName: "Pietje",
				lastName: "Pieters"
			}
		});
		await wrapper.vm.$nextTick();
		const name = wrapper.find(".mett-user-full-name");
		expect(name.text()).toBe("Pietje Pieters");
	});

	it("should logout if the button is clicked", async () => {
		const wrapper = await createWrapper(Header, {
			themePark: true,
			store: true,
			loadOptimizer: {
				SSR: false
			}
		});
		wrapper.vm.$store.commit("user/setApplicationUser", {
			applicationUser: {
				firstName: "Pietje",
				lastName: "Pieters"
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["user/applicationUser"]).not.toBeNull();
		const btn = wrapper.find(".q-btn");
		btn.trigger("click");
		await new Promise(resolve => setTimeout(resolve, 50));
		expect(mockAxios.get).toHaveBeenCalledWith("/api/logout", { timeout: 20000, withCredentials: true });
		mockAxios.mockResponse({ data: "Hoi!" });
		expect(wrapper.vm.$store.getters["user/applicationUser"]).toBeNull();
	});

	// The mobile & desktop behaviour of this component is not suitable for unit tests
	// Should test that with integration tests
});
