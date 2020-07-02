<template>
	<q-item v-ripple clickable>
		<q-item-section avatar>
			<q-icon name="check" />
		</q-item-section>

		<q-item-section>
			{{ $t("drawers.personal.listItems.tasks") }}
		</q-item-section>
	</q-item>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PersonalDrawerTasksItem extends Vue {}
</script>
