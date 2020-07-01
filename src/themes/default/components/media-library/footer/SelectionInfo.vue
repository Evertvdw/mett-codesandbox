<template>
	<div v-if="fileSelect.length" class="bg-grey-3 text-grey text-subtitle2 row q-px-sm mett-ml-selection-info">
		<span class="text-weight-bold"> {{ fileSelect.length }} / {{ fileList.length }}&nbsp;</span>
		{{ $t("ml.footer.selected") }}
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "src/mett/components/decorators";

@Component
export default class MettMediaLibrarySelectionInfo extends Vue {
	@Getter("mediaLibrary/fileSelect") fileSelect!: object[];
	@Getter("mediaLibrary/fileList") fileList!: object[];
}
</script>
