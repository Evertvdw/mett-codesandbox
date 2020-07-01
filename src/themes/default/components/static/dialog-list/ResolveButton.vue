<template>
	<q-btn v-if="dialog.resolveText" v-close-popup :label="dialog.resolveText" color="primary" @click="onClick" />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IDialog } from "src/store/dialog/types";
import { Action } from "src/mett/components/decorators";

@Component
export default class DialogResolveButton extends Vue {
	@Prop() readonly dialog!: IDialog;

	@Action("dialog/resolveDialog") readonly resolveDialog!: ({
		dialog,
		value
	}: {
		dialog: IDialog;
		value?: any;
	}) => void;

	onClick() {
		this.resolveDialog({ dialog: this.dialog });
	}
}
</script>
