<template>
	<mett-search-page />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";

@Component
export default class SearchPage extends Vue {
	@Comp("Pages.SearchPage") mettSearchPage!: Vue;
}
</script>
