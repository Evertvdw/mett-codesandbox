<template>
	<div id="q-app">
		<router-view />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "src/mett/components/decorators";
import { UserProfileDto } from "src/mett/communication/types";
import { Watch } from "vue-property-decorator";

import { Notify } from "quasar";

@Component
export default class App extends Vue {
	@Getter("settings/settings") settings: any;
	@Getter("user/applicationUser") applicationUser!: UserProfileDto;

	@Action("loadOptimizer/clearCache") clearCache!: () => void;
	@Action("error/raise200") raise200!: () => void;
	@Action("page/forceReload") forceReload!: () => void;

	@Watch("applicationUser")
	onLoginChanged() {
		this.clearCache();
		this.raise200();
		this.forceReload();
	}

	@Watch("$q.screen.lt.md")
	onScreenSizeChanged() {
		Notify.setDefaults({
			position: this.$q.screen.lt.md ? "top" : "bottom",
			message: "",
			timeout: this.settings.tasks.timeout.short,
			closeBtn: false
		});
	}

	mounted() {
		this.$log({
			short_message: "[_ID_] | App mounted",
			full_message: "App has mounted on the frontend",
			level: 7
		});
		this.onScreenSizeChanged();
	}
}
</script>
