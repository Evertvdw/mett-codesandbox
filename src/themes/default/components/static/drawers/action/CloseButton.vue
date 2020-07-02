<template>
	<q-btn flat icon="close" round @click="setActionDrawer(false)" />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Action } from "src/mett/components/decorators";

@Component
export default class ActionDrawerCloseButton extends Vue {
	@Action("layout/setActionDrawer") setActionDrawer!: (val: boolean) => void;
}
</script>
