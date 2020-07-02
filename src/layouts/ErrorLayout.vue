<template>
	<mett-error-500-page />
</template>

<script lang="ts">
import { mixins } from "vue-class-component";
import { Vue, Component } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";
import DisplayTypeProvider from "src/mixins/display-type-provider";

@Component
export default class Layout extends mixins(DisplayTypeProvider) {
	@Comp("Pages.Error500Page") mettError500Page!: Vue;
}
</script>
