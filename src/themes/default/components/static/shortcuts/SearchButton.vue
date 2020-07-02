<template>
	<div v-show="show" class="mett-shortcut mett-shortcut-search">
		<q-btn icon="search" dense flat round @click="onClick" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import { Vue, Component } from "vue-property-decorator";
import { Getter, Comp, Action } from "src/mett/components/decorators";

@Component
export default class ShortcutsSearchButton extends Vue {
	@Comp("Components.Static.Drawers.Action.Search") readonly mettActionDrawerSearch!: Vue;

	@Getter("layout/actionDrawer") actionDrawer!: boolean;

	@Action("actionDrawer/setContent") setActionDrawerContent!: ({ content }: { content?: Vue }) => void;
	@Action("layout/setActionDrawer") setActionDrawer!: (val: boolean) => void;

	query = "";

	get show() {
		return this.$route.name != "SearchPage";
	}

	onClick() {
		this.setActionDrawerContent({ content: this.mettActionDrawerSearch });
		this.setActionDrawer(!this.actionDrawer);
	}
}
</script>
