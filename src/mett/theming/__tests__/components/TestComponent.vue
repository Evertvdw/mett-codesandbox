<template>
	<div>
		<mett-test-component />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";

@Component
export default class TestComponent extends Vue {
	@Comp("Components.DefaultComponent") mettTestComponent!: Vue;
}
</script>
