<template>
	<q-btn
		round
		flat
		dense
		class="mett-ml-filter-button"
		icon="filter_list"
		color="secondary"
		@click="setFileFilterShow(!fileFilterShow)"
		><q-badge v-if="activeFilters" color="orange" floating>{{ activeFilters }}</q-badge>
	</q-btn>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "src/mett/components/decorators";

@Component
export default class MettMediaLibraryFilterButton extends Vue {
	@Getter("mediaLibrary/fileFilterShow") fileFilterShow!: boolean;
	@Getter("mediaLibrary/activeFilters") activeFilters!: number;

	@Action("mediaLibrary/setFileFilterShow") setFileFilterShow!: (val: boolean) => void;
}
</script>
