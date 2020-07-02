<template>
	<q-item v-ripple clickable>
		<q-item-section avatar>
			<q-icon name="notifications" />
		</q-item-section>

		<q-item-section>
			{{ $t("drawers.personal.listItems.notifications") }}
		</q-item-section>
	</q-item>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PersonalDrawerNotificationsItem extends Vue {}
</script>
