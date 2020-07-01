<template>
	<div class="mett-ml-filter-list">
		<component
			:is="`${filter.component}`"
			v-for="(filter, key) in filters"
			:key="key"
			:filter="filter"
			:filter-key="key"
		>
		</component>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Comp, Getter } from "src/mett/components/decorators";
import { IFileFilters } from "src/store/media-library/types";

@Component
export default class MettMediaLibrarayFilterList extends Vue {
	@Comp("Components.Static.MediaLibrary.FilterDrawer.NumberRangeFilter") mettMlNumberRangeFilter!: Vue;
	@Comp("Components.Static.MediaLibrary.FilterDrawer.SelectFilter") mettMlSelectFilter!: Vue;
	@Comp("Components.Static.MediaLibrary.FilterDrawer.CheckboxFilter") mettMlCheckboxFilter!: Vue;
	@Comp("Components.Static.MediaLibrary.FilterDrawer.DateRangeFilter") mettMlDateRangeFilter!: Vue;

	@Getter("mediaLibrary/fileFilters") fileFilters!: IFileFilters;

	// Search is also a filter so we need to exclude this from the list
	get filters() {
		const clone = Object.assign({}, this.fileFilters);
		delete clone.search;
		return clone;
	}
}
</script>
