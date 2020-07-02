<template>
	<mett-cms-page />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Comp } from "src/mett/components/decorators";

@Component
export default class CmsPage extends Vue {
	@Comp("Pages.CmsPage") mettCmsPage!: Vue;
}
</script>
