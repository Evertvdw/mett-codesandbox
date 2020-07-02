import App from "src/App.vue";
import { createWrapper } from "utils/wrapper";
import Substitute from "@fluffy-spoon/substitute";
import { UserProfileDto } from "src/mett/communication/types";
import { Notify } from "quasar";

describe("App", () => {
	it("should call actions when applicationUser changes", async () => {
		const wrapper = await createWrapper(App, {
			store: true,
			router: true,
			themePark: true,
			props: {
				miniState: true
			}
		});
		const clearCache = jest.fn();
		const raise200 = jest.fn();
		const forceReload = jest.fn();
		wrapper.vm.$store.hotUpdate({
			actions: {
				"loadOptimizer/clearCache": clearCache,
				"error/raise200": raise200,
				"page/forceReload": forceReload
			}
		});
		await wrapper.vm.$nextTick();
		expect(clearCache).not.toHaveBeenCalled();
		expect(raise200).not.toHaveBeenCalled();
		expect(forceReload).not.toHaveBeenCalled();
		wrapper.vm.$store.commit("user/setApplicationUser", { applicationUser: Substitute.for<UserProfileDto>() });
		await wrapper.vm.$nextTick();
		expect(clearCache).toHaveBeenCalled();
		expect(raise200).toHaveBeenCalled();
		expect(forceReload).toHaveBeenCalled();
	});

	it("should set Notify defaults when toggling mobile view", async () => {
		const wrapper = await createWrapper(App, {
			store: true,
			router: true,
			themePark: true,
			props: {
				miniState: true
			}
		});
		const spy = jest.spyOn(Notify, "setDefaults");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$q.screen.lt.md).toBe(false);
		wrapper.vm.$q.screen.lt.md = true;
		await wrapper.vm.$nextTick();
		expect(spy).toHaveBeenCalled();
	});
});
