<template>
	<q-input
		v-model="searchModel"
		class="col mett-ml-search-field"
		color="secondary"
		dense
		outlined
		debounce="300"
		:label="$t('ml.header.search')"
	>
		<template v-slot:append>
			<q-icon name="search" />
		</template>
	</q-input>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "src/mett/components/decorators";

@Component
export default class MettMediaLibrarySearchField extends Vue {
	@Getter("mediaLibrary/fileFilters") fileFilters!: { search: any };

	@Action("mediaLibrary/setFileFilter") setFileFilter!: ({ key, value }: { key: string; value: any }) => void;

	get searchModel() {
		return this.fileFilters.search.value;
	}

	set searchModel(val: string) {
		this.setFileFilter({ key: "search", value: val });
	}
}
</script>
