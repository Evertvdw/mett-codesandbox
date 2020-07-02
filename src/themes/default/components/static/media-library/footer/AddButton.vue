<template>
	<q-btn
		id="selectFiles"
		:label="$t('ml.footer.add')"
		color="primary"
		icon="add"
		class="mett-ml-add-button"
		@click="onClick"
	></q-btn>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Action, Getter } from "src/mett/components/decorators";
import { IError } from "src/store/error/types";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import Tus from "@uppy/tus";
import { UserProfileDto } from "src/mett/communication/types";
import UppyImageCompressor from "src/mett/helpers/uppy-compressor-plugin";

require("@uppy/core/dist/style.css");
require("@uppy/dashboard/dist/style.css");

@Component
export default class MettMediaLibraryAddButton extends Vue {
	@Getter("settings/settings") settings: any;
	@Getter("user/applicationUser") applicationUser!: UserProfileDto;

	@Action("error/addError") addError!: (error: IError) => void;
	@Action("mediaLibrary/loadFiles") loadFiles!: (options: { useCache?: boolean }) => Promise<void>;

	uppy!: Uppy.Uppy;
	dashboard!: Dashboard;

	onClick() {
		this.dashboard.openModal();
	}

	onUploadLoadComplete() {
		// this.loadFiles({ useCache: false }).then(undefined, (reason: any) => {
		// 	const error: IError = {
		// 		title: this.$t("errors.unableToLoadFiles.title"),
		// 		info: reason,
		// 		timestamp: new Date()
		// 	};
		// 	this.addError(error);
		// });
	}

	mounted() {
		this.uppy = Uppy()
			.use(Dashboard, {
				trigger: "#selectFiles",
				waitForThumbnailsBeforeUpload: true,
				showProgressDetails: true,
				metaFields: [
					{ id: "name", name: "Bestandsnaam", placeholder: "Bestandsnaam" },
					{ id: "fileName", name: "Naam", placeholder: "Geef het bestand een eigen naam" },
					{ id: "description", name: "Beschrijving", placeholder: "Extra informatie over het bestand" },
					{ id: "author", name: "Auteur", placeholder: "Wie heeft dit bestand gemaakt?" }
				]
			})
			.use(Tus, { endpoint: this.settings.api.url + "/upload" })
			.use(UppyImageCompressor, {});

		this.uppy.setMeta({
			uploadedBy: this.applicationUser.firstName,
			uploadedByGuid: this.applicationUser.guid
		});

		this.uppy.on("complete", () => {
			this.onUploadLoadComplete();
		});

		this.dashboard = this.uppy.getPlugin("Dashboard") as Dashboard;
	}

	beforeDestroy() {
		if (this.uppy) {
			this.uppy.close();
		}
	}
}
</script>
