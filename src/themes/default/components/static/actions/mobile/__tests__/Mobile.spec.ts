import Mobile from "../Mobile.vue";
import { createWrapper } from "utils/wrapper";
import { UserProfileDto } from "src/mett/communication/types";
import { Substitute } from "@fluffy-spoon/substitute";

// Mobile is a q-page-sticky and needs to be child of q-layout in order to work
import layout from "./_layout.vue";

describe("Mobile", () => {
	it("should have bigger width set not collapsed vs. collapsed ", async () => {
		const wrapper = await createWrapper(layout, {
			store: true,
			themePark: true,
			props: {
				comp: Mobile
			}
		});
		expect(wrapper.vm.$store.getters["layout/mobileActionsCollapsed"]).toBe(false);
		const regex = (wrapper.find(".mett-mobile-actions").attributes("style") as string).match(/\d{2,3}/g);
		let widthBefore = 0;
		if (regex && regex.length && regex[0]) widthBefore = Number(regex[0]);
		wrapper.vm.$store.dispatch("layout/setMobileActionsCollapsed", true);
		await wrapper.vm.$nextTick();
		const regex1 = (wrapper.find(".mett-mobile-actions").attributes("style") as string).match(/\d{2,3}/g);
		let widthAfter = 0;
		if (regex1 && regex1.length && regex1[0]) widthAfter = Number(regex1[0]);
		expect(widthBefore).toBeGreaterThan(widthAfter);
	});

	it("should show content-actions if not collapsed", async () => {
		const wrapper = await createWrapper(layout, {
			store: true,
			themePark: true,
			props: {
				comp: Mobile
			}
		});
		expect(wrapper.vm.$store.getters["layout/mobileActionsCollapsed"]).toBe(false);
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".mett-mobile-actions-menu-button").exists()).toBe(true);
	});

	it("should not show content-actions if collapsed", async () => {
		const wrapper = await createWrapper(layout, {
			store: true,
			themePark: true,
			props: {
				comp: Mobile
			}
		});
		wrapper.vm.$store.dispatch("layout/setMobileActionsCollapsed", true);
		expect(wrapper.vm.$store.getters["layout/mobileActionsCollapsed"]).toBe(true);
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".mett-mobile-actions-menu-button").exists()).toBe(false);
	});

	it("should toggle collapsed if clicked", async () => {
		const wrapper = await createWrapper(layout, {
			store: true,
			themePark: true,
			props: {
				comp: Mobile
			}
		});
		expect(wrapper.vm.$store.getters["layout/mobileActionsCollapsed"]).toBe(false);
		const btn = wrapper.find(".mett-mobile-actions-toggle-button");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["layout/mobileActionsCollapsed"]).toBe(true);
	});

	it("should toggle personal drawer if clicked", async () => {
		const wrapper = await createWrapper(layout, {
			store: true,
			themePark: true,
			props: {
				comp: Mobile
			}
		});

		const payload: { applicationUser: UserProfileDto } = {
			applicationUser: Substitute.for<UserProfileDto>()
		};

		wrapper.vm.$store.commit("user/setApplicationUser", payload);
		await wrapper.vm.$nextTick();

		wrapper.vm.$q.screen.lt.md = true;
		expect(wrapper.vm.$store.getters["layout/personalDrawer"]).toBe(false);
		const btn = wrapper.find(".mett-mobile-actions-personal-button");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["layout/personalDrawer"]).toBe(true);
		wrapper.vm.$q.screen.lt.md = false;
	});

	it("should collapse mobile actions if breakpoint is changed", async () => {
		const wrapper = await createWrapper(layout, {
			store: true,
			themePark: true,
			props: {
				comp: Mobile
			}
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["layout/mobileActionsCollapsed"]).toBe(false);
		wrapper.vm.$q.screen.lt.md = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$store.getters["layout/mobileActionsCollapsed"]).toBe(true);
		wrapper.vm.$q.screen.lt.md = false;
	});
});
