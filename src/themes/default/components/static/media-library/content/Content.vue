<template>
	<q-page-container>
		<q-page class="mett-ml-content q-px-sm">
			<mett-ml-file-list />
		</q-page>
	</q-page-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Comp } from "src/mett/components/decorators";

@Component
export default class MediaLibraryContent extends Vue {
	@Comp("Components.Static.MediaLibrary.Content.FileList") mettMlFileList!: Vue;
}
</script>
