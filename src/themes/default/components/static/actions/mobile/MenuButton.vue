<template>
	<q-btn
		icon="menu"
		color="white"
		unelevated
		outline
		round
		class="mett-mobile-actions-menu-button"
		@click="onClick(!menu)"
	/>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter, Action } from "src/mett/components/decorators";

@Component
export default class MobileMenuDrawerMenuButton extends Vue {
	@Getter("layout/mobileMenuDrawer") menu!: boolean;

	@Action("layout/setMobileMenuDrawer") setMenu!: (value: boolean) => Promise<void>;

	onClick(value: boolean) {
		this.setMenu(value).then(
			() => {},
			() => {}
		);
	}
}
</script>
