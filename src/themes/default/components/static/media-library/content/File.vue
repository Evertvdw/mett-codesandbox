<template>
	<q-intersection
		class="mett-ml-file"
		:class="{ selected: props.selected }"
		:style="
			`flex-basis: ${getFlexBasis(props.row.width, props.row.height, props.row.fileEdit)}px; 
						max-width: ${baseWidth * fileThumbnailSize * 1.5}px;
						height: ${baseHeight * fileThumbnailSize}px;`
		"
		@click="setFilePreview(props.row)"
	>
		<q-img
			:src="imageSource()"
			:placeholder-src="`demo-images/placeholder-${props.row.fileType.toLowerCase()}.png`"
			spinner-color="primary"
			:spinner-size="`${baseSpinnerSize * fileThumbnailSize}px`"
			:height="`${baseHeight * fileThumbnailSize}px`"
			class="rounded-borders bg-white mett-ml-file-image"
			@dblclick="props.selected = !props.selected"
		>
			<span class="mett-ml-file-caption">
				{{ props.row.name }}
			</span>
			<q-icon
				v-if="showIfVideo()"
				class="absolute-center bg-grey-3 shadow-10 rounded-borders mett-ml-file-image-icon"
				name="videocam"
				:size="`${(baseHeight * fileThumbnailSize) / 3}px`"
			>
			</q-icon>
			<span class="mett-ml-file-checkbox">
				<q-checkbox v-model="props.selected" dense color="primary" />
			</span>
		</q-img>
	</q-intersection>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "src/mett/components/decorators";
import { Prop } from "vue-property-decorator";
import { FileTypeDto } from "src/mett/communication/types";
import { CustomFileDto } from "src/store/media-library/types";

@Component
export default class MettMediaLibraryFile extends Vue {
	@Getter("mediaLibrary/fileThumbnailSize") fileThumbnailSize!: number;

	@Action("mediaLibrary/setFilePreview") setFilePreview!: (val: object) => void;

	@Prop() props!: any;

	baseWidth = this.$q.screen.width / 4;
	baseHeight = this.$q.screen.height / 5;
	basePadding = 12;
	baseSpinnerSize = 50;

	imageSource() {
		if (this.props.row.fileType === FileTypeDto.Image) {
			return this.props.row.fileEdit ? this.props.row.fileEdit.clipThumbnail : this.props.row.url;
		} else if (this.props.row.fileType === FileTypeDto.Video) {
			return this.props.row.thumbnail;
		}
	}

	showIfVideo() {
		return this.props.row.fileType === FileTypeDto.Video;
	}

	getFlexBasis(width: number, height: number, fileEdit: CustomFileDto["fileEdit"]) {
		let mutiplier = width / height;
		if (width === undefined || height === undefined) mutiplier = 1;
		if (fileEdit) {
			mutiplier = fileEdit.clipWidth / fileEdit.clipHeight;
		}
		return Math.min(this.baseWidth * this.fileThumbnailSize, this.baseHeight * this.fileThumbnailSize * mutiplier);
	}
}
</script>
