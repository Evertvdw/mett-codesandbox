<template>
	<div :class="classes">
		<div ref="elementToFlip" :class="slotClasses">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "src/mett/components/decorators";

@Component
export default class Flippable extends Vue {
	@Ref("elementToFlip") elementToFlip?: Vue | HTMLElement;

	isFlipped = false;
	hasFlipped = false;
	isFlipping = false;
	isInitialized = false;

	get classes() {
		return {
			"mett-perspective": this.isFlipping
		};
	}

	get slotClasses() {
		return {
			"mett-is-flipped": this.isFlipped,
			"mett-has-flipped": this.hasFlipped,
			"mett-flippable": true
		};
	}

	flip() {
		if (!this.isInitialized) this.initialize();

		this.isFlipped = !this.isFlipped;
		this.hasFlipped = true;

		this.isFlipping = true;
	}

	initialize() {
		let targetElement: HTMLElement | undefined;

		if (this.elementToFlip && (this.elementToFlip as Vue).$el)
			targetElement = (this.elementToFlip as Vue).$el as HTMLElement;
		else if (this.elementToFlip) targetElement = this.elementToFlip as HTMLElement;

		if (targetElement) {
			targetElement.addEventListener(
				"webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend",
				() => {
					this.isFlipping = false;
				}
			);
		}

		this.isInitialized = true;
	}
}
</script>
