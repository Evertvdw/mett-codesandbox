<template>
	<q-list :class="{ mini: miniState }" class="text-uppercase mett-personal-drawer-list">
		<mett-personal-drawer-notifications-item />
		<mett-personal-drawer-chat-item />
		<mett-personal-drawer-cms-item />
		<mett-personal-drawer-tasks-item />
		<mett-personal-drawer-groups-item />
		<mett-personal-drawer-media-library-item />

		<q-item
			v-ripple
			:class="miniState && !$q.screen.lt.md ? 'mett-opacity-0' : 'mett-opacity-1'"
			class="justify-center"
			clickable
		>
			<q-item-section avatar>
				<q-icon name="add_circle" />
			</q-item-section>
		</q-item>
	</q-list>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Comp } from "src/mett/components/decorators";
import { Prop } from "vue-property-decorator";

@Component
export default class PersonalDrawerList extends Vue {
	@Prop() miniState!: boolean;
	@Comp("Components.Static.Drawers.Personal.ListItems.ChatItem")
	mettPersonalDrawerChatItem!: Vue;
	@Comp("Components.Static.Drawers.Personal.ListItems.CmsItem")
	mettPersonalDrawerCmsItem!: Vue;
	@Comp("Components.Static.Drawers.Personal.ListItems.GroupsItem")
	mettPersonalDrawerGroupsItem!: Vue;
	@Comp("Components.Static.Drawers.Personal.ListItems.MediaLibraryItem")
	mettPersonalDrawerMediaLibraryItem!: Vue;
	@Comp("Components.Static.Drawers.Personal.ListItems.NotificationsItem")
	mettPersonalDrawerNotificationsItem!: Vue;
	@Comp("Components.Static.Drawers.Personal.ListItems.TasksItem")
	mettPersonalDrawerTasksItem!: Vue;
}
</script>
