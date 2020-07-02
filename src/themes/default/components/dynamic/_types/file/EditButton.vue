<template>
	<q-btn v-if="show" color="primary" :icon="icon" class="mett-file-edit-button" @click="onClick"></q-btn>
</template>

<script lang="ts">
import { mixins } from "vue-class-component";
import { Vue, Component, Prop } from "vue-property-decorator";
import { ItemDto } from "src/mett/communication/types";
import { Action, Comp } from "src/mett/components/decorators";
import { FileElementTypes } from "src/store/settings/types";
import ItemContainer from "src/mixins/item-container";
import { IDialog } from "src/store/dialog/types";

@Component
export default class DynamicFileEditButton extends mixins(ItemContainer) {
	@Comp("Components.Static.MediaLibrary.MediaLibrary")
	readonly mediaLibraryDialog!: Vue;

	@Action("dialog/openDialog") openDialog!: ({ dialog }: { dialog: IDialog }) => Promise<any>;
	@Action("mediaLibrary/activate") activateMediaLibrary!: (options: { item?: ItemDto }) => void;

	@Prop() readonly fileElementType!: FileElementTypes;

	get icon() {
		// Todo: default icon
		let icon = "edit";

		// Todo: make this dynamic
		if (this.fileElementType == FileElementTypes.div) {
			icon = "image";
		}

		return icon;
	}

	get show() {
		// Todo: add security check
		return false;
	}

	onClick() {
		const dialog: IDialog = {
			component: this.mediaLibraryDialog,
			fullScreen: true
		};

		this.openDialog({ dialog }).then(
			() => {},
			() => {}
		);
	}
}
</script>
