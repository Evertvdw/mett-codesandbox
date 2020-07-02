<template>
	<q-btn round unelevated outline icon="add" class="mett-item-list-add-button" @click="onClick"> </q-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Action } from "src/mett/components/decorators";
import { ItemDto } from "src/mett/communication/types";

@Component
export default class ItemListAddButton extends Vue {
	@Action("page/addItem") addItem!: ({ containerGuid }: { containerGuid?: string }) => Promise<any>;

	@Prop() readonly item?: ItemDto;
	@Prop() readonly hover?: boolean;

	onClick() {
		if (this.item) {
			this.addItem({ containerGuid: this.item.guid }).then(
				() => {},
				() => {}
			);
		}
	}
}
</script>
