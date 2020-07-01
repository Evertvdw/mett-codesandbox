<template>
	<q-drawer v-model="drawerModel" :width="300" side="right" bordered overlay class="mett-ml-filter-drawer">
		<mett-ml-filter-list></mett-ml-filter-list>
	</q-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action, Comp } from "src/mett/components/decorators";

@Component
export default class MettMediaLibraryFilterDrawer extends Vue {
	@Comp("Components.Static.MediaLibrary.FilterDrawer.FilterList") mettMlFilterList!: Vue;

	@Getter("mediaLibrary/fileFilterShow") fileFilterShow!: boolean;

	@Action("mediaLibrary/setFileFilterShow") setFileFilterShow!: (val: boolean) => void;

	get drawerModel() {
		return this.fileFilterShow;
	}

	set drawerModel(val: boolean) {
		this.setFileFilterShow(val);
	}
}
</script>
