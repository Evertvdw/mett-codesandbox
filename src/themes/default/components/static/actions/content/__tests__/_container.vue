<template>
	<q-fab>
		<component :is="comp"></component>
	</q-fab>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class Container extends Vue {
	@Prop() readonly comp!: Vue;
}
</script>
