<template>
	<q-card class="mett-back-side mett-list-item-back-side">
		<div class="mett-list-item-top-section">
			<q-card-section class="mett-list-item-top-section-actions absolute-top">
				<q-toolbar>
					<q-space />
					<q-btn round flat icon="reply" class="mett-list-item-back-button float-right" @click="flip" />
				</q-toolbar>
			</q-card-section>
		</div>

		<div class="mett-list-item-middle-section">
			<q-card-actions class="mett-list-item-middle-section-actions absolute-center">
				<mett-publish-button :item="item" />
				<mett-delete-button :item="item" />
			</q-card-actions>
		</div>
	</q-card>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";
import { ItemDto } from "src/mett/communication/types";

@Component
export default class CardBackside extends Vue {
	@Prop() readonly item?: ItemDto;

	@Comp("Components.Dynamic.ListItem.Buttons.DeleteButton") mettDeleteButton!: Vue;
	@Comp("Components.Dynamic.ListItem.Buttons.PublishButton") mettPublishButton!: Vue;

	@Emit()
	flip(e: Event) {
		return e;
	}
}
</script>
