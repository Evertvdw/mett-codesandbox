<template>
	<div class="items-center inline-block">
		<q-btn
			fab-mini
			flat
			color="primary"
			icon="arrow_left"
			:disable="currentPage == 1"
			class="mett-paging-button-previous"
			@click="onClick"
		/>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { ItemDto } from "src/mett/communication/types";
import { Action, Getter } from "src/mett/components/decorators";

@Component
export default class ItemListPreviousPageButton extends Vue {
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

	onClick() {
		if (!this.item || !this.item.guid) return;

		const previousPage = this.currentPage - 1;

		this.setQuerySetting({
			key: this.item.guid,
			value: { page: previousPage }
		});
	}
}
</script>
