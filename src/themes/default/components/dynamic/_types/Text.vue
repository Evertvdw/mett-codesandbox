<template>
	<div :class="classes" class="mett-text" @mouseover="hovered = true">
		<mettCkEditor
			v-if="showEditor && editor === 'CKEditor'"
			:editor-mode="editorMode"
			:item="item"
			@ready="onReady"
		/>
		<mettTinyMceEditor
			v-else-if="showEditor && editor === 'TinyMCE'"
			:item="item"
			:editor-mode="editorMode"
			@ready="onReady"
		/>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<div v-else v-html="item.value" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import ItemContainer from "src/mixins/item-container";
import { Comp } from "src/mett/components/decorators";
import { EditorModes } from "src/store/settings/types";

@Component
export default class DynamicText extends mixins(ItemContainer) {
	@Comp("Components.Static.Editor.TinyMceEditor") readonly mettTinyMceEditor!: Vue;
	@Comp("Components.Static.Editor.CKEditor") readonly mettCkEditor!: Vue;

	@Prop() readonly isDescription!: boolean;

	EditorModes = EditorModes;
	hovered = false;
	init = false;

	get classes() {
		return {
			"mett-editable": this.isEdit && !this.init,
			"mett-unsaved": this.isChanged
		};
	}

	get showEditor() {
		return this.isEdit && this.hovered;
	}

	get editorMode() {
		let editorMode = EditorModes.text;

		if (this.isDescription) {
			editorMode = EditorModes.html;
		}

		return editorMode;
	}

	onReady() {
		this.init = true;
	}

	@Watch("isEdit")
	onIsEditChanged() {
		this.hovered = false;
		this.init = false;
	}
}
</script>
