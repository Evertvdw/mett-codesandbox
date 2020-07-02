<template>
	<q-btn round unelevated outline icon="settings" class="mett-item-list-settings-button" @click="onClick"> </q-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Action, Comp } from "src/mett/components/decorators";

@Component
export default class ItemListSettingsButton extends Vue {
	@Comp("Components.Static.Drawers.Action.Settings") readonly mettActionDrawerSettings!: Vue;

	@Action("actionDrawer/setContent") setActionDrawerContent!: ({ content }: { content?: Vue }) => void;
	@Action("layout/setActionDrawer") setActionDrawer!: (val: boolean) => void;

	@Prop() readonly hover?: boolean;

	onClick() {
		this.setActionDrawerContent({ content: this.mettActionDrawerSettings });
		this.setActionDrawer(true);
	}
}
</script>
