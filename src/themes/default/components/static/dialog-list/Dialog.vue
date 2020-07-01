<template>
	<q-dialog :value="true" :full-height="dialog.fullScreen" :full-width="dialog.fullScreen || dialog.maxWidth">
		<mett-dialog-content :dialog="dialog"></mett-dialog-content>
	</q-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IDialog } from "src/store/dialog/types";
import { Comp } from "src/mett/components/decorators";

@Component
export default class Dialog extends Vue {
	@Comp("Components.Static.DialogList.DialogContent")
	readonly mettDialogContent!: Vue;

	@Prop() readonly dialog!: IDialog;
}
</script>
