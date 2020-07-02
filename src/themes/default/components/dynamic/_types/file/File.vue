<template>
	<div class="mett-file">
		<element :is="elementType" v-if="show" v-bind="attributes" :class="classes">{{ content }}</element>

		<mett-file-edit-button :item="item" :file-element-type="fileElementType" />
	</div>
</template>

<script lang="ts">
import { mixins } from "vue-class-component";
import { Vue, Component, Prop } from "vue-property-decorator";
import ItemContainer from "src/mixins/item-container";
import { Getter, Comp } from "src/mett/components/decorators";
import { FileContainerDto, FileTypeDto } from "src/mett/communication/types";
import { FileElementTypes } from "src/store/settings/types";

@Component
export default class DynamicFile extends mixins(ItemContainer) {
	@Comp("Components.Dynamic.Types.File.EditButton") mettFileEditButton!: Vue;

	@Getter("settings/settings") settings!: any;
	@Getter("host/FileContainer") FileContainer!: FileContainerDto;

	@Prop() readonly fileElementType!: FileElementTypes;

	get elementType() {
		let elementType = this.fileElementType;

		if (!elementType) {
			// Todo: default file type
			elementType = FileElementTypes.link;
		}

		return elementType;
	}

	get attributes() {
		let attributes = {};

		if (this.item.file) {
			if (this.item.file.fileType == FileTypeDto.Image) {
				if (this.elementType == FileElementTypes.image) {
					// Todo: make this dynamic
					attributes = {
						src: this.fileLocation,
						width: 250,
						height: 250,
						alt: ""
					};
				} else if (this.elementType == FileElementTypes.div) {
					// Todo: make this dynamic
					attributes = {
						style: {
							"background-image": "url(" + this.fileLocation + ")"
						}
					};
				}
			}
		}

		if (Object.keys(attributes).length == 0) {
			// Todo: default attributes
			attributes = {
				href: this.fileLocation,
				target: "_blank",
				title: "Download link"
			};
		}

		return attributes;
	}

	get classes() {
		return {
			"mett-item-image": FileTypeDto.Image
		};
	}

	get content() {
		if (this.elementType == FileElementTypes.link) {
			// Todo: make this dynamic
			return "Download link";
		}

		return "";
	}

	get fileLocation() {
		if (!this.item.file || !this.FileContainer || !this.item.file.externalName || !this.item.file.extension) {
			return "";
		} else {
			return (
				this.settings.url + this.FileContainer.location + this.item.file.externalName + this.item.file.extension
			);
		}
	}

	get show() {
		return this.fileLocation;
	}
}
</script>
