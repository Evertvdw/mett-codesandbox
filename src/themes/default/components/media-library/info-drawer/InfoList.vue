<template>
	<q-list v-if="filePreview" separator class="mett-ml-info-list">
		<q-item>
			<q-item-section>
				<q-item-label>{{ new Date(filePreview.created).toLocaleString() }}</q-item-label>
				<q-item-label caption>{{ $t("ml.infoList.created") }}</q-item-label>
			</q-item-section>
		</q-item>
		<mett-media-library-file-tags></mett-media-library-file-tags>
		<mett-media-library-editable-text
			:file-key="'name'"
			:label="$t('ml.infoList.name')"
		></mett-media-library-editable-text>
		<mett-media-library-editable-text
			:file-key="'fileName'"
			:label="$t('ml.infoList.fileName')"
		></mett-media-library-editable-text>
		<mett-media-library-editable-text
			:file-key="'alt'"
			:label="$t('ml.infoList.alt')"
		></mett-media-library-editable-text>
		<mett-media-library-editable-text
			:file-key="'caption'"
			:label="$t('ml.infoList.caption')"
		></mett-media-library-editable-text>
		<mett-media-library-editable-text
			:file-key="'description'"
			:label="$t('ml.infoList.description')"
		></mett-media-library-editable-text>
		<mett-media-library-editable-text
			:file-key="'author'"
			:label="$t('ml.infoList.author')"
		></mett-media-library-editable-text>
		<q-item>
			<q-item-section>
				<q-item-label>{{ filePreview.fileSize }}kb</q-item-label>
				<q-item-label caption>{{ $t("ml.infoList.fileSize") }}</q-item-label>
			</q-item-section>
		</q-item>
		<!-- Todo: Change to type Audio when available -->
		<q-item v-if="filePreview.fileType !== 'Unknown'">
			<q-item-section>
				<q-item-label>{{ filePreview.width }} x {{ filePreview.height }}</q-item-label>
				<q-item-label caption>{{ $t("ml.infoList.size") }}</q-item-label>
			</q-item-section>
		</q-item>
		<q-item>
			<q-item-section>
				<q-item-label><a href="http://" target="_blank" rel="noopener noreferrer">Link</a></q-item-label>
				<q-item-label caption>{{ $t("ml.infoList.download") }}</q-item-label>
			</q-item-section>
		</q-item>
	</q-list>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Comp } from "src/mett/components/decorators";
// import { FileDto } from "src/mett/communication/types";
import { CustomFileDto } from "src/store/media-library/types";

@Component
export default class MettMediaLibraryInfoList extends Vue {
	@Comp("Components.Static.MediaLibrary.InfoDrawer.FileTags") mettMediaLibraryFileTags!: Vue;
	@Comp("Components.Static.MediaLibrary.InfoDrawer.EditableText") mettMediaLibraryEditableText!: Vue;

	@Getter("mediaLibrary/filePreview") filePreview!: CustomFileDto | null;
}
</script>
