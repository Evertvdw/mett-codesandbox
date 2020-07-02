<template>
	<ckeditor
		v-model="localValue"
		v-bind="$attrs"
		:editor="editor"
		:config="localConfig"
		class="mett-ck-editor mett-editable"
		@ready="ready"
		@focus="focus"
		@blur="blur"
		@input="input"
		@destroy="destroy"
	>
		<slot />
	</ckeditor>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch, Emit } from "vue-property-decorator";
import { EditorTypes, EditorModes } from "src/store/settings/types";
import { ItemDto } from "src/mett/communication/types";
import { Action, Getter } from "src/mett/components/decorators";

@Component
export default class MettEditorCk extends Vue {
	@Prop() readonly item?: ItemDto;
	@Prop() readonly value?: string;

	@Prop({ default: EditorTypes.inline }) readonly editorType!: EditorTypes;
	@Prop({ default: EditorModes.html }) readonly editorMode!: EditorModes;
	@Prop({ default: () => {} }) readonly config!: any;

	@Getter("page/originalValueByGuid") originalValueByGuid!: (guid: string) => any;

	@Action("page/updateValue") updateValue!: ({ value, targetItem }: { value: any; targetItem: ItemDto }) => void;

	defaultConfig = {
		toolbar: this.localToolbar,
		heading: {
			options: [
				{
					model: "paragraph",
					title: "Paragraph",
					class: "ck-paragraph"
				},
				{
					model: "heading1",
					view: "h1",
					title: "Heading 1",
					class: "ck-heading1"
				},
				{
					model: "heading2",
					view: "h2",
					title: "Heading 2",
					class: "ck-heading2"
				},
				{
					model: "heading3",
					view: "h3",
					title: "Heading 3",
					class: "ck-heading3"
				},
				{
					model: "heading4",
					view: "h4",
					title: "Heading 4",
					class: "ck-heading4"
				},
				{
					model: "heading5",
					view: "h5",
					title: "Heading 5",
					class: "ck-heading5"
				},
				{
					model: "heading6",
					view: "h6",
					title: "Heading 6",
					class: "ck-heading6"
				}
			]
		}
	};

	localValue = "";

	created() {
		if (this.item) this.localValue = this.item.value ? this.item.value.toString() : "";
		else if (this.value) this.localValue = this.value;
	}

	get localToolbar() {
		switch (this.editorMode) {
			case EditorModes.text:
			case EditorModes.singleLineText:
				return ["undo", "redo"];
			case EditorModes.html:
			default:
				return [
					"heading",
					"|",
					"bold",
					"italic",
					"link",
					"|",
					"bulletedList",
					"numberedList",
					"|",
					"undo",
					"redo"
				];
		}
	}

	get localConfig() {
		const localConfig = Object.assign(this.defaultConfig, this.config);

		return localConfig;
	}

	get editor() {
		if (this.$isServer) return null;

		switch (this.editorType) {
			case EditorTypes.classic:
				return require("@ckeditor/ckeditor5-build-inline");
			case EditorTypes.inline:
			default:
				return require("@ckeditor/ckeditor5-build-inline");
		}
	}

	get localTextValue() {
		const tempDiv = document.createElement("DIV");

		tempDiv.innerHTML = this.localValue
			.replace(/\r{0,1}\n/gi, "") // remove newlines in HTML
			.replace(/<br\s*\/{0,1}>/gi, "\r\n") // convert <br> and <br /> to newlines
			.replace(/<\/p>(?!$)/gi, "\r\n\r\n") // convert </p> to double newlines (except end of string)
			.replace(/<\/p>$/gi, "") // remove </p> at end of string
			.replace(/<p>/gi, ""); // remove all <p> tags

		return tempDiv.innerText;
	}

	get formattedValue() {
		let value = this.localValue;

		if (this.editorMode == EditorModes.text || this.editorMode == EditorModes.singleLineText) {
			value = this.localTextValue;

			if (this.editorMode == EditorModes.text) {
				value = value
					.trim()
					.replace(/\r{0,1}\n/, "<br>")
					.replace(/(\r|\n)/, "");
			} else if (this.editorMode == EditorModes.singleLineText) {
				value = value
					.trim()
					.replace(/\r{0,1}\n/, " ")
					.replace(/(\r|\n)/, "");
			}
		}

		return value;
	}

	@Watch("localValue")
	@Emit()
	input() {
		if (this.item)
			this.updateValue({
				value: this.formattedValue,
				targetItem: this.item
			});

		return this.localValue;
	}

	@Emit()
	ready(...args: any[]) {
		return args;
	}

	@Emit()
	focus(...args: any[]) {
		return args;
	}

	@Emit()
	blur(...args: any[]) {
		return args;
	}

	@Emit()
	destroy(...args: any[]) {
		return args;
	}
}
</script>
