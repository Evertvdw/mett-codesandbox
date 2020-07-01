<template>
	<q-list dense class="mett-ml-checkbox-filter">
		<q-item class="mett-ml-filter-title">
			<q-item-section class="text-weight-bold text-primary">{{ filter.title }}</q-item-section>
			<q-item-section v-show="filterActive" side>
				<q-btn flat round dense color="negative" icon="delete" @click="disableFilter()" />
			</q-item-section>
		</q-item>
		<q-item v-for="option in filterOptions" :key="option">
			<q-checkbox v-model="selectionModel" dense :val="option" :label="capitalize(option)" color="secondary" />
		</q-item>
	</q-list>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "src/mett/components/decorators";
import { IFileFilters, CheckboxFilter } from "src/store/media-library/types";
import { Prop } from "vue-property-decorator";

import { format } from "quasar";
const { capitalize } = format;

@Component
export default class MettMediaLibraryCheckboxFilter extends Vue {
	@Prop() readonly filter!: CheckboxFilter;
	@Prop() readonly filterKey!: string;

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

	capitalize = capitalize;

	get selectionModel() {
		return this.fileFilters[this.filterKey].value;
	}

	set selectionModel(val: string[]) {
		this.setFileFilter({ key: this.filterKey, value: val });
		if (val.length) {
			this.setFileFilter({ key: this.filterKey, value: true, valueKey: "active" });
		} else {
			this.setFileFilter({ key: this.filterKey, value: false, valueKey: "active" });
		}
	}

	get filterOptions() {
		return this.fileFilters[this.filterKey].options;
	}

	get filterActive() {
		return this.fileFilters[this.filterKey].active;
	}

	disableFilter() {
		this.setFileFilter({ key: this.filterKey, value: false, valueKey: "active" });
		this.setFileFilter({ key: this.filterKey, value: [] });
	}
}
</script>
