<template>
	<q-footer class="mett-ml-footer text-center" bordered>
		<mett-ml-selection-info></mett-ml-selection-info>
		<div class="row q-gutter-x-md q-pa-sm">
			<mett-ml-add-button></mett-ml-add-button>
			<q-space></q-space>
			<mett-ml-delete-button></mett-ml-delete-button>
			<mett-ml-use-button></mett-ml-use-button>
		</div>
	</q-footer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Comp } from "src/mett/components/decorators";

@Component
export default class MediaLibraryFooter extends Vue {
	@Comp("Components.Static.MediaLibrary.Footer.AddButton") mettMlAddButton!: Vue;
	@Comp("Components.Static.MediaLibrary.Footer.DeleteButton") mettMlDeleteButton!: Vue;
	@Comp("Components.Static.MediaLibrary.Footer.UseButton") mettMlUseButton!: Vue;
	@Comp("Components.Static.MediaLibrary.Footer.SelectionInfo") mettMlSelectionInfo!: Vue;
}
</script>
