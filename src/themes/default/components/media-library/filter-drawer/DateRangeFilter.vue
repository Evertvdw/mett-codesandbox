<template>
	<q-list dense class="mett-ml-date-range-filter">
		<q-item class="mett-ml-filter-title">
			<q-item-section class="text-weight-bold text-primary">{{ filter.title }}</q-item-section>
			<q-item-section v-show="filterActive" side>
				<q-btn flat round dense color="negative" icon="delete" @click="disableFilter()" />
			</q-item-section>
		</q-item>

		<q-item>
			<q-input
				ref="minInput"
				v-model="minModel"
				dense
				outlined
				type="date"
				:rules="[
					val =>
						(new Date(maxModel).getTime()
							? new Date(val).getTime() < new Date(maxModel).getTime()
							: true) || $t('ml.filters.dateEarly'),
					val => new Date(val).getTime() > 0 || $t('ml.filters.dateInvalid')
				]"
				class="mett-ml-date-range-filter-input"
				@input="validate"
			/>
		</q-item>
		<q-item>
			<q-item-section class="text-center">{{ $t("ml.filters.rangeDivider") }}</q-item-section>
		</q-item>
		<q-item>
			<q-input
				ref="maxInput"
				v-model="maxModel"
				dense
				outlined
				class="mett-ml-date-range-filter-input"
				type="date"
				:rules="[
					val =>
						(new Date(minModel).getTime()
							? new Date(val).getTime() > new Date(minModel).getTime()
							: true) || $t('ml.filters.dateLate'),
					val => new Date(val).getTime() > 0 || $t('ml.filters.dateInvalid')
				]"
				@input="validate"
			/>
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
import { IFileFilters, DateRangeFilter } from "src/store/media-library/types";
import { Prop } from "vue-property-decorator";
import { date, QInput } from "quasar";

@Component
export default class MettMediaLibraryDateRangeFilter extends Vue {
	@Prop() readonly filter!: DateRangeFilter;
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

	// A date is stored as unix but needs to be inserted into the date field as date string
	// So the get and set of the models handle this conversion
	// Unix timestamps are numbers and easy to compare for filtering :)
	get minModel() {
		return date.formatDate(this.fileFilters[this.filterKey].min, "YYYY-MM-DD");
	}

	set minModel(val: string) {
		this.setFileFilter({ key: this.filterKey, value: new Date(val).getTime(), valueKey: "min" });
	}

	get maxModel() {
		return date.formatDate(this.fileFilters[this.filterKey].max, "YYYY-MM-DD");
	}

	set maxModel(val: string) {
		this.setFileFilter({ key: this.filterKey, value: new Date(val).getTime(), valueKey: "max" });
	}

	get filterActive() {
		return this.fileFilters[this.filterKey].active;
	}

	buttonDisabled() {
		if (this.minModel === undefined && this.maxModel === undefined) return true;
		if (
			this.fileFilters[this.filterKey].min >= this.fileFilters[this.filterKey].max &&
			this.minModel !== undefined &&
			this.maxModel !== undefined
		)
			return true;
		return false;
	}

	validate() {
		if (this.minModel) this.minInput.validate();
		if (this.maxModel) this.maxInput.validate();
	}

	disableFilter() {
		this.setFileFilter({ key: this.filterKey, value: false, valueKey: "active" });
	}

	updateFilter() {
		this.setFileFilter({ key: this.filterKey, value: this.fileFilters[this.filterKey].min, valueKey: "setMin" });
		this.setFileFilter({ key: this.filterKey, value: this.fileFilters[this.filterKey].max, valueKey: "setMax" });
		this.setFileFilter({ key: this.filterKey, value: true, valueKey: "active" });
	}
}
</script>
