<template>
	<p>
		{{ $t("errors.unableToLoadComponent.description") }}
	</p>
</template>

<script lang="ts">
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";
import ItemContainer from "src/mixins/item-container";

@Component
export default class Default extends mixins(ItemContainer) {}
</script>
