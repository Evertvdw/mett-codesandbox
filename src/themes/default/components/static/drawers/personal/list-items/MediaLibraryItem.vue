<template>
	<q-item v-ripple clickable @click="onClick">
		<q-item-section avatar>
			<q-icon name="photo_library" />
		</q-item-section>

		<q-item-section no-wrap>
			{{ $t("drawers.personal.listItems.mediaLibrary") }}
		</q-item-section>
	</q-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Action, Comp } from "src/mett/components/decorators";
import { IDialog } from "src/store/dialog/types";
import { ItemDto } from "src/mett/communication/types";

@Component
export default class PersonalDrawerMediaLibraryItem extends Vue {
	@Comp("Components.Static.MediaLibrary.MediaLibrary")
	readonly mediaLibraryDialog!: Vue;

	@Action("dialog/openDialog") openDialog!: ({ dialog }: { dialog: IDialog }) => Promise<any>;
	@Action("mediaLibrary/activate") activateMediaLibrary!: (options: { item?: ItemDto }) => void;
	@Action("mediaLibrary/setFileInfoShow") setFileInfoShow!: (val: boolean) => void;

	onClick() {
		const dialog: IDialog = {
			component: this.mediaLibraryDialog,
			custom: true,
			fullScreen: true
		};

		this.openDialog({ dialog }).then(
			() => {
				this.setFileInfoShow(false);
			},
			() => {
				this.setFileInfoShow(false);
			}
		);
	}
}
</script>
