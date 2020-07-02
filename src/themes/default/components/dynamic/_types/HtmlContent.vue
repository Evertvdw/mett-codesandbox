<template>
	<div ref="itemContent" :class="classes" class="mett-html-content" @mouseover="hovered = true">
		<mettCkEditor
			v-if="showEditor && editor === 'CKEditor'"
			:item="item"
			:editor-type="EditorTypes.classic"
			:item-height="itemHeight"
			@ready="onReady"
		/>
		<mettTinyMceEditor
			v-else-if="showEditor && editor === 'TinyMCE'"
			:item="item"
			:editor-type="EditorTypes.classic"
			:item-height="itemHeight"
			@ready="onReady"
		/>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<span v-else v-html="item.value" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import ItemContainer from "src/mixins/item-container";
import { Watch } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";
import { EditorTypes } from "src/store/settings/types";

@Component
export default class DynamicHtmlContent extends mixins(ItemContainer) {
	@Comp("Components.Static.Editor.TinyMceEditor") readonly mettTinyMceEditor!: Vue;
	@Comp("Components.Static.Editor.CKEditor") readonly mettCkEditor!: Vue;

	EditorTypes = EditorTypes;
	hovered = false;
	init = false;

	get showEditor() {
		return this.isEdit && this.hovered;
	}

	get classes() {
		return {
			"mett-editable": this.isEdit && !this.init,
			"mett-unsaved": this.isChanged
		};
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
