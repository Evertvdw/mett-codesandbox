import Error404Page from "../Error404Page.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";

describe("pages/Error404Page", () => {
	const defaultWrapperOptions: WrapperOptions = {};

	it("shows the 404 error code", async () => {
		const wrapper = await createWrapper(Error404Page, defaultWrapperOptions);

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain(wrapper.vm.$t("errors.pageNotFound.code"));
	});

	it("shows the 404 error title", async () => {
		const wrapper = await createWrapper(Error404Page, defaultWrapperOptions);

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain(wrapper.vm.$t("errors.pageNotFound.title"));
	});

	it("shows the 404 error description", async () => {
		const wrapper = await createWrapper(Error404Page, defaultWrapperOptions);

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain(wrapper.vm.$t("errors.pageNotFound.description"));
	});
});
