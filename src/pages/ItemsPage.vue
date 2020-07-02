<template>
	<mett-items-page />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Comp } from "src/mett/components/decorators";

@Component
export default class ItemsPage extends Vue {
	@Comp("Pages.ItemsPage") mettItemsPage!: Vue;
}
</script>
