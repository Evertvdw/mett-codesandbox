<template>
	<!-- Todo: dynamic logo //-->
	<img src="mett-logo-zwart.png" class="mett-site-logo" alt="" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class HeaderSiteLogo extends Vue {
	get show() {
		// Todo: hide if there is no logo
		return true;
	}
}
</script>
