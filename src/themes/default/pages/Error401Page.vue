<template>
	<section class="mett-error-401-page q-py-lg">
		<div class="mett-centered mett-max-width row justify-center">
			<div class="col-12">
				<h1>
					<span class="text-bold">{{ $t("errors.unauthorized.code") }}</span> -
					{{ $t("errors.unauthorized.title") }}
				</h1>

				<p>{{ $t("errors.unauthorized.description") }}</p>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Comp, Getter, Action } from "src/mett/components/decorators";
import { UserProfileDto } from "src/mett/communication/types";
import { IDialog } from "src/store/dialog/types";

@Component
export default class Error401Page extends Vue {
	@Comp("Components.Static.DialogList.Dialogs.LoginDialog")
	readonly mettLoginDialog!: Vue;

	@Getter("user/applicationUser") applicationUser!: UserProfileDto;

	@Action("dialog/openDialog") readonly openDialog!: ({ dialog }: { dialog: IDialog }) => Promise<any>;

	openLoginDialog() {
		const dialog: IDialog = {
			component: this.mettLoginDialog,
			title: this.$t("dialogs.login.title")
		};

		this.openDialog({ dialog }).then(
			() => {},
			() => {}
		);
	}

	mounted() {
		if (!this.applicationUser) {
			this.openLoginDialog();
		}
	}
}
</script>
