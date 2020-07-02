<template>
	<!-- Todo: make this dynamic //-->
	<q-avatar :size="size" class="shadow-4 mett-avatar mett-border-2">
		<img src="/demo-images/avatar-tom.jpg" />
	</q-avatar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class PersonalDrawerAvatar extends Vue {
	@Prop() readonly size!: string;
}
</script>
