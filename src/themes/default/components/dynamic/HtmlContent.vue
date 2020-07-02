<template>
	<div class="mett-item-html-content">
		<mett-items-placeholder :items="relatedItemsToItems(item.relatedItems)" />
	</div>
</template>

<script lang="ts">
import { mixins } from "vue-class-component";
import { Vue, Component } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";
import ItemContainer from "src/mixins/item-container";

@Component
export default class ListItemHtmlContent extends mixins(ItemContainer) {
	@Comp("Components.Static.ItemsPlaceholder") mettItemsPlaceholder!: Vue;
}
</script>
