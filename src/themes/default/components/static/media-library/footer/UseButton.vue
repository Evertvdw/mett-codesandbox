<template>
	<q-btn
		:label="$t('ml.footer.use')"
		color="info"
		icon="check"
		:disable="!fileSelect.length"
		class="mett-ml-use-button"
	></q-btn>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "src/mett/components/decorators";

@Component
export default class MettMediaLibraryUseButton extends Vue {
	@Getter("mediaLibrary/fileSelect") fileSelect!: unknown[];
}
</script>
