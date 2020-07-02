<template>
	<div class="mett-item-description">
		<mett-items-placeholder :items="relatedItemsToItems(item.relatedItems)" :is-description="true" />
	</div>
</template>

<script lang="ts">
import { mixins } from "vue-class-component";
import { Vue, Component } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";
import ItemContainer from "src/mixins/item-container";

@Component
export default class ListItemDescription extends mixins(ItemContainer) {
	@Comp("Components.Static.ItemsPlaceholder") mettItemsPlaceholder!: Vue;
}
</script>
