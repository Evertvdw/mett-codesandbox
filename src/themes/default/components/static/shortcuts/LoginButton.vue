<template>
	<div class="mett-shortcut mett-shortcut-login">
		<q-btn icon="person" dense flat round @click="onClick" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Comp, Action } from "src/mett/components/decorators";
import { IDialog } from "src/store/dialog/types";

@Component
export default class ShortcutsLoginButton extends Vue {
	@Comp("Components.Static.DialogList.Dialogs.LoginDialog")
	readonly mettLoginDialog!: Vue;

	@Action("dialog/openDialog") openDialog!: ({ dialog }: { dialog: IDialog }) => Promise<any>;

	onClick() {
		const dialog: IDialog = {
			component: this.mettLoginDialog,
			title: this.$t("dialogs.login.title")
		};

		this.openDialog({ dialog }).then(
			() => {},
			() => {}
		);
	}
}
</script>
