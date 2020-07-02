<template>
	<editor-tinymce
		ref="editor"
		v-model="localValue"
		api-key="no-api-key"
		:init="defaultConfig"
		initial-value="Type here"
		:toolbar="editorToolbar"
		:plugins="editorPlugins"
		:inline="editorInline"
		class="mett-editable"
	></editor-tinymce>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { EditorTypes, EditorModes } from "src/store/settings/types";
import { ItemDto } from "src/mett/communication/types";
import { Action, Getter } from "src/mett/components/decorators";

@Component
export default class Editor extends Vue {
	// You can use the item or value Prop or use v-model
	@Prop() readonly item?: ItemDto;
	@Prop() readonly itemHeight!: number;
	@Prop() readonly value?: string;

	@Prop({ default: EditorTypes.inline }) readonly editorType!: EditorTypes;
	@Prop({ default: EditorModes.html }) readonly editorMode!: EditorModes;
	@Prop({ default: () => {} }) readonly config!: any;

	@Getter("page/originalValueByGuid") originalValueByGuid!: (guid: string) => any;

	@Action("page/updateValue") updateValue!: ({ value, targetItem }: { value: any; targetItem: ItemDto }) => void;

	EditorTypes = EditorTypes;

	defaultConfig = {
		height: this.itemHeight + 100,
		menubar: true,
		base_url: "/editor",
		forced_root_block: "",
		force_br_newlines: false,
		force_p_newlines: false,
		branding: false
		// powerpaste_word_import: "clean",
		// powerpaste_html_import: "clean"
	};

	localValue = "";
	editorToolbar = "";
	editorPlugins = "";
	editorInline = true;

	created() {
		if (this.item) this.localValue = this.item.value ? this.item.value.toString() : "";
		else if (this.value) this.localValue = this.value;
		this.$emit("ready");

		switch (this.editorType) {
			case EditorTypes.inline:
				this.editorInline = true;
				this.defaultConfig.menubar = false;
				break;

			case EditorTypes.classic:
				this.editorInline = false;
				this.defaultConfig.menubar = true;
				break;

			default:
				break;
		}

		switch (this.editorMode) {
			case EditorModes.text:
				this.editorToolbar = "undo redo";
				break;

			case EditorModes.html:
				this.editorToolbar =
					"undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons help";
				this.editorPlugins =
					"print preview importcss autosave save directionality visualblocks visualchars media template codesample hr pagebreak nonbreaking anchor toc insertdatetime advlist imagetools textpattern noneditable help charmap quickbars emoticons advlist autolink lists link image charmap print preview anchor searchreplace visualblocks fullscreen media insertdatetime table paste code help wordcount";
				break;

			default:
				break;
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
	input() {
		if (this.item) {
			this.updateValue({
				value: this.formattedValue,
				targetItem: this.item
			});
		}

		return this.localValue;
	}
}
</script>
