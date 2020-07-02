<template>
	<div class="absolute-full bg-grey-3 no-border-radius">
		<q-img :src="filePreview.url" contain width="100%" height="100%">
			<q-btn
				class="q-ma-md shadow-10"
				label="Sluiten"
				color="primary"
				icon="close"
				@click="rejectDialog({ dialog })"
			></q-btn>
		</q-img>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "src/mett/components/decorators";
import { CustomFileDto } from "src/store/media-library/types";
import { Prop } from "vue-property-decorator";
import { IDialog } from "src/store/dialog/types";

@Component
export default class MettImageFullDialog extends Vue {
	@Prop() readonly dialog!: IDialog;

	@Getter("mediaLibrary/filePreview") filePreview!: CustomFileDto | null;
	@Action("dialog/rejectDialog") readonly rejectDialog!: ({
		dialog,
		reason
	}: {
		dialog: IDialog;
		reason?: any;
	}) => void;
}
</script>
