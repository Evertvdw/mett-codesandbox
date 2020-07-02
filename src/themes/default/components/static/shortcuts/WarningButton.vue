<template>
	<div v-show="show" class="mett-shortcut mett-shortcut-warning">
		<q-btn icon="warning" dense flat round @click="onClick">
			<q-badge color="warning" floating>{{ warnings.length }}</q-badge>
		</q-btn>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Action, Comp, Getter } from "src/mett/components/decorators";
import { IError } from "src/store/error/types";
import { IDialog } from "src/store/dialog/types";

@Component
export default class ShortcutsWarningButton extends Vue {
	@Getter("error/warnings") warnings!: IError[];

	@Comp("Components.Static.DialogList.Dialogs.WarningDialog")
	readonly mettWarningDialog!: Vue;

	@Action("dialog/openDialog") openDialog!: ({ dialog }: { dialog: IDialog }) => Promise<any>;
	@Action("error/clearWarnings") clearWarnings!: () => void;

	show = false;

	onClick() {
		const dialog: IDialog = {
			component: this.mettWarningDialog,
			resolveText: this.$t("dialogs.warning.resolve"),
			rejectText: this.$t("dialogs.warning.reject"),
			reject: this.clearWarnings,
			maxWidth: true
		};

		this.openDialog({ dialog }).then(
			() => {},
			() => {}
		);
	}

	created() {
		this.onWarningsChanged();
	}

	@Watch("warnings")
	onWarningsChanged() {
		this.show = this.warnings && this.warnings.length > 0;
	}
}
</script>
