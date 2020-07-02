<template>
	<div
		class="mett-item-list-actions z-top"
		:style="{ top: positionTop, position: position, left: positionLeft, right: positionRight }"
	>
		<mett-add-button :item="item" :hover="hover" />
		<mett-settings-button :item="item" :hover="hover" />
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";
import { ItemDto } from "src/mett/communication/types";
// Todo: make this dynamic based on scss padding settings
// const scss = require("@/assets/scss/_config.scss");

@Component
export default class ItemListActions extends Vue {
	@Comp("Components.Dynamic.ItemList.Buttons.AddButton") mettAddButton!: Vue;
	@Comp("Components.Dynamic.ItemList.Buttons.SettingsButton")
	mettSettingsButton!: Vue;

	@Prop() readonly item?: ItemDto;
	@Prop() readonly hover?: boolean;

	positionTop = "-21px";
	positionLeft = "auto";
	positionRight = 16 + "px";
	position = "absolute";

	onScroll() {
		let offsetTop = 0;
		let offsetLeft = 0;
		let mettTopHeight = 0;
		let mettItemListHeight = 0;
		let maxOffsetTop = 0;

		// Maybe there are multiple item lists, so dont use a queryselector but get the parentelement
		const mettItemList: HTMLElement | null = this.$el.parentElement;
		const header: HTMLElement | null = this.$root.$el.querySelector("header");

		if (!mettItemList) return;

		if (header && !header.classList.contains("q-header--hidden")) {
			mettTopHeight = header.clientHeight;
		}

		mettItemListHeight = mettItemList.clientHeight;
		offsetTop = mettItemList.getBoundingClientRect().top;
		offsetLeft = mettItemList.getBoundingClientRect().right - this.$el.clientWidth - Number(16);
		maxOffsetTop = mettItemListHeight - mettTopHeight - this.$el.clientHeight - Number(16);

		if (offsetTop < mettTopHeight && -offsetTop < maxOffsetTop) {
			this.positionTop = mettTopHeight + Number(16) + "px";
			this.position = "fixed";
			this.positionLeft = offsetLeft + "px";
			this.positionRight = "auto";
		} else {
			this.positionTop = "-21px";
			this.position = "absolute";
			this.positionLeft = "auto";
			this.positionRight = 16 + "px";
		}
	}

	mounted() {
		this.onScroll();

		window.addEventListener("resize", this.onScroll);
		window.addEventListener("scroll", this.onScroll);
	}

	beforeDestroy() {
		window.removeEventListener("resize", this.onScroll);
		window.removeEventListener("scroll", this.onScroll);
	}
}
</script>
