<template>
	<div>
		<mett-test-component />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";

@Component
export default class TestComponent2 extends Vue {
	@Comp("Components.DefaultComponent", { payload: "whatever" }) mettTestComponent!: Vue;
}
</script>
