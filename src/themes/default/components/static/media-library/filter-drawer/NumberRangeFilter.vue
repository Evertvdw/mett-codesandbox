<template>
	<q-list dense class="mett-ml-number-range-filter">
		<q-item class="mett-ml-filter-title">
			<q-item-section class="text-weight-bold text-primary">{{ filter.title }}</q-item-section>
			<q-item-section v-show="filterActive" side>
				<q-btn flat round dense color="negative" icon="delete" @click="disableFilter()" />
			</q-item-section>
		</q-item>

		<q-item>
			<q-input
				ref="minInput"
				v-model.number="minModel"
				class="mett-ml-number-range-filter-input"
				type="number"
				outlined
				dense
				min="1"
				:hint="`In ${filter.unit}`"
				:rules="[
					val => (maxModel ? val < maxModel : true) || $t('ml.filters.numberToBig'),
					val => val > 0 || $t('ml.filters.numberInvalid')
				]"
				@input="validate"
			>
			</q-input>
			<q-item-section class="text-center">{{ $t("ml.filters.rangeDivider") }}</q-item-section>
			<q-input
				ref="maxInput"
				v-model.number="maxModel"
				class="mett-ml-number-range-filter-input"
				type="number"
				outlined
				dense
				:hint="`In ${filter.unit}`"
				min="1"
				:rules="[
					val => (minModel ? val > minModel : true) || $t('ml.filters.numberToSmall'),
					val => val > 0 || $t('ml.filters.numberInvalid')
				]"
				@input="validate"
			>
			</q-input>
		</q-item>
		<q-item class="justify-center">
			<q-btn
				flat
				color="primary"
				:label="$t('ml.filters.apply')"
				icon="chevron_left"
				size="sm"
				:disable="buttonDisabled()"
				@click="updateFilter()"
			></q-btn>
		</q-item>
	</q-list>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action, Ref } from "src/mett/components/decorators";
import { IFileFilters, NumberRangeFilter } from "src/store/media-library/types";
import { Prop } from "vue-property-decorator";
import { QInput } from "quasar";

@Component
export default class MettMediaLibraryNumberRangeFilter extends Vue {
	@Prop() readonly filter!: NumberRangeFilter;
	@Prop() readonly filterKey!: string;

	@Ref("minInput") minInput!: QInput;
	@Ref("maxInput") maxInput!: QInput;

	@Getter("mediaLibrary/fileFilters") fileFilters!: IFileFilters;

	@Action("mediaLibrary/setFileFilter") setFileFilter!: ({
		key,
		value,
		valueKey
	}: {
		key: string;
		value: any;
		valueKey?: string;
	}) => void;

	get minModel() {
		return this.fileFilters[this.filterKey].min;
	}

	set minModel(val: number) {
		this.setFileFilter({ key: this.filterKey, value: val, valueKey: "min" });
	}

	get maxModel() {
		return this.fileFilters[this.filterKey].max;
	}

	set maxModel(val: number) {
		this.setFileFilter({ key: this.filterKey, value: val, valueKey: "max" });
	}

	get filterActive() {
		return this.fileFilters[this.filterKey].active;
	}

	buttonDisabled() {
		if (this.minModel === null && this.maxModel === null) return true;
		if (this.minModel >= this.maxModel && this.minModel !== null && this.maxModel !== null) return true;
		return false;
	}

	disableFilter() {
		this.setFileFilter({ key: this.filterKey, value: false, valueKey: "active" });
	}

	validate() {
		if (this.minModel) this.minInput.validate();
		if (this.maxModel) this.maxInput.validate();
	}

	updateFilter() {
		this.setFileFilter({ key: this.filterKey, value: this.minModel, valueKey: "setMin" });
		this.setFileFilter({ key: this.filterKey, value: this.maxModel, valueKey: "setMax" });
		this.setFileFilter({ key: this.filterKey, value: true, valueKey: "active" });
	}
}
</script>
