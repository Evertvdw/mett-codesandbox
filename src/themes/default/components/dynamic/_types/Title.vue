<template>
	<element :is="elementType" :class="classes" class="mett-title" @mouseover="hovered = true">
		<mettCkEditor
			v-if="showEditor && editor === 'CKEditor'"
			:editor-mode="EditorModes.text"
			:item="item"
			@ready="onReady"
		/>
		<mettTinyMceEditor
			v-else-if="showEditor && editor === 'TinyMCE'"
			:item="item"
			:editor-mode="EditorModes.text"
			@ready="onReady"
		/>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<span v-else v-html="item.value" />
	</element>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import ItemContainer from "src/mixins/item-container";
import { TemplateElementDisplayTypeDto } from "src/mett/communication/types";
import { Comp } from "src/mett/components/decorators";
import { EditorModes } from "src/store/settings/types";
import { Watch } from "vue-property-decorator";

@Component
export default class DynamicTitle extends mixins(ItemContainer) {
	@Comp("Components.Static.Editor.TinyMceEditor") readonly mettTinyMceEditor!: Vue;
	@Comp("Components.Static.Editor.CKEditor") readonly mettCkEditor!: Vue;

	EditorModes = EditorModes;
	hovered = false;
	init = false;

	get elementType() {
		// Todo: make this dynamic
		if (this.currentDisplayType == TemplateElementDisplayTypeDto.List) {
			return "h2";
		} else {
			return "h1";
		}
	}

	get classes() {
		return {
			"mett-editable": this.isEdit && !this.init,
			"mett-unsaved": this.isChanged
		};
	}

	get showEditor() {
		return this.isEdit && this.hovered;
	}

	onReady() {
		this.init = true;
	}

	@Watch("isEdit")
	onIsEditChanged() {
		this.init = false;
		this.hovered = false;
	}
}
</script>
