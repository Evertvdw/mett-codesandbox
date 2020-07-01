<template>
	<div v-if="dialogs.length > 0" class="mett-dialog-list" @mousedown.left="onClick">
		<mett-dialog v-for="(dialog, index) in dialogs" :key="'dialog' + index" :dialog="dialog" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Action, Comp, Getter } from "src/mett/components/decorators";
import { IDialog } from "src/store/dialog/types";

@Component
export default class DialogList extends Vue {
	@Comp("Components.Static.DialogList.Dialog") readonly mettDialog!: Vue;

	@Getter("dialog/dialogs") readonly dialogs!: IDialog[];

	@Action("dialog/rejectDialog") readonly rejectDialog!: ({
		dialog,
		reason
	}: {
		dialog: IDialog;
		reason?: any;
	}) => void;

	onClick() {
		this.dialogs.forEach(dialog => {
			this.rejectDialog({ dialog });
		});
	}
}
</script>
