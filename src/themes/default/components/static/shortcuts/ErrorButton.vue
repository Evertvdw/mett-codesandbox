<template>
	<div v-show="show" class="mett-shortcut mett-shortcut-error">
		<q-btn icon="error" dense flat round @click="onClick">
			<q-badge color="negative" floating>{{ errors.length }}</q-badge>
		</q-btn>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Action, Comp, Getter } from "src/mett/components/decorators";
import { IError } from "src/store/error/types";
import { IDialog } from "src/store/dialog/types";

@Component
export default class ShortcutsErrorButton extends Vue {
	@Getter("error/errors") errors!: IError[];

	@Comp("Components.Static.DialogList.Dialogs.ErrorDialog")
	readonly mettErrorDialog!: Vue;

	@Action("dialog/openDialog") openDialog!: ({ dialog }: { dialog: IDialog }) => Promise<any>;
	@Action("error/clearErrors") clearErrors!: () => void;

	show = false;

	onClick() {
		const dialog: IDialog = {
			component: this.mettErrorDialog,
			resolveText: this.$t("dialogs.error.resolve"),
			rejectText: this.$t("dialogs.error.reject"),
			reject: this.clearErrors,
			maxWidth: true
		};

		this.openDialog({ dialog }).then(
			() => {},
			() => {}
		);
	}

	created() {
		this.onErrorsChanged();
	}

	@Watch("errors")
	onErrorsChanged() {
		this.show = this.errors && this.errors.length > 0;
	}
}
</script>
