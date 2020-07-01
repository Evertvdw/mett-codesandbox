<template>
	<div>
		<vue-cropper
			ref="cropper"
			:src="filePreview.url"
			:container-style="{ 'max-width': '80vw', 'max-height': '60vh' }"
			:img-style="{ width: filePreview.width, height: filePreview.height }"
			@ready="onReady"
		>
		</vue-cropper>
		<div class="q-py-md q-gutter-md">
			<q-btn round color="secondary" icon="zoom_out_map" @click="$refs.cropper.reset()" />
			<q-btn round color="secondary" icon="zoom_in" @click="$refs.cropper.relativeZoom(0.2)" />
			<q-btn round color="secondary" icon="zoom_out" @click="$refs.cropper.relativeZoom(-0.2)" />
			<q-btn round color="secondary" icon="rotate_left" @click="$refs.cropper.rotate(-90)" />
			<q-btn round color="secondary" icon="rotate_right" @click="$refs.cropper.rotate(90)" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref } from "vue-property-decorator";
import { Getter, Comp, Action } from "src/mett/components/decorators";
import { IDialog } from "src/store/dialog/types";
// import { FileDto } from "src/mett/communication/types";
import VueCropper, { VueCropperMethods } from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { CustomFileDto } from "src/store/media-library/types";

@Component
export default class MettImageEditDialog extends Vue {
	@Prop() readonly dialog!: IDialog;

	@Comp(VueCropper) VueCropper!: Vue;

	@Getter("mediaLibrary/filePreview") filePreview!: CustomFileDto;

	@Action("mediaLibrary/setFileEdit") setFileEdit!: ({
		clipData,
		clipThumbnail
	}: {
		clipData: object;
		clipThumbnail: string;
	}) => void;

	@Ref("cropper") cropper!: VueCropperMethods;

	onReady() {
		if (this.filePreview.fileEdit) {
			this.cropper.setData({ ...this.filePreview.fileEdit.clipData, scaleX: 1, scaleY: 1 });
		}
	}

	onResolve() {
		this.setFileEdit({
			clipData: this.cropper.getData(),
			clipThumbnail: this.cropper.getCroppedCanvas().toDataURL("image/png", 0.7)
		});
	}

	mounted() {
		this.dialog.resolve = this.onResolve;
	}
}
</script>
