<template>
	<q-btn
		:label="$t('ml.footer.delete')"
		color="negative"
		icon="delete"
		:disable="!fileSelect.length"
		class="mett-ml-delete-button"
	></q-btn>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "src/mett/components/decorators";

@Component
export default class MettMediaLibraryDeleteButton extends Vue {
	@Getter("mediaLibrary/fileSelect") fileSelect!: object[];
}
</script>
