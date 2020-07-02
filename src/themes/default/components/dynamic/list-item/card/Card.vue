<template>
	<mett-flippable ref="flipper" class="mett-list-item" :class="classes">
		<mett-card-frontside @flip="flip" @slot-names-set="onSlotNamesSet">
			<template v-for="slotName in slotNames" #[slotName]>
				<slot :name="slotName" />
			</template>
		</mett-card-frontside>

		<mett-card-backside :item="item" @flip="flip"></mett-card-backside>
	</mett-flippable>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import SlotContainer from "src/mixins/slot-container";
import { Comp, Ref } from "src/mett/components/decorators";
import { ItemDto } from "src/mett/communication/types";
import Flippable from "src/themes/default/components/static/flippable/Flippable.vue";

@Component
export default class ListItemCard extends mixins(SlotContainer) {
	@Comp("Components.Dynamic.ListItem.Buttons.DeleteButton") mettDeleteButton!: Vue;
	@Comp("Components.Dynamic.ListItem.Buttons.PublishButton") mettPublishButton!: Vue;
	@Comp("Components.Dynamic.ListItem.Card.Frontside") mettCardFrontside!: Vue;
	@Comp("Components.Dynamic.ListItem.Card.Backside") mettCardBackside!: Vue;
	@Comp("Components.Static.Flippable") mettFlippable!: Vue;

	@Prop() readonly item?: ItemDto;

	@Ref("flipper") flipper?: Flippable;

	active = false;

	get classes() {
		return {
			// Todo: make this dynamic
			"col-md-4": true,
			"col-sm-6": true,
			"col-xs-12": true
		};
	}

	onSlotNamesSet(slotNames: string[]) {
		this.slotNames = slotNames;
	}

	flip(e: Event) {
		if (this.flipper) this.flipper.flip();

		e.stopPropagation();
	}
}
</script>
