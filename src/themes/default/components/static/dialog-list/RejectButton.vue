<template>
	<q-btn v-if="dialog.rejectText" v-close-popup flat :label="dialog.rejectText" color="primary" @click="onClick" />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IDialog } from "src/store/dialog/types";
import { Action } from "src/mett/components/decorators";

@Component
export default class DialogRejectButton extends Vue {
	@Prop() readonly dialog!: IDialog;

	@Action("dialog/rejectDialog") readonly rejectDialog!: ({
		dialog,
		reason
	}: {
		dialog: IDialog;
		reason?: any;
	}) => void;

	onClick() {
		this.rejectDialog({ dialog: this.dialog });
	}
}
</script>
