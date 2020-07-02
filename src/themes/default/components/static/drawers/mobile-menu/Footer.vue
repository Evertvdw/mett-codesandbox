<template>
	<div class="mett-mobile-menu-drawer-footer">
		<div class="row text-center q-pa-sm">
			<div class="col-12">
				<q-btn size="sm" round flat icon="fab fa-twitter" />
				<q-btn size="sm" round flat icon="fab fa-facebook" />
				<q-btn size="sm" round flat icon="fab fa-linkedin" />
				<q-btn size="sm" round flat icon="fas fa-envelope" />
			</div>
		</div>

		<div class="row text-center q-pa-sm">
			<div class="col-12">
				<a href="#">Privacyverklaring</a>
				<a href="#">Cookieverklaring</a>
			</div>
		</div>

		<div class="row text-center q-pa-sm">
			<div class="col-12">
				<a href="#">Terms of use</a>
				<a href="#">Contact</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class MobileMenuDrawerFooter extends Vue {}
</script>
