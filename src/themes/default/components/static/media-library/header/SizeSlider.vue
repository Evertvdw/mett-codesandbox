<template>
	<q-item class="col mett-ml-size-slider">
		<q-item-section side>
			<q-icon name="aspect_ratio" size="1.2em" />
		</q-item-section>
		<q-item-section>
			<q-slider v-model="fileThumbnailSizeModel" :min="0.5" :max="2" :step="0.3" snap dense />
		</q-item-section>
		<q-item-section side>
			<q-icon name="aspect_ratio" size="1.8em" />
		</q-item-section>
	</q-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "src/mett/components/decorators";

@Component
export default class MediaLibrarySizeSlider extends Vue {
	@Getter("mediaLibrary/fileThumbnailSize") fileThumbnailSize!: number;

	@Action("mediaLibrary/setFileThumbnailSize") setFileThumbnailSize!: (val: number) => void;

	get fileThumbnailSizeModel() {
		return this.fileThumbnailSize;
	}

	set fileThumbnailSizeModel(val: number) {
		this.setFileThumbnailSize(val);
	}
}
</script>
