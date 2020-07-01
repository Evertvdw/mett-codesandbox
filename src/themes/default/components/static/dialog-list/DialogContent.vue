<template>
	<component :is="dialog.component" v-if="dialog.custom" :dialog="dialog" />
	<q-card
		v-else
		class="q-pa-md"
		:style="{ 'max-width': dialog.customMaxWidth ? dialog.customMaxWidth : '' }"
		@keydown.esc="rejectDialog({ dialog })"
	>
		<q-card-section v-if="dialog.title" class="row items-center">
			<div :class="dialog.titleClass ? dialog.titleClass : 'text-h2'">{{ dialog.title ? dialog.title : "" }}</div>
			<q-space />
			<q-btn icon="close" class="q-button-close" flat round dense @click="rejectDialog({ dialog })" />
		</q-card-section>

		<q-card-section v-if="dialog.message">
			{{ dialog.message }}
		</q-card-section>

		<component :is="dialog.component" v-if="dialog.component" :dialog="dialog" />

		<q-card-actions v-if="dialog.rejectText || dialog.resolveText" align="right">
			<mett-reject-button v-if="dialog.rejectText" :dialog="dialog" />
			<mett-resolve-button v-if="dialog.resolveText" :dialog="dialog" />
		</q-card-actions>
	</q-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IDialog } from "src/store/dialog/types";
import { Action, Comp } from "src/mett/components/decorators";

@Component
export default class Dialog extends Vue {
	@Comp("Components.Static.DialogList.RejectButton")
	readonly mettRejectButton!: Vue;
	@Comp("Components.Static.DialogList.ResolveButton")
	readonly mettResolveButton!: Vue;

	@Prop() readonly dialog!: IDialog;

	@Action("dialog/rejectDialog") readonly rejectDialog!: ({
		dialog,
		reason
	}: {
		dialog: IDialog;
		reason?: any;
	}) => void;
}
</script>
