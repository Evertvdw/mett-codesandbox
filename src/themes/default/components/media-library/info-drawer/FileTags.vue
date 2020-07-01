<template>
	<q-item class="mett-ml-file-tags">
		<q-select
			v-model="selectionModel"
			dense
			outlined
			use-input
			use-chips
			multiple
			hide-dropdown-icon
			input-debounce="0"
			class="mett-ml-file-tags-input"
			new-value-mode="add-unique"
			:hint="$t('ml.infoList.tagHint')"
		/>
	</q-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "src/mett/components/decorators";
// import { FileDto } from 'src/mett/communication/types';
import { CustomFileDto } from "src/store/media-library/types";

@Component
export default class MettMediaLibraryFileTags extends Vue {
	@Getter("mediaLibrary/filePreview") filePreview!: CustomFileDto | null;

	@Action("mediaLibrary/setFileTags") setFileTags!: (val: string[]) => void;

	get selectionModel() {
		if (this.filePreview) return this.filePreview.tags;
		return [];
	}

	set selectionModel(val: string[]) {
		if (this.filePreview) this.setFileTags(val);
	}
}
</script>
