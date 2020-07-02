import Flippable from "../Flippable.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";

describe("Flippable", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true,
		loadOptimizer: { SSR: false },
		themePark: true,
		router: true
	};

	it("has an element to flip", async () => {
		const wrapper = await createWrapper(Flippable, defaultWrapperOptions);

		expect((wrapper.vm as any).elementToFlip).toBeTruthy();
	});

	it("sets hasFlipped property", async () => {
		const wrapper = await createWrapper(Flippable, defaultWrapperOptions);

		expect((wrapper.vm as any).hasFlipped).toBeFalsy();
		expect(wrapper.find(".mett-has-flipped").exists()).toBeFalsy();

		(wrapper.vm as any).flip();

		await wrapper.vm.$nextTick();

		expect((wrapper.vm as any).hasFlipped).toBeTruthy();
		expect(wrapper.find(".mett-has-flipped").exists()).toBeTruthy();
	});

	it("toggles isFlipped property", async () => {
		const wrapper = await createWrapper(Flippable, defaultWrapperOptions);

		expect((wrapper.vm as any).isFlipped).toBeFalsy();
		expect(wrapper.find(".mett-is-flipped").exists()).toBeFalsy();

		(wrapper.vm as any).flip();

		await wrapper.vm.$nextTick();

		expect((wrapper.vm as any).isFlipped).toBeTruthy();
		expect(wrapper.find(".mett-is-flipped").exists()).toBeTruthy();

		(wrapper.vm as any).flip();

		await wrapper.vm.$nextTick();

		expect((wrapper.vm as any).isFlipped).toBeFalsy();
		expect(wrapper.find(".mett-is-flipped").exists()).toBeFalsy();
	});

	it("handles isFlipping property right", async () => {
		const wrapper = await createWrapper(Flippable, defaultWrapperOptions);

		expect((wrapper.vm as any).isFlipping).toBeFalsy();
		expect(wrapper.find(".mett-perspective").exists()).toBeFalsy();

		(wrapper.vm as any).flip();

		await wrapper.vm.$nextTick();

		expect((wrapper.vm as any).isFlipping).toBeTruthy();
		expect(wrapper.find(".mett-perspective").exists()).toBeTruthy();

		wrapper
			.find(".mett-flippable")
			.trigger("webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend");
		await wrapper.vm.$nextTick();

		expect((wrapper.vm as any).isFlipping).toBeFalsy();
		expect(wrapper.find(".mett-perspective").exists()).toBeFalsy();
	});

	it("sets isInitialized property on flip", async () => {
		const wrapper = await createWrapper(Flippable, defaultWrapperOptions);

		expect((wrapper.vm as any).isInitialized).toBeFalsy();

		(wrapper.vm as any).flip();

		await wrapper.vm.$nextTick();

		expect((wrapper.vm as any).isInitialized).toBeTruthy();
	});
});
