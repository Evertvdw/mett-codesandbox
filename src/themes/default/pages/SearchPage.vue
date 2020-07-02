<template>
	<section class="mett-search-page q-py-lg">
		<div class="mett-centered mett-max-width row justify-center">
			<div class="col-12">
				<mett-heading />
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";

@Component
export default class SearchPage extends Vue {
	@Comp("Components.Dynamic.Heading") mettHeading!: Vue;

	get count() {
		// Todo: count results
		const count = Math.floor(Math.random() * 101);

		return count;
	}

	get query() {
		let query = "";

		if (this.$route.query.q) {
			query = this.$route.query.q as string;
		}

		return query;
	}
}
</script>
