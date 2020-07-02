<template>
	<!-- Todo: This component needs work -->
	<div class="mett-search-results">
		<div v-if="isSearching">
			Zoeken...
		</div>
		<div v-else-if="searchResults == []">
			Gebruik de zoekbalk om te zoeken.
		</div>
		<div v-else-if="!searchResults || searchResults.length == 0">
			Geen resultaten gevonden.
		</div>
		<div v-else>
			<ul>
				<li v-for="(result, index) in searchResults" :key="'searchResult_' + index">
					{{ result.value }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "src/mett/components/decorators";
import { SearchResultDto } from "src/mett/communication/types";

@Component
export default class ActionDrawerSearchResults extends Vue {
	@Getter("search/results") readonly searchResults!: SearchResultDto[];
	@Getter("search/isSearching") readonly isSearching!: boolean;
}
</script>
