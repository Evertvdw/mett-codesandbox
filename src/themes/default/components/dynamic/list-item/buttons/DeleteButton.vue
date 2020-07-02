<template>
	<q-btn
		icon="delete"
		outline
		:label="$t('buttons.delete')"
		class="mett-list-item-delete-button full-width"
		@click="onClick"
	></q-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Action, Getter } from "src/mett/components/decorators";
import { ItemDto, MenuItemDto } from "src/mett/communication/types";
import { IDialog } from "src/store/dialog/types";

@Component
export default class ListItemDeleteButton extends Vue {
	@Prop() readonly item?: ItemDto;

	@Getter("page/pageMenuItemByUrlSegment") containerMenuItem!: (urlSegment: string) => MenuItemDto | undefined;

	@Action("page/deleteItem") deleteItem!: ({
		guid,
		containerGuid
	}: {
		guid: string;
		containerGuid?: string;
	}) => Promise<any>;
	@Action("dialog/openDialog") openDialog!: ({ dialog }: { dialog: IDialog }) => Promise<any>;

	onClick(e: Event) {
		e.stopPropagation();

		if (!this.item || !this.item.guid) {
			return;
		}

		const dialog: IDialog = {
			title: this.$t("dialogs.deleteItem.title"),
			message: this.$t("dialogs.deleteItem.message"),
			resolveText: this.$t("dialogs.deleteItem.resolve"),
			rejectText: this.$t("dialogs.deleteItem.reject")
		};

		this.openDialog({ dialog }).then(
			() => {
				this.deleteItem({
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					guid: this.item!.guid,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					containerGuid: this.item!.guid
				});
			},
			() => {}
		);
	}
}
</script>
