<template>
	<!-- Todo: This component needs work -->
	<div class="mett-settings">
		<div v-for="(value, name, index) in options" :key="'option_' + index">
			<h2>name</h2>
			<p>{{ option }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { ItemDto } from "src/mett/communication/types";

@Component
export default class ActionDrawerSettings extends Vue {
	@Prop() item?: ItemDto;

	get options() {
		if (this.item && this.item.options) return JSON.parse(this.item.options);

		return {};
	}
}
</script>
