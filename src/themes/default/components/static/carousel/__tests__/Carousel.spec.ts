import Carousel from "../Carousel.vue";
import { createWrapper } from "utils/wrapper";

describe("Carousel", () => {
	it("shows the carousel by default", async () => {
		const wrapper = await createWrapper(Carousel, {
			themePark: true,
			router: true
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.find(".mett-carousel").exists()).toBe(true);
	});

	it("does not show the carousel when route name is 'SearchPage'", async () => {
		const wrapper = await createWrapper(Carousel, {
			themePark: true,
			router: true
		});

		wrapper.vm.$router.push("/search");
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$route.name).toBe("SearchPage");
		expect(wrapper.find(".mett-carousel").exists()).toBe(false);
	});

	it("does not show the carousel when route name is 'CmsPage'", async () => {
		const wrapper = await createWrapper(Carousel, {
			themePark: true,
			router: true
		});

		wrapper.vm.$router.push("/cms");
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$route.name).toBe("CmsPage");
		expect(wrapper.find(".mett-carousel").exists()).toBe(false);
	});

	// Todo: create test to check if the carousel is not displayed when it has no slides.
});
