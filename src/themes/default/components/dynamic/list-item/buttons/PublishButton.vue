<template>
	<q-btn
		icon="cloud_upload"
		outline
		:label="$t('buttons.publish')"
		class="mett-list-item-publish-button full-width"
		@click="onClick"
	></q-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Action } from "src/mett/components/decorators";
import { ItemDto } from "src/mett/communication/types";

@Component
export default class ListItemPublishButton extends Vue {
	@Prop() readonly item?: ItemDto;

	@Action("search/indexItem") indexItem!: ({ item }: { item: ItemDto }) => Promise<any>;

	onClick(e: Event) {
		e.stopPropagation();

		if (this.item)
			this.indexItem({ item: this.item }).then(
				() => {},
				() => {}
			);
	}
}
</script>
