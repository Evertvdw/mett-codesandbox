<template>
	<transition
		appear
		:enter-active-class="`animated ${transitionIn}`"
		:leave-active-class="`animated ${transitionOut}`"
		mode="out-in"
		:duration="200"
	>
		<component :is="layoutComponent" :item="item" @click.native="navigateToItem" @slot-names-set="onSlotNamesSet">
			<template v-for="(slotName, index) in slotNames" #[slotName]>
				<mett-items-placeholder
					:key="'slot_placeholder_' + index"
					:items="itemsForSlot(slotName)"
					:file-element-type="FileElementTypes.div"
				/>
			</template>
		</component>
	</transition>
</template>

<script lang="ts">
import { mixins } from "vue-class-component";
import { Vue, Component, Prop } from "vue-property-decorator";
import { Comp, Getter } from "src/mett/components/decorators";
import ItemContainer from "src/mixins/item-container";
import { TemplateElementDisplayTypeDto, ItemDto } from "src/mett/communication/types";
import { ViewTypes, FileElementTypes } from "src/store/settings/types";

@Component
export default class ListItem extends mixins(ItemContainer) {
	@Comp("Components.Dynamic.ListItem.Card") mettCard!: Vue;
	@Comp("Components.Dynamic.ListItem.Detail") mettDetail!: Vue;
	@Comp("Components.Dynamic.ListItem.Row") mettRow!: Vue;
	@Comp("Components.Static.ItemsPlaceholder") mettItemsPlaceholder!: Vue;

	@Prop() readonly currentViewType!: ViewTypes;

	@Getter("settings/personalByKey") personalByKey!: (key: string) => any;
	@Getter("page/itemByGuid") itemByGuid!: (guid: string) => ItemDto | undefined;

	FileElementTypes = FileElementTypes;
	slotNames: string[] = [];

	get transitionIn() {
		return "fadeIn";
	}

	get transitionOut() {
		return this.item.isBeingDeleted ? "zoomOut" : "fadeOut";
	}

	get layoutComponent() {
		// Todo: default layout
		let layout = this.mettCard;

		if (this.currentDisplayType == TemplateElementDisplayTypeDto.Page) {
			layout = this.mettDetail;
		} else if (this.currentViewType == ViewTypes.list) {
			layout = this.mettRow;
		}

		return layout;
	}

	onSlotNamesSet(slotNames: string[]) {
		this.slotNames = slotNames;
	}

	itemsForSlot(slotName: string) {
		const allItems = this.relatedItemsToItems(this.item.relatedItems);

		const filteredItems = allItems.filter((i) => {
			let itemSlotName = "default";

			if (i.templateModelElement && i.templateModelElement.options) {
				const options = JSON.parse(i.templateModelElement.options);

				if (options.slot && this.slotNames && this.slotNames.indexOf(options.slot) > -1)
					itemSlotName = options.slot;
			}

			return itemSlotName == slotName;
		});

		return filteredItems;
	}

	navigateToItem() {
		if (this.isEdit) return;

		if (!this.$route.params.itemName && this.item.menuItem)
			this.$router.push({
				path: this.$route.path + "/item/" + this.item.menuItem.urlSegment,
			});
	}
}
</script>
