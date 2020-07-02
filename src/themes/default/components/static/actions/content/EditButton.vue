<template>
	<q-fab
		v-if="show"
		:value="value"
		:direction="$q.screen.lt.lg ? 'up' : 'down'"
		:color="$q.screen.lt.md ? 'white' : 'primary'"
		:class="$q.screen.lt.md ? 'mett-mobile-actions-edit-button' : 'mett-content-actions-edit-button'"
		:outline="$q.screen.lt.md"
		:unelevated="$q.screen.lt.md"
		persistent
		icon="edit"
		@input="onClick"
	>
		<mett-content-save-button />
	</q-fab>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Comp, Action, Getter } from "src/mett/components/decorators";
import { IOriginalValues } from "src/store/page/types";
import { UserProfileDto } from "src/mett/communication/types";

@Component
export default class ContentActionsEditButton extends Vue {
	@Getter("page/originalValues") originalValues!: IOriginalValues;
	@Getter("page/saving") saving!: boolean;
	@Getter("user/applicationUser") applicationUser?: UserProfileDto;

	@Comp("Components.Static.Actions.Content.SaveButton")
	mettContentSaveButton!: Vue;

	@Action("page/restoreChangedItems") restoreChangedItems!: () => void;

	get show() {
		// Todo: add security check
		return this.applicationUser ? true : false;
	}

	value = false;

	get saveButtonEnabled() {
		return Object.keys(this.originalValues).length !== 0;
	}

	clickHandler() {
		this.value = !this.value;
		if (this.$route.name == "ViewPage") {
			this.$router.push({
				path: this.$route.path + "/edit"
			});
		} else if (this.$route.name == "ViewItem") {
			this.$router.push({
				path: this.$route.path.replace("/item/", "/edit/")
			});
		} else if (this.$route.name == "EditPage") {
			this.$router.push({
				path: this.$route.path.replace(/\/edit(\/.*){0,1}/i, "")
			});
		} else if (this.$route.name == "EditItem") {
			this.$router.push({
				path: this.$route.path.replace("/edit/", "/item/")
			});
		}
	}

	async onClick(newVal: boolean) {
		// It is ugly but necessary ( ಠ ʖ̯ ಠ)
		// Small timeout because we don't want the Edit mode to close after saving
		// and a click on the saveButton also triggers this function BEFORE ¯\_(ツ)_/¯ the clickhandler on saveButton itself
		if (!newVal) await new Promise(r => setTimeout(r, 0));
		if (this.saving) return; // Return if a save is in progress
		if (this.saveButtonEnabled) {
			// If the save button is enabled, don't close automatically
			this.$q
				.dialog({
					title: this.$t("dialogs.confirmUnsaved.title"),
					message: this.$t("dialogs.confirmUnsaved.message"),
					ok: {
						label: this.$t("dialogs.confirmUnsaved.resolve"),
						color: "negative"
					},
					cancel: {
						label: this.$t("dialogs.confirmUnsaved.reject")
					}
				})
				.onOk(() => {
					this.clickHandler();
				})
				.onDismiss(() => {
					return;
				});
		} else {
			this.clickHandler();
		}
	}

	@Watch("$route")
	onRouteChange() {
		if (this.$route.name != "EditItem" && this.$route.name != "EditPage") {
			this.restoreChangedItems();
		}
	}

	initialize() {
		if (this.$route.name == "EditItem" || this.$route.name == "EditPage") {
			if (!this.value) this.value = true;
		}
	}

	mounted() {
		this.initialize();
	}
}
</script>
