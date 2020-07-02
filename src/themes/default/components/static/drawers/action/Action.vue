<template>
	<div>
		<mett-action-drawer-close-button />

		<div>
			<component :is="mettContent" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Comp } from "src/mett/components/decorators";

@Component
export default class ActionDrawer extends Vue {
	@Comp("Components.Static.Drawers.Action.CloseButton")
	readonly mettActionDrawerCloseButton!: Vue;

	@Getter("actionDrawer/content") readonly mettContent?: Vue | null;
}
</script>
