<template>
	<q-drawer v-model="drawerModel" side="left" bordered class="mett-ml-info-drawer">
		<q-scroll-area class="fit">
			<mett-ml-file-preview></mett-ml-file-preview>
			<mett-ml-info-list></mett-ml-info-list>
		</q-scroll-area>
	</q-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Comp, Getter, Action } from "src/mett/components/decorators";

@Component
export default class MediaLibraryInfoDrawer extends Vue {
	@Comp("Components.Static.MediaLibrary.InfoDrawer.InfoList") mettMlInfoList!: Vue;
	@Comp("Components.Static.MediaLibrary.InfoDrawer.FilePreview") mettMlFilePreview!: Vue;

	@Getter("mediaLibrary/fileInfoShow") fileInfoShow!: boolean;

	@Action("mediaLibrary/setFileInfoShow") setFileInfoShow!: (val: boolean) => void;

	get drawerModel() {
		return this.fileInfoShow;
	}

	set drawerModel(val: boolean) {
		this.setFileInfoShow(val);
	}
}
</script>
