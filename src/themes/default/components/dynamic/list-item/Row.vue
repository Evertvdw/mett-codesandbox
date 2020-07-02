<template>
	<div class="mett-list-item col-12">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import SlotContainer from "src/mixins/slot-container";

@Component
export default class ListItemRow extends mixins(SlotContainer) {}
</script>
