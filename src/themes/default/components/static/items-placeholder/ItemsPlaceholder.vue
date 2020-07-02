<template>
	<div class="mett-item-placeholder">
		<component
			:is="obj.el"
			v-for="obj in itemsToRender"
			:key="'item_' + obj.item.guid"
			v-bind="$attrs"
			:item="obj.item"
			:current-view-type="currentViewType"
			:file-element-type="fileElementType"
		/>
	</div>
</template>

<script lang="ts">
import { mixins } from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";
import { ItemDto, TemplateElementDisplayTypeDto } from "src/mett/communication/types";
import ElementsContainer from "src/mixins/elements-container";
import DisplayTypeProvider from "src/mixins/display-type-provider";
import { ViewTypes, FileElementTypes } from "src/store/settings/types";

@Component({ inheritAttrs: false })
export default class ItemsPlaceholder extends mixins(ElementsContainer, DisplayTypeProvider) {
	@Prop({ default: [] }) readonly items!: ItemDto[];
	@Prop() readonly childDisplayType!: TemplateElementDisplayTypeDto;
	@Prop() readonly currentViewType!: ViewTypes;
	@Prop() readonly fileElementType!: FileElementTypes;

	get itemsToRender() {
		return this.items
			.map(item => {
				const el = this.elementByItem(item, { item });
				if (el !== null) {
					return {
						item,
						el
					};
				}
			})
			.filter(item => item !== undefined);
	}
}
</script>
