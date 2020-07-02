<template>
	<q-item v-ripple clickable>
		<q-item-section avatar>
			<q-icon name="groups" class="justify-start" />
		</q-item-section>

		<q-item-section>
			{{ $t("drawers.personal.listItems.groups") }}
		</q-item-section>
	</q-item>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PersonalDrawerGroupsItem extends Vue {}
</script>
