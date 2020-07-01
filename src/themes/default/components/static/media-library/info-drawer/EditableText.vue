<template>
	<q-item>
		<q-item-section>
			<q-input v-model="text" borderless :label="label">
				<template v-slot:prepend>
					<q-icon size="xs" name="edit" color="grey-5" />
				</template>
			</q-input>
		</q-item-section>
		<q-item-section v-if="isChanged" side class="q-gutter-sm" style="flex-direction: row; align-items: center">
			<q-btn icon="check" round outline dense color="primary" @click="applyChange()"></q-btn>
			<q-btn icon="close" round outline dense color="negative" @click="revertChange()"></q-btn>
		</q-item-section>
	</q-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "src/mett/components/decorators";
import { Prop, Watch } from "vue-property-decorator";
import { CustomFileDto } from "src/store/media-library/types";

@Component
export default class MettMediaLibraryEditableText extends Vue {
	@Prop() readonly fileKey!: "name" | "fileName" | "alt" | "caption" | "description" | "author";
	@Prop() readonly label!: string;

	@Getter("mediaLibrary/filePreview") filePreview!: CustomFileDto | null;

	@Action("mediaLibrary/setFileMetaText") setFileMetaText!: ({
		val,
		key
	}: {
		val: string;
		key: "name" | "fileName" | "alt" | "caption" | "description" | "author";
	}) => void;

	text: string | undefined = "";

	get isChanged() {
		return this.filePreview ? this.filePreview[this.fileKey] !== this.text : false;
	}

	revertChange() {
		if (this.filePreview) this.text = this.filePreview[this.fileKey];
	}

	applyChange() {
		if (this.text) this.setFileMetaText({ val: this.text, key: this.fileKey });
	}

	@Watch("filePreview", { immediate: true })
	updateText(newVal: CustomFileDto) {
		if (newVal) {
			this.text = newVal[this.fileKey];
		}
	}
}
</script>
