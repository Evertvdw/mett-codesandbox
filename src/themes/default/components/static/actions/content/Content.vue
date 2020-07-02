<template>
	<q-page-sticky
		class="mett-content-actions gt-sm"
		:position="$q.screen.lt.lg ? 'bottom-right' : 'top-right'"
		:offset="[offsetLeft, offsetTop]"
	>
		<mett-content-edit-button v-if="!$q.screen.lt.md" />
	</q-page-sticky>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";

@Component
export default class ContentActions extends Vue {
	@Comp("Components.Static.Actions.Content.EditButton")
	mettContentEditButton!: Vue;

	// Todo: Spacing based on SCSS variables
	offsetTop = 16;
	offsetLeft = 16;

	@Watch("$q.screen.lt.lg")
	onResize() {
		this.$nextTick(() => {
			this.onScroll();
		});
	}

	onScroll() {
		let headerHeight = 0;

		const itemsPage: HTMLElement | null = this.$root.$el.querySelector(".mett-items-page");
		const header: HTMLElement | null = this.$root.$el.querySelector(".mett-header");

		if (header && !header.classList.contains("q-header--hidden")) {
			headerHeight = header.clientHeight;
		}
		if (itemsPage && !this.$q.screen.lt.lg) {
			// Subtract one for header border
			if (itemsPage.getBoundingClientRect().top > headerHeight + 15) {
				// Subtract one for header border
				this.offsetTop = itemsPage.getBoundingClientRect().top - headerHeight + 15;
			} else {
				this.offsetTop = 16;
			}
		} else {
			this.offsetTop = 16;
		}
	}

	mounted() {
		this.onScroll();
		window.addEventListener("resize", this.onResize);
		window.addEventListener("scroll", this.onScroll);
	}

	beforeDestroy() {
		window.removeEventListener("resize", this.onResize);
		window.removeEventListener("scroll", this.onScroll);
	}
}
</script>
