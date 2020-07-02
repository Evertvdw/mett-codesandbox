<template>
	<q-card class="mett-front-side mett-list-item-front-side">
		<div class="mett-list-item-top-section">
			<slot name="list-item-top-section" />

			<q-card-section class="mett-list-item-top-section-actions absolute-top">
				<q-toolbar>
					<q-btn round flat icon="report_problem" class="mett-list-item-publish-button" @click="flip" />
					<q-space />
					<q-btn
						round
						flat
						icon="more_vert"
						class="mett-list-item-settings-button float-right"
						@click="flip"
					/>
				</q-toolbar>
			</q-card-section>
		</div>

		<q-card-section class="mett-list-item-middle-section">
			<slot />
		</q-card-section>

		<q-card-section class="mett-list-item-bottom-section">
			<slot name="list-item-bottom-section" />

			<div class="mett-list-item-bottom-section-actions">
				<q-btn dense flat size="sm" icon="mode_comment" color="disabled" label="89" />
				<q-btn dense flat size="sm" icon="favorite" color="disabled" label="31" />
			</div>
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
import { Component, Emit } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import SlotContainer from "src/mixins/slot-container";

@Component
export default class CardFrontside extends mixins(SlotContainer) {
	slotNames: string[] = ["list-item-top-section", "list-item-bottom-section"];

	@Emit()
	flip(e: Event) {
		return e;
	}
}
</script>
