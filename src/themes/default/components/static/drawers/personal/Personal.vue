<template>
	<q-scroll-area class="fit">
		<mett-personal-drawer-header :mini-state="miniState" />
		<mett-personal-drawer-list :mini-state="miniState" />

		<q-item :class="miniState && !$q.screen.lt.md ? 'mett-opacity-0' : 'mett-opacity-1'">
			<q-item-section no-wrap>
				<q-btn-toggle
					v-model="editorModel"
					spread
					toggle-color="positive"
					color="white"
					text-color="grey"
					toggle-text-color="white"
					:options="[
						{ label: 'CKEditor', value: 'CKEditor' },
						{ label: 'TinyMCE', value: 'TinyMCE' }
					]"
				/>
			</q-item-section>
		</q-item>
	</q-scroll-area>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Comp, Getter, Action } from "src/mett/components/decorators";

@Component
export default class PersonalDrawer extends Vue {
	@Prop() readonly miniState!: boolean;

	@Comp("Components.Static.Drawers.Personal.Header") mettPersonalDrawerHeader!: Vue;
	@Comp("Components.Static.Drawers.Personal.List") mettPersonalDrawerList!: Vue;

	@Getter("settings/personalByKey") personalByKey!: <T>(key: string) => T;

	@Action("settings/setPersonalSetting") setPersonalSetting!: ({ key, value }: { key: string; value: any }) => void;

	get editorModel() {
		return this.personalByKey("editor");
	}

	set editorModel(value) {
		this.setPersonalSetting({ key: "editor", value: value });
	}
}
</script>
