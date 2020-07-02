<template>
	<div v-if="show" class="mett-breadcrumbs text-capitalize">
		<div class="row mett-max-width mett-centered">
			<q-breadcrumbs class="col-12">
				<template v-slot:separator>
					<q-icon name="chevron_right" />
				</template>

				<q-breadcrumbs-el v-if="showHome" :to="'/'" label="Home" />

				<q-breadcrumbs-el
					v-for="(crumb, index) in breadCrumbs"
					:key="index"
					:to="'/' + breadCrumbs.slice(0, index + 1).join('/')"
					:label="crumb"
				/>
			</q-breadcrumbs>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class BreadCrumbs extends Vue {
	get show() {
		// Todo: Add setting to hide breadcrumbs
		return this.$route.name != "SearchPage" && this.$route.name != "CmsPage";
	}

	get showHome() {
		return this.$route.path != "/home" && this.$route.path != "/home/edit";
	}

	get breadCrumbs() {
		return this.$route.path.split("/").filter(item => item != "");
	}
}
</script>
