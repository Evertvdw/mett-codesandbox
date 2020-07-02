import MainLayout from "../MainLayout.vue";
import { createWrapper } from "utils/wrapper";
import { UserProfileDto } from "src/mett/communication/types";
import { Substitute } from "@fluffy-spoon/substitute";

describe("MainLayout", () => {
	describe("Personal Drawer", () => {
		it("does not show the Personal Drawer when user is not logged in", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});
			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-personal-drawer").exists()).toBe(false);
		});

		it("does show the Personal Drawer when user is logged in", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});
			const payload: { applicationUser: UserProfileDto } = {
				applicationUser: Substitute.for<UserProfileDto>()
			};

			wrapper.vm.$store.commit("user/setApplicationUser", payload);

			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-personal-drawer").exists()).toBe(true);
		});

		it("does not show Personal Drawer when errorStatus is 500", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			const payload: { applicationUser: UserProfileDto } = {
				applicationUser: Substitute.for<UserProfileDto>()
			};

			wrapper.vm.$store.commit("user/setApplicationUser", payload);
			wrapper.vm.$store.commit("error/setStatus", 500);

			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-personal-drawer").exists()).toBe(false);
		});
	});

	describe("Error Pages", () => {
		it("shows the router view when errorStatus is 200", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 200);

			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.$route.name).toBe("ViewPage");

			expect(wrapper.find(".mett-items-page").exists()).toBe(true);
		});

		it("does not show the router view when errorStatus is 500", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 500);

			await wrapper.vm.$nextTick();

			expect(wrapper.vm.$route.name).toBe("ViewPage");

			expect(wrapper.find(".mett-items-page").exists()).toBe(false);
		});

		it("shows the Error 401 page when errorStatus is 401", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 401);

			// Double await so the animation started (else the component isn't rendered yet)
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-error-401-page").exists()).toBe(true);
		});

		it("does not show the Error 401 page view when errorStatus is 200", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 200);

			// Double await so the animation started (else the component isn't rendered yet)
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-error-401-page").exists()).toBe(false);
		});

		it("shows the Error 500 page when errorStatus is 500", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 500);

			// Double await so the animation started (else the component isn't rendered yet)
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-error-500-page").exists()).toBe(true);
		});

		it("does not show the Error 500 page view when errorStatus is 200", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 200);

			// Double await so the animation started (else the component isn't rendered yet)
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-error-500-page").exists()).toBe(false);
		});
	});

	describe("Visibility of several components", () => {
		it("shows the Acton Drawer when errorStatus is 200", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 200);

			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-action-drawer").exists()).toBe(true);
		});

		it("does not show the Acton Drawer when errorStatus is 500", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 500);

			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-action-drawer").exists()).toBe(false);
		});

		it("shows the Mobile Menu Drawer when errorStatus is 200", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 200);

			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-mobile-menu-drawer").exists()).toBe(true);
		});

		it("does not show the Mobile Menu Drawer when errorStatus is 500", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 500);

			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-mobile-menu-drawer").exists()).toBe(false);
		});

		it("shows the Footer when errorStatus is 200", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 200);

			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-footer").exists()).toBe(true);
		});

		it("does not show the Footer when errorStatus is 500", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 500);

			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-footer").exists()).toBe(false);
		});

		it("shows the Dialog List when errorStatus is 200", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 200);

			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-dialog-list").exists()).toBe(true);
		});

		it("does not show the Dialog List when errorStatus is 500", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			wrapper.vm.$store.commit("error/setStatus", 500);

			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-dialog-list").exists()).toBe(false);
		});
	});

	describe("Mobile Drawer Menu", () => {
		it("collapses the Mobile Drawer Menu when scrolled down", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			(wrapper.vm as any).scrollHandler({ directionChanged: true, direction: "down", position: 1 });

			await wrapper.vm.$nextTick();

			expect(wrapper.vm.$store.getters["layout/mobileActionsCollapsed"]).toBe(true);
		});

		it("expands the Mobile Drawer Menu when scrolled up", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			(wrapper.vm as any).scrollHandler({ directionChanged: true, direction: "up" });

			await wrapper.vm.$nextTick();

			expect(wrapper.vm.$store.getters["layout/mobileActionsCollapsed"]).toBe(false);
		});

		it("should be lt-md class on mobile-menu-drawer", async () => {
			const wrapper = await createWrapper(MainLayout, {
				themePark: true,
				router: true,
				store: true
			});

			await wrapper.vm.$nextTick();

			expect(wrapper.find(".mett-mobile-menu-drawer").classes("lt-md")).toBe(true);
		});
	});
});
