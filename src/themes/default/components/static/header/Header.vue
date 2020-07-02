<template>
	<div class="row justify-center mett-max-width mett-centered">
		<q-toolbar class="q-py-md col-12 justify-between">
			<mett-site-logo v-if="showLogo" />

			<mett-site-title v-else />

			<mett-shortcuts class="gt-sm" />
		</q-toolbar>

		<div class="fit col-12">
			<mett-main-menu class="gt-sm" />
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";

@Component
export default class Header extends Vue {
	@Comp("Components.Static.Header.SiteLogo") mettSiteLogo!: Vue;
	@Comp("Components.Static.Header.SiteTitle") mettSiteTitle!: Vue;
	@Comp("Components.Static.MainMenu") mettMainMenu!: Vue;
	@Comp("Components.Static.SearchBar") mettSearchBar!: Vue;
	@Comp("Components.Static.Shortcuts") mettShortcuts!: Vue;

	showLogo = true;
}
</script>
