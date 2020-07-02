<template>
	<q-item v-ripple clickable>
		<q-item-section avatar>
			<q-icon name="chat" />
		</q-item-section>

		<q-item-section>
			{{ $t("drawers.personal.listItems.chat") }}
		</q-item-section>
	</q-item>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PersonalDrawerChatItem extends Vue {}
</script>
