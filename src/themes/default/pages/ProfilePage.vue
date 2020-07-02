<template>
	<section class="mett-user-profile-page q-py-lg">
		<div class="mett-centered mett-max-width row justify-center">
			<div class="col-12">
				<h1>{{ $t("users.name") }}: {{ fullName }}</h1>

				{{ $t("users.occupation") }}: {{ user.occupation }}
				<br />

				{{ $t("users.birthDay") }}: {{ user.birthDay }}
				<br />

				{{ $t("users.occupation") }}: {{ user.occupation }}
				<br />

				{{ $t("users.sex") }}:
				{{ user.sex ? $t(`users.${user.sex.toLowerCase()}`) : "" }}
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter } from "src/mett/components/decorators";
import { UserProfileDto } from "src/mett/communication/types";

@Component
export default class ProfilePage extends Vue {
	@Getter("user/applicationUser") applicationUser!: UserProfileDto | null;

	get fullName() {
		if (!this.applicationUser) return "";

		return this.applicationUser.firstName + " " + this.applicationUser.lastName;
	}

	get user() {
		return this.applicationUser || {};
	}

	created() {
		if (!this.applicationUser) this.$router.push("/");
	}
}
</script>
