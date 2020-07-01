<template>
	<q-header class="mett-ml-header" bordered reveal>
		<q-toolbar class="q-py-md q-gutter-x-md">
			<mett-ml-size-slider></mett-ml-size-slider>
			<q-space></q-space>
			<mett-ml-sorting-field></mett-ml-sorting-field>
			<mett-ml-search-field></mett-ml-search-field>
			<mett-ml-filter-button></mett-ml-filter-button>
		</q-toolbar>
	</q-header>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Comp } from "src/mett/components/decorators";

@Component
export default class MediaLibraryHeader extends Vue {
	@Comp("Components.Static.MediaLibrary.Header.SizeSlider") mettMlSizeSlider!: Vue;
	@Comp("Components.Static.MediaLibrary.Header.SearchField") mettMlSearchField!: Vue;
	@Comp("Components.Static.MediaLibrary.Header.SortingField") mettMlSortingField!: Vue;
	@Comp("Components.Static.MediaLibrary.Header.FilterButton") mettMlFilterButton!: Vue;
}
</script>
