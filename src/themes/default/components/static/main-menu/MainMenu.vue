<template>
	<q-tabs
		:vertical="$q.screen.lt.md"
		:breakpoint="0"
		align="left"
		active-color="primary"
		no-caps
		inline-label
		class="mett-main-menu"
	>
		<mett-main-menu-item :menu-item="rootMenuItem" />

		<mett-main-menu-item
			v-for="(menuItem, index) in relatedMenuItems"
			:key="index"
			:menu-item="menuItem"
		></mett-main-menu-item>
	</q-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Comp } from "src/mett/components/decorators";
import { MenuItemDto } from "src/mett/communication/types";

@Component
export default class MainMenu extends Vue {
	@Comp("Components.Static.MainMenu.MainMenuItem") mettMainMenuItem!: Vue;

	@Getter("menu/menuItem") rootMenuItem!: MenuItemDto;

	get relatedMenuItems() {
		if (!this.rootMenuItem || !this.rootMenuItem.relatedMenuItems) return [];

		return this.rootMenuItem.relatedMenuItems;
	}
}
</script>
