<template>
	<div class="mett-item-list" :class="classes" @mouseenter="hover = true" @mouseleave="hover = false">
		<mett-item-list-actions v-if="isEdit" :item="item" :hover="hover" />
		<mett-view-switch v-if="!isEdit" :item="item" :current-view-type="viewType" />

		<mett-items-placeholder
			:key="item.guid"
			:items="relatedItemsToItems(item.relatedItems)"
			:child-display-type="TemplateElementDisplayTypeDto.List"
			:current-view-type="viewType"
			:style="style"
			:class="viewType == ViewTypes.card ? 'mett-card-view q-col-gutter-md' : 'mett-row-view'"
			class="row mett-list-items"
		/>

		<div class="row mett-paging">
			<div class="col-12">
				<mett-previous-page-button :item="item" />
				<mett-manual-page-buttons :item="item" />
				<mett-next-page-button :item="item" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { mixins } from "vue-class-component";
import { Vue, Component, Watch } from "vue-property-decorator";
import { Comp, Action, Getter } from "src/mett/components/decorators";
import ItemContainer from "src/mixins/item-container";
import { TemplateElementDisplayTypeDto, SortOnColumnDto, SortByActionDto } from "src/mett/communication/types";
import { ViewTypes } from "src/store/settings/types";
import { ILoadChildItemsRequest } from "src/store/page/types";

@Component
export default class ItemList extends mixins(ItemContainer) {
	@Comp("Components.Dynamic.ItemList.Buttons.AddButton") mettAddButton!: Vue;
	@Comp("Components.Dynamic.ItemList.Buttons.Paging.ManualPageButtons")
	mettManualPageButtons!: Vue;
	@Comp("Components.Dynamic.ItemList.Buttons.Paging.NextPageButton")
	mettNextPageButton!: Vue;
	@Comp("Components.Dynamic.ItemList.Buttons.Paging.PreviousPageButton")
	mettPreviousPageButton!: Vue;
	@Comp("Components.Dynamic.ItemList.ViewSwitch") mettViewSwitch!: Vue;
	@Comp("Components.Dynamic.ItemList.ItemListActions") mettItemListActions!: Vue;
	@Comp("Components.Static.ItemsPlaceholder") mettItemsPlaceholder!: Vue;

	@Getter("settings/personalByKey") personalByKey!: <T>(key: string) => T;

	@Action("page/loadChildItems")
	loadChildItems!: (options: ILoadChildItemsRequest) => Promise<void>;

	ViewTypes = ViewTypes;
	isLoading = false;
	hover = false;
	TemplateElementDisplayTypeDto = TemplateElementDisplayTypeDto;

	get pageSize() {
		if (this.item && this.item.templateElement && this.item.templateElement.recordsPerPage)
			return this.item.templateElement.recordsPerPage;

		return 10;
	}

	get currentPage(): number {
		if (this.querySettings.page) return this.querySettings.page;

		return 1;
	}

	get classes() {
		return {
			"mett-editable": this.isEdit
		};
	}

	get style() {
		if (this.isLoading) return "opacity: .3;";
		else return "";
	}

	get viewType() {
		let viewType = this.personalByKey<ViewTypes>(this.item.guid + "_viewType");

		if (!viewType) {
			// Todo: default viewType
			viewType = ViewTypes.card;
		}

		return viewType;
	}

	@Watch("currentPage")
	pageIndexChanged() {
		this.loadChildItems({
			item: this.item,
			skip: this.pageSize * (this.currentPage - 1),
			take: this.pageSize,
			sortOnColumn: SortOnColumnDto.Published,
			sortByAction: SortByActionDto.Descending
		}).then(
			() => {},
			() => {}
		);
	}
}
</script>
