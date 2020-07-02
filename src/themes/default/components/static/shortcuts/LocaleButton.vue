<template>
	<div class="mett-shortcut mett-shortcut-locale">
		<q-btn ref="localeButton" icon="language" round flat dense>
			<q-menu ref="editMenu" :target="$refs.localeButton" fit>
				<q-list dense>
					<q-item
						v-for="lang in langOptions"
						:key="lang.value"
						v-close-popup
						clickable
						@click="setLocale(lang.value)"
					>
						<q-item-section>
							<q-item-label>{{ lang.label }}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-menu>
		</q-btn>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ShortcutsLocaleButton extends Vue {
	// Todo: make this dynamic
	langOptions = [
		{ value: "en-us", label: "English" },
		{ value: "nl-nl", label: "Nederlands" }
	];

	setLocale(lang: string) {
		this.$i18n.locale = lang;
	}
}
</script>
