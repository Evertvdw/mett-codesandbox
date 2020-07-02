import Breadcrumbs from "../Breadcrumbs.vue";
import { createWrapper } from "utils/wrapper";

const selector = ".mett-breadcrumbs";

describe("Breadcrumbs", () => {
	it("should show breadcrumbs by default", async () => {
		const wrapper = await createWrapper(Breadcrumbs, {
			router: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.find(selector).exists()).toBe(true);
	});

	it("should not show breadcrumbs when route name is 'SearchPage'", async () => {
		const wrapper = await createWrapper(Breadcrumbs, {
			router: true
		});

		wrapper.vm.$router.push("/search");
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$route.name).toBe("SearchPage");
		expect(wrapper.find(selector).exists()).toBe(false);
	});

	it("should not show breadcrumbs when route name is 'CmsPage'", async () => {
		const wrapper = await createWrapper(Breadcrumbs, {
			router: true
		});

		wrapper.vm.$router.push("/cms");
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$route.name).toBe("CmsPage");
		expect(wrapper.find(selector).exists()).toBe(false);
	});

	it("should have clickable breadcrumbs by default", async () => {
		const wrapper = await createWrapper(Breadcrumbs, {
			router: true
		});

		wrapper.vm.$router.push("/news/item");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.path).toBe("/news/item");

		const breadcrumbLinks = wrapper.find(selector).findAll("a");
		expect(breadcrumbLinks.length).toBe(3);

		breadcrumbLinks.at(0).trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.path).toBe("/home");

		breadcrumbLinks.at(1).trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.path).toBe("/news");

		breadcrumbLinks.at(2).trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.path).toBe("/news/item");
	});

	it("should not have a clickable last breadcrumb", async () => {
		const wrapper = await createWrapper(Breadcrumbs, {
			router: true
		});

		wrapper.vm.$router.push("/news/item");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.path).toBe("/news/item");

		const breadcrumbLinks = wrapper.find(selector).findAll("a");
		expect(breadcrumbLinks.length).toBe(3);

		expect(
			wrapper
				.find(selector)
				.find(".q-breadcrumbs--last")
				.find("a")
				.attributes("href")
		).toBe("#/news/item");
	});

	it("should not have a clickable breadcrumb when route path is '/home'", async () => {
		const wrapper = await createWrapper(Breadcrumbs, {
			router: true
		});

		wrapper.vm.$router.push("/home");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.path).toBe("/home");

		const breadcrumbLinks = wrapper.find(selector).findAll("a");
		expect(breadcrumbLinks.length).toBe(1);

		expect(
			wrapper
				.find(selector)
				.find(".q-breadcrumbs--last")
				.exists()
		).toBe(true);
	});

	it("should be CAPITALIZED", async () => {
		const wrapper = await createWrapper(Breadcrumbs, {
			router: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.find(".text-capitalize").exists()).toBe(true);
	});
});
