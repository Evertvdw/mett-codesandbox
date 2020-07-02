<template>
	<q-item v-ripple clickable>
		<q-item-section avatar>
			<q-icon name="dashboard" />
		</q-item-section>

		<q-item-section>
			{{ $t("drawers.personal.listItems.cms") }}
		</q-item-section>
	</q-item>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PersonalDrawerCmsItem extends Vue {}
</script>
