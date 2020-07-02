<template>
	<q-route-tab v-if="menuItem" :to="'/' + menuItem.urlSegment" :label="menuItem.name" :ripple="false">
		<q-list v-if="relatedMenuItems.length && menuItem.urlSegment !== 'home'" class="shadow-2">
			<q-item
				v-for="(subMenuItem, index) in relatedMenuItems"
				:key="index"
				:to="`/${menuItem.urlSegment}/${subMenuItem.urlSegment}`"
				class="mett-main-menu-item"
			>
				<q-item-section>{{ subMenuItem.name }}</q-item-section>
			</q-item>
		</q-list>
	</q-route-tab>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { MenuItemDto } from "src/mett/communication/types";
import { Prop } from "vue-property-decorator";

@Component
export default class MainMenuItem extends Vue {
	@Prop() menuItem?: MenuItemDto;

	dropdown = false;

	get relatedMenuItems() {
		if (!this.menuItem || !this.menuItem.relatedMenuItems) return [];

		return this.menuItem.relatedMenuItems;
	}
}
</script>
