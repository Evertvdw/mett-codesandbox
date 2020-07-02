<template>
	<!-- Todo: make this dynamic //-->
	<q-avatar :size="size" class="mett-avatar mett-border-1">
		<img src="/demo-images/avatar-tom.jpg" />
	</q-avatar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class MobileDrawerAvatar extends Vue {
	@Prop() readonly size!: string;
}
</script>
