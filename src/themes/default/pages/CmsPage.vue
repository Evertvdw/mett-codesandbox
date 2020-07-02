<template>
	<section class="mett-cms-page q-py-lg">
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
export default class CmsPage extends Vue {
	@Comp("Components.Dynamic.Heading") mettHeading!: Vue;
}
</script>
