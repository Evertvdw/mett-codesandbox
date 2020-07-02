<template>
	<div v-touch-swipe.mouse.left="setMobileMenuDrawer(false)" class="fit column">
		<q-toolbar class="q-pa-md justify-between">
			<mett-site-logo v-if="showLogo" />

			<mett-site-title v-else />

			<mett-shortcuts />
		</q-toolbar>

		<q-scroll-area class="col">
			<mett-main-menu />
		</q-scroll-area>

		<mett-mobile-menu-drawer-footer />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Comp, Action } from "src/mett/components/decorators";

@Component
export default class MobileMenuDrawer extends Vue {
	@Comp("Components.Static.Drawers.MobileMenu.Footer") mettMobileMenuDrawerFooter!: Vue;
	@Comp("Components.Static.MainMenu") mettMainMenu!: Vue;
	@Comp("Components.Static.Shortcuts") mettShortcuts!: Vue;
	@Comp("Components.Static.Header.SiteLogo") mettSiteLogo!: Vue;
	@Comp("Components.Static.Header.SiteTitle") mettSiteTitle!: Vue;

	@Action("layout/setMobileMenuDrawer") setMobileMenuDrawer!: (val: boolean) => void;

	// Todo: Make this dynamic
	showLogo = true;
}
</script>
