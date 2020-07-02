<template>
	<div class="mett-shortcuts flex">
		<!-- Todo: add admin/developer checks to error/warning buttons //-->
		<mett-shortcuts-error-button class="gt-xs" />
		<mett-shortcuts-warning-button class="gt-xs" />
		<mett-shortcuts-locale-button />
		<mett-shortcuts-login-button v-show="!applicationUser" />
		<mett-shortcuts-search-button />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Comp, Getter } from "src/mett/components/decorators";
import { UserProfileDto } from "src/mett/communication/types";

@Component
export default class Shortcuts extends Vue {
	@Comp("Components.Static.Shortcuts.ErrorButton") mettShortcutsErrorButton!: Vue;
	@Comp("Components.Static.Shortcuts.LoginButton") mettShortcutsLoginButton!: Vue;
	@Comp("Components.Static.Shortcuts.SearchButton") mettShortcutsSearchButton!: Vue;
	@Comp("Components.Static.Shortcuts.WarningButton") mettShortcutsWarningButton!: Vue;
	@Comp("Components.Static.Shortcuts.LocaleButton") mettShortcutsLocaleButton!: Vue;

	@Getter("user/applicationUser") applicationUser!: UserProfileDto;
}
</script>
