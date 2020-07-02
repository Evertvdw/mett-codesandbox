<template>
	<q-page-sticky position="bottom-right" :offset="[0, 8]" class="lt-md">
		<div class="mett-mobile-actions z-top" :style="{ width: collapsed ? '58px' : '216px' }">
			<transition
				appear
				enter-active-class="animated fadeInRight"
				leave-active-class="animated fadeOutRight"
				:duration="200"
			>
				<div v-if="!collapsed" class="inline-block">
					<q-btn v-if="applicationUser" round class="mett-mobile-actions-personal-button" @click="onClick">
						<mett-mobile-drawer-avatar :size="'42px'" />
					</q-btn>

					<mett-content-actions-edit-button />
					<mett-mobile-actions-menu-button />
				</div>
			</transition>
		</div>

		<q-btn
			icon="double_arrow"
			:class="{ 'rotate-180': collapsed }"
			class="mett-mobile-actions-toggle-button absolute-top-right"
			unelevated
			round
			color="transparent"
			text-color="white"
			@click="setMobileActionsCollapsed(!collapsed)"
		></q-btn>
	</q-page-sticky>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Comp, Getter, Action } from "src/mett/components/decorators";
import { UserProfileDto } from "src/mett/communication/types";

@Component
export default class MobileMenuDrawer extends Vue {
	@Comp("Components.Static.Actions.Content.EditButton") mettContentActionsEditButton!: Vue;
	@Comp("Components.Static.Actions.Mobile.Avatar") mettMobileDrawerAvatar!: Vue;
	@Comp("Components.Static.Actions.Mobile.MenuButton") mettMobileActionsMenuButton!: Vue;

	@Getter("layout/mobileActionsCollapsed") collapsed!: boolean;
	@Getter("layout/personalDrawer") personalDrawer!: boolean;
	@Getter("user/applicationUser") applicationUser!: UserProfileDto;

	@Action("layout/setMobileActionsCollapsed") setMobileActionsCollapsed!: (val: boolean) => void;
	@Action("layout/setPersonalDrawer") setPersonalDrawer!: (val: boolean) => void;

	onClick() {
		if (this.$q.screen.lt.md) {
			this.setPersonalDrawer(!this.personalDrawer);
		}
	}

	// Dit is nodig om ervoor te zorgen dat de EditButton altijd opnieuw geinitialiseerd word (en dus goed staat)
	@Watch("$q.screen.lt.md")
	watchMobile() {
		this.setMobileActionsCollapsed(true);
	}
}
</script>
