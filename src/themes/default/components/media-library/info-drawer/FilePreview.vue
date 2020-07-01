<template>
	<q-list v-if="filePreview" class="mett-ml-file-preview">
		<q-item v-if="isImage" class="q-pa-none bg-grey-3 overflow-hidden">
			<q-img
				:src="filePreview.url"
				contain
				:class="getRotateClass()"
				class="mett-ml-file-preview-image"
				:style="{ opacity: filePreview.fileEdit ? 0.5 : 1 }"
				placeholder-src="demo-images/placeholder-image.png"
			>
			</q-img>
			<q-img
				v-if="filePreview.fileEdit"
				:src="filePreview.url"
				contain
				basic
				class="mett-ml-file-preview-image-crop"
				:style="{
					'clip-path': filePreview.fileEdit.clipPath,
					width: calculateWidth(),
					height: calculateHeight(),
					transform: `translate(-50%,-50%) ${getRotateStyle()}`
				}"
			>
			</q-img>
		</q-item>
		<q-item v-if="isVideo || isAudio" class="q-pa-none bg-grey-3">
			<video v-if="isVideo" ref="videoPlayer" class="mett-video-player" controls :height="200" :width="300">
				<source :src="filePreview.url" type="video/mp4" />
			</video>
			<audio v-if="isAudio" :src="filePreview.url" class="mett-audio-player" type="audio/mpeg" controls></audio>
		</q-item>
		<q-item v-if="isVideoUrl" class="q-pa-none bg-grey-3">
			<q-video :src="filePreview.url"></q-video>
		</q-item>
		<q-item v-if="isImage">
			<q-btn icon="edit" :disable="!filePreview.url" flat dense @click="onClick"></q-btn>
		</q-item>
		<q-separator></q-separator>
	</q-list>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action, Comp, Ref } from "src/mett/components/decorators";
import { IDialog } from "src/store/dialog/types";
import { CustomFileDto } from "src/store/media-library/types";
import { FileTypeDto } from "src/mett/communication/types";
import { Watch } from "vue-property-decorator";

@Component
export default class MettMediaLibraryFilePreview extends Vue {
	@Comp("Components.Static.DialogList.Dialogs.ImageEditDialog")
	readonly mettImageEditDialog!: Vue;

	@Getter("mediaLibrary/filePreview") filePreview!: CustomFileDto | null;

	@Action("dialog/openDialog") openDialog!: ({ dialog }: { dialog: IDialog }) => Promise<any>;

	@Ref("videoPlayer") videoPlayer!: HTMLVideoElement;

	onClick() {
		const dialog: IDialog = {
			title: this.$t("dialogs.imageEdit.title"),
			titleClass: "text-h6",
			component: this.mettImageEditDialog,
			resolveText: this.$t("dialogs.imageEdit.resolve"),
			rejectText: this.$t("dialogs.imageEdit.reject"),
			customMaxWidth: "80vw"
		};

		this.openDialog({ dialog }).then(
			() => {},
			() => {}
		);
	}

	@Watch("filePreview.url")
	onVideoUrlChange(newVal: string, oldVal: string) {
		if (this.isVideo && oldVal && this.videoPlayer) {
			this.videoPlayer.load();
		}
	}

	get isImage() {
		return this.filePreview && this.filePreview.fileType === FileTypeDto.Image;
	}

	get isAudio() {
		// Todo: Change this to type Audio when that is available
		return this.filePreview && this.filePreview.fileType === FileTypeDto.Unknown;
	}

	get isVideo() {
		return (
			this.filePreview && this.filePreview.fileType === FileTypeDto.Video && this.filePreview.url.endsWith(".mp4")
		);
	}

	get isVideoUrl() {
		return (
			this.filePreview &&
			this.filePreview.fileType === FileTypeDto.Video &&
			!this.filePreview.url.endsWith(".mp4")
		);
	}

	setHeight = 200;
	setWidth = 300;
	setRatio = this.setWidth / this.setHeight;

	getRotateClass() {
		if (this.filePreview && this.filePreview.fileEdit) {
			return `rotate-${this.filePreview.fileEdit.normalizedRotate}`;
		}
		return "";
	}

	getRotateStyle() {
		if (this.filePreview && this.filePreview.fileEdit) {
			return `rotate(${this.filePreview.fileEdit.normalizedRotate}deg)`;
		}
		return "";
	}

	calculateWidth() {
		if (this.filePreview) {
			const ratio = this.filePreview.width / this.filePreview.height;
			if (ratio < this.setRatio) {
				return `${this.filePreview.width * (this.setHeight / this.filePreview.height)}px`;
			} else {
				return `${this.setWidth}px`;
			}
		}
	}

	calculateHeight() {
		if (this.filePreview) {
			const ratio = this.filePreview.width / this.filePreview.height;
			if (ratio < this.setRatio) {
				return `${this.setHeight}px`;
			} else {
				return `${this.filePreview.height * (this.setWidth / this.filePreview.width)}px`;
			}
		}
	}
}
</script>
