<template>
	<q-fab-action color="info" icon="save" :disable="isDisabled" class="mett-save-button" @click="onClick" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter } from "src/mett/components/decorators";
import { IOriginalValues } from "src/store/page/types";

@Component
export default class ContentActionsSaveButton extends Vue {
	@Getter("page/originalValues") originalValues!: IOriginalValues;

	@Action("page/saveChangedItems") saveChangedItems!: () => Promise<any>;

	get isDisabled() {
		return Object.keys(this.originalValues).length == 0;
	}

	onClick() {
		this.saveChangedItems().then(
			() => {},
			() => {}
		);
	}
}
</script>
