<template>
	<q-table
		ref="fileList"
		grid
		:data="fileList"
		:columns="fileSortOptions"
		row-key="guid"
		:filter="fileFilters"
		:filter-method="customFilter"
		hide-header
		hide-bottom
		selection="multiple"
		:selected.sync="selectionModel"
		:pagination.sync="pagination"
		:rows-per-page-options="[0]"
		class="mett-ml-file-list"
		:sort-method="customSort"
		binary-state-sort
		:card-container-class="`q-gutter-${padding}`"
	>
		<template v-slot:item="props">
			<mett-ml-file :props="props"></mett-ml-file>
		</template>
	</q-table>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch, Ref } from "vue-property-decorator";
import { Getter, Action, Comp } from "src/mett/components/decorators";
import { QTable } from "quasar";
import { IFileFilters, FilterComponents } from "src/store/media-library/types";

interface IFilterOptions {
	[key: string]: string[];
}

@Component
export default class MediaLibraryFileList extends Vue {
	@Comp("Components.Static.MediaLibrary.Content.File") mettMlFile!: Vue;

	@Getter("mediaLibrary/fileList") fileList!: object[];
	@Getter("mediaLibrary/fileFilters") fileFilters!: object;
	@Getter("mediaLibrary/fileFilterOptions") fileFilterOptions!: string[];
	@Getter("mediaLibrary/fileSelect") fileSelect!: object[];
	@Getter("mediaLibrary/fileSortOptions") fileSortOptions!: number;
	@Getter("mediaLibrary/fileSortField") fileSortField!: any;
	@Getter("mediaLibrary/fileSortDirection") fileSortDirection!: 0 | 1;
	@Getter("mediaLibrary/fileThumbnailSize") fileThumbnailSize!: number;

	@Action("mediaLibrary/setFileSelect") setFileSelect!: (val: object[]) => void;
	@Action("mediaLibrary/setFileList") setFileList!: () => void;
	@Action("mediaLibrary/setFileFilterOptions") setFileFilterOptions!: (val: IFilterOptions) => void;
	@Action("mediaLibrary/clearFileList") clearFileList!: () => void;
	@Action("mediaLibrary/setFileFilter") setFileFilter!: ({
		key,
		value,
		valueKey
	}: {
		key: string;
		value: any;
		valueKey?: string;
	}) => void;

	@Ref("fileList") fileListEl!: QTable;

	get selectionModel() {
		return this.fileSelect;
	}

	set selectionModel(val: object[]) {
		if (val) this.setFileSelect(val);
	}

	get padding() {
		const options = ["xs", "sm", "md", "lg"];
		return options[Math.round(this.fileThumbnailSize / 0.5) - 1];
	}

	@Watch("fileSortField")
	onFileSortChanged(newVal: any) {
		this.fileListEl.sort(newVal.field);
	}

	customSort(rows: any, sortBy: string) {
		const data = [...rows];

		if (sortBy) {
			data.sort((a, b) => {
				const x = this.fileSortDirection ? b : a;
				const y = this.fileSortDirection ? a : b;

				if (sortBy === "name" || sortBy === "fileName") {
					// string sort
					return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0;
				} else {
					// numeric sort
					return parseFloat(x[sortBy]) - parseFloat(y[sortBy]);
				}
			});
		}

		return data;
	}

	@Watch("filterOptions")
	onFilterOptionsChanged(newVal: IFilterOptions) {
		if (newVal) this.setFileFilterOptions(newVal);
	}

	customFilter(rows: any[], filters: IFileFilters) {
		const filterKeysToFillWithOptions = this.fileFilterOptions;
		const filterOptions: IFilterOptions = {};
		const filterKeys = Object.keys(filters);
		filterKeysToFillWithOptions.map((key: string) => (filterOptions[key] = []));
		// Main filter function, loop through the rows and return false if the row needs to be excluded
		const result = rows.filter(row => {
			// Filterkeys.some checks if one of the filters returns true, if it does we need to exclude that row
			// .some() returns true if one element returns true but we have to return false to exlude the row so hence the !
			const rowResult = !filterKeys.some((key: string) => {
				if (key === "search") {
					if (filters[key] && filters[key].fields) {
						if (
							!filters[key].fields.some((field: string) => {
								// Check for each field if the search text exists in there
								return (row[field] + "").toLowerCase().indexOf(filters[key].value.toLowerCase()) !== -1;
							})
						)
							return true;
					}
				}

				switch (filters[key].component) {
					// Filter by number, compare the setMin and setMax to the row's value
					case FilterComponents.numberRange:
					case FilterComponents.dateRange:
						if (filters[key] && filters[key].active && (filters[key].setMin || filters[key].setMax)) {
							if (
								(filters[key].setMin !== null && row[key] < filters[key].setMin) ||
								(filters[key].setMax !== null && row[key] > filters[key].setMax)
							) {
								return true;
							}
						}
						break;

					// Filter by array of strings
					case FilterComponents.select:
					case FilterComponents.checkbox:
						if (filters[key] && filters[key].active && filters[key].value) {
							// If the row's value is an array check if every value of the filters array occurs in that
							if (Array.isArray(row[key])) {
								if (filters[key].value.some((filter: string) => row[key].indexOf(filter) === -1)) {
									return true;
								}
							} else if (!filters[key].value.includes(row[key])) {
								return true;
							}
						}
						break;

					default:
						break;
				}

				return false;
			});

			// Create new filterOptions object based on the remaining rows
			if (rowResult)
				filterKeysToFillWithOptions.forEach((key: string) => {
					if (typeof row[key] === "string" && filterOptions[key].indexOf(row[key]) === -1) {
						filterOptions[key].push(row[key]);
					} else if (Array.isArray(row[key])) {
						row[key].forEach((item: string) => {
							if (filterOptions[key].indexOf(item) === -1) filterOptions[key].push(item);
						});
					}
				});

			return rowResult;
		});
		this.setFileFilterOptions(filterOptions);
		return result;
	}

	pagination = {
		rowsPerPage: 0
	};

	created() {
		this.setFileList();
	}

	mounted() {
		this.fileListEl.sort(this.fileSortField.field);
	}

	destroyed() {
		this.clearFileList();
	}
}
</script>
