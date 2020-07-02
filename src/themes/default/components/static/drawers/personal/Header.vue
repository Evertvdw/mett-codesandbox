<template>
	<div
		v-show="(!mobileMenuDrawer && $q.screen.lt.md) || $q.screen.gt.sm"
		class="q-py-md mett-personal-drawer-header"
		:style="{ top: offsetTop }"
	>
		<mett-personal-drawer-avatar :size="(miniState && $q.screen.gt.sm) || !personalDrawer ? '32px' : '76px'" />

		<div
			v-show="personalDrawer"
			:class="(miniState && $q.screen.gt.sm) || !personalDrawer ? 'mett-opacity-0' : 'mett-opacity-1'"
		>
			<span class="q-py-sm text-bold block mett-user-full-name">{{ fullName }}</span>
			<q-btn :label="$t('buttons.signOut')" size="sm" rounded outline @click="signOut" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Action, Getter, Comp } from "src/mett/components/decorators";
import { UserProfileDto } from "src/mett/communication/types";
import { Prop, Watch } from "vue-property-decorator";

@Component
export default class PersonalDrawerHeader extends Vue {
	@Comp("Components.Static.Drawers.Personal.Avatar") mettPersonalDrawerAvatar!: Vue;

	@Prop() readonly miniState!: boolean;

	@Getter("layout/mobileMenuDrawer") mobileMenuDrawer!: boolean;
	@Getter("layout/personalDrawer") personalDrawer!: boolean;
	@Getter("user/applicationUser") applicationUser!: UserProfileDto;

	@Action("user/logout") logout!: () => Promise<any>;

	offsetTop = "auto";
	headerHeight = 0;

	@Watch("$q.screen.lt.md")
	onScroll() {
		const header: HTMLElement | null = this.$root.$el.querySelector("header");

		if (this.$q.screen.lt.md) {
			if (header && !header.classList.contains("q-header--hidden")) {
				this.headerHeight = header.clientHeight;
			} else {
				this.headerHeight = 0;
			}
			this.offsetTop = this.headerHeight + "px";
		} else {
			this.offsetTop = "auto";
		}
	}

	get fullName() {
		if (!this.applicationUser) return "Rinze Douma";

		return this.applicationUser.firstName + " " + this.applicationUser.lastName;
	}

	signOut() {
		this.logout().then(
			() => {},
			() => {}
		);
	}

	mounted() {
		this.onScroll();
		window.addEventListener("scroll", this.onScroll);
		window.addEventListener("resize", this.onScroll);
	}

	beforeDestroy() {
		window.removeEventListener("scroll", this.onScroll);
		window.removeEventListener("resize", this.onScroll);
	}
}
</script>
