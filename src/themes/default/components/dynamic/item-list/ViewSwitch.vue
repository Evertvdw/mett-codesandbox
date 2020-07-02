<template>
	<div class="mett-view-switch row">
		<div class="col-12">
			<q-btn
				class="mett-view-switch-button-list"
				round
				unelevated
				icon="view_list"
				:class="{ 'mett-selected': viewType == ViewTypes.list }"
				@click="viewType = ViewTypes.list"
			/>

			<q-btn
				class="mett-view-switch-button-card"
				round
				unelevated
				icon="view_module"
				:class="{ 'mett-selected': viewType == ViewTypes.card }"
				@click="viewType = ViewTypes.card"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Action } from "src/mett/components/decorators";
import { ViewTypes } from "src/store/settings/types";
import { ItemDto } from "src/mett/communication/types";

@Component
export default class ItemListViewSwitch extends Vue {
	@Prop() readonly item?: ItemDto;
	@Prop() readonly currentViewType!: ViewTypes;

	@Action("settings/setPersonalSetting") setPersonalSetting!: ({ key, value }: { key: string; value: any }) => void;

	ViewTypes = ViewTypes;
	viewType = this.currentViewType;

	@Watch("viewType")
	viewTypeChanged() {
		if (this.item) {
			this.setPersonalSetting({
				key: this.item.guid + "_viewType",
				value: this.viewType
			});
		}

		return this.viewType;
	}
}
</script>
