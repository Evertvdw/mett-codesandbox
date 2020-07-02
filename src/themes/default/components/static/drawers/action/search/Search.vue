<template>
	<!-- Todo: This component needs work -->
	<div class="mett-search mett-textfield">
		<label class="mett-button is-icon" for="mett-search-input">
			<i class="mett-icon">search</i>
		</label>

		<div class="mett-textfield-expandable-content">
			<input
				id="mett-search-input"
				v-model="query"
				:placeholder="$t('general.search')"
				type="text"
				class="mett-textfield-input"
				@keydown.enter="goSearch"
			/>
		</div>

		<mett-action-drawer-search-results />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Comp, Action } from "src/mett/components/decorators";

@Component
export default class ActionDrawerSearch extends Vue {
	@Comp("Components.Static.Drawers.Action.Search.Results")
	readonly mettActionDrawerSearchResults!: Vue;

	@Action("search/search") search!: ({ query }: { query: string }) => Promise<any>;

	query = "";

	goSearch() {
		this.search({ query: this.query }).then(
			() => {},
			() => {}
		);
		//this.$router.push('/search?q=' + this.query);
		//this.query = '';
		//this.$el.classList.remove('is-dirty');
	}
}
</script>
