<template>
	<q-layout :view="layoutView" @scroll="scrollHandler">
		<q-header class="mett-header" reveal :height-hint="113">
			<mett-header v-if="errorStatus != 500" />
		</q-header>

		<q-drawer
			v-if="errorStatus != 500"
			v-model="mobileMenuDrawerModel"
			side="left"
			overlay
			class="lt-md mett-mobile-menu-drawer"
			:class="{ 'mett-active': mobileMenuDrawer }"
		>
			<mett-mobile-menu-drawer />
		</q-drawer>

		<q-drawer
			v-if="errorStatus != 500"
			v-model="actionDrawerModel"
			behavior="desktop"
			side="right"
			class="mett-action-drawer"
			overlay
			bordered
			:class="{ 'mett-active': actionDrawer }"
		>
			<mett-action-drawer />
		</q-drawer>

		<q-drawer
			v-if="errorStatus != 500 && applicationUser"
			v-model="personalDrawerModel"
			:mini="miniState"
			:width="250"
			:mini-width="56"
			:breakpoint="$q.screen.sizes.md"
			show-if-above
			mini-to-overlay
			class="mett-personal-drawer"
			:class="{ 'mett-active': personalDrawer }"
			@mouseover="miniState = false"
			@mouseout="miniState = true"
		>
			<mett-personal-drawer :mini-state="miniState" />
		</q-drawer>

		<q-page-container class="mett-page">
			<mett-carousel v-if="errorStatus != 500" />

			<mett-breadcrumbs v-if="errorStatus != 500" />

			<transition
				v-if="errorStatus == 200"
				appear
				enter-active-class="animated fadeIn"
				leave-active-class="animated fadeOut"
				:duration="300"
			>
				<router-view :key="routerViewKey" />
			</transition>

			<transition
				v-else-if="errorStatus == 404"
				appear
				enter-active-class="animated fadeIn"
				leave-active-class="animated fadeOut"
				:duration="300"
			>
				<mett-error-404-page />
			</transition>

			<transition
				v-else-if="errorStatus == 401"
				appear
				enter-active-class="animated fadeIn"
				leave-active-class="animated fadeOut"
				:duration="300"
			>
				<mett-error-401-page />
			</transition>

			<transition
				v-else
				appear
				enter-active-class="animated fadeIn"
				leave-active-class="animated fadeOut"
				:duration="300"
			>
				<mett-error-500-page />
			</transition>
		</q-page-container>

		<q-footer v-if="errorStatus != 500" class="mett-footer">
			<mett-footer />
		</q-footer>

		<mett-mobile-actions v-if="errorStatus != 500" />

		<mett-dialog-list v-if="errorStatus != 500" />
	</q-layout>
</template>

<script lang="ts">
import { mixins } from "vue-class-component";
import { Vue, Component, Watch } from "vue-property-decorator";
import { Comp, Getter, Action } from "src/mett/components/decorators";
import { TemplateElementDisplayTypeDto, UserProfileDto } from "src/mett/communication/types";
import DisplayTypeProvider from "src/mixins/display-type-provider";

@Component
export default class Layout extends mixins(DisplayTypeProvider) {
	@Comp("Pages.Error401Page") mettError401Page!: Vue;
	@Comp("Pages.Error404Page") mettError404Page!: Vue;
	@Comp("Pages.Error500Page") mettError500Page!: Vue;

	@Comp("Components.Static.Actions.Mobile") mettMobileActions!: Vue;
	@Comp("Components.Static.Breadcrumbs") mettBreadcrumbs!: Vue;
	@Comp("Components.Static.Carousel") mettCarousel!: Vue;
	@Comp("Components.Static.DialogList") mettDialogList!: Vue;
	@Comp("Components.Static.Drawers.Action") mettActionDrawer!: Vue;
	@Comp("Components.Static.Drawers.MobileMenu") mettMobileMenuDrawer!: Vue;
	@Comp("Components.Static.Drawers.Personal") mettPersonalDrawer!: Vue;
	@Comp("Components.Static.Footer") mettFooter!: Vue;
	@Comp("Components.Static.Header") mettHeader!: Vue;

	@Getter("error/status") errorStatus!: number;
	@Getter("layout/actionDrawer") actionDrawer!: boolean;
	@Getter("layout/layoutView") layoutView!: boolean;
	@Getter("layout/mobileMenuDrawer") mobileMenuDrawer!: boolean;
	@Getter("layout/personalDrawer") personalDrawer!: boolean;
	@Getter("layout/mobileActionsCollapsed") mobileActionsCollapsed!: boolean;
	@Getter("page/forceReloadIndex") forceReloadIndex!: number;
	@Getter("user/applicationUser") applicationUser!: UserProfileDto;

	@Action("layout/setActionDrawer") setActionDrawer!: (val: boolean) => void;
	@Action("layout/setMobileMenuDrawer") setMobileMenuDrawer!: (val: boolean) => void;
	@Action("layout/setPersonalDrawer") setPersonalDrawer!: (val: boolean) => void;
	@Action("layout/setMobileActionsCollapsed") setMobileActionsCollapsed!: (val: boolean) => void;

	get mobileMenuDrawerModel() {
		return this.mobileMenuDrawer;
	}

	set mobileMenuDrawerModel(val: boolean) {
		this.setMobileMenuDrawer(val);
	}

	get actionDrawerModel() {
		return this.actionDrawer;
	}

	set actionDrawerModel(val: boolean) {
		this.setActionDrawer(val);
	}

	get personalDrawerModel() {
		return this.personalDrawer;
	}

	set personalDrawerModel(val: boolean) {
		this.setPersonalDrawer(val);
	}

	scrollHandler(details: any) {
		if (details.directionChanged || (details.direction == "down") !== this.mobileActionsCollapsed) {
			if (details.position > 0) this.setMobileActionsCollapsed(details.direction == "down");
		}
	}

	miniState = true;

	@Watch("applicationUser")
	onLoginChanged() {
		this.miniState = true;
	}

	childDisplayType = TemplateElementDisplayTypeDto.Page;

	get routerViewKey() {
		let routerViewKey = this.$route.params.pageName;

		if (this.$route.params.itemName) routerViewKey += "_" + this.$route.params.itemName;

		routerViewKey += "_" + this.forceReloadIndex;

		return routerViewKey;
	}
}
</script>
