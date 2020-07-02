<template>
	<mett-profile-page />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Comp } from "src/mett/components/decorators";

@Component
export default class ProfilePage extends Vue {
	@Comp("Pages.ProfilePage") mettProfilePage!: Vue;
}
</script>
