<template>
	<q-carousel
		v-if="show"
		v-model="slide"
		animated
		arrows
		navigation
		infinite
		autoplay
		transition-prev="slide-right"
		transition-next="slide-left"
		:height="Math.min($q.screen.width / 4, 300) + 'px'"
		class="mett-carousel"
	>
		<!-- Todo: Make slides dynamic -->
		<q-carousel-slide :name="1" img-src="/demo-images/slide-01.jpg" />
		<q-carousel-slide :name="2" img-src="/demo-images/slide-02.jpg" />
		<q-carousel-slide :name="3" img-src="/demo-images/slide-03.jpg" />
		<q-carousel-slide :name="4" img-src="/demo-images/slide-04.jpg" />
	</q-carousel>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Carousel extends Vue {
	get show() {
		// Todo: Add check based on carousel slides. When there are no slides the carousel shoud not be shown.
		return this.$route.name != "SearchPage" && this.$route.name != "CmsPage";
	}

	slide = 1;
}
</script>
