<template>
	<div class="q-px-md inline-block">
		<q-btn
			v-for="(page, index) in manualPages"
			:key="index"
			color="secondary"
			round
			flat
			:text-color="page == currentPage ? 'primary' : 'secondary'"
			size="md"
			:label="page"
			class="mett-paging-button-manual"
			@click="onClick(page)"
		>
		</q-btn>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { ItemDto } from "src/mett/communication/types";
import { Action, Getter } from "src/mett/components/decorators";

@Component
export default class ItemListManualPageButtons extends Vue {
	@Prop() item!: ItemDto;

	@Getter("settings/querySettingByKey") querySettingByKey!: (key: string) => any;

	@Action("settings/setQuerySetting") setQuerySetting!: ({
		key,
		value,
		merge
	}: {
		key: string;
		value: any;
		merge?: boolean;
	}) => void;

	get querySettings() {
		if (!this.item || !this.item.guid) return {};

		return this.querySettingByKey(this.item.guid);
	}

	get currentPage() {
		if (this.querySettings.page) return this.querySettings.page;

		return 1;
	}

	get pageSize() {
		if (
			this.item &&
			this.item.childItemCount &&
			this.item.templateElement &&
			this.item.templateElement.recordsPerPage
		)
			return Math.ceil(this.item.childItemCount / this.item.templateElement.recordsPerPage);

		return 10;
	}

	get manualPages() {
		if (this.currentPage && this.pageSize) {
			const array: number[] = [];
			const startPage = Math.max(1, this.currentPage - 3);
			let endPage = this.currentPage + 3;
			if (endPage - startPage < 6) {
				endPage += 6 - (endPage - startPage);
			}
			endPage = Math.min(this.pageSize, endPage);
			for (let i = startPage; i <= endPage; i++) {
				array.push(i);
			}
			return array;
		}

		return [1];
	}

	onClick(page: number) {
		if (!this.item || !this.item.guid) return;

		this.setQuerySetting({
			key: this.item.guid,
			value: { page: page }
		});
	}
}
</script>
