import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component
export default class SlotContainer extends Vue {
	slotNames: string[] = [];

	created() {
		if (this.slotNames) this.slotNamesSet();
	}

	@Watch("slotNames")
	slotNamesSet() {
		if (this.slotNames.indexOf("default") == -1) {
			this.slotNames.push("default");

			if (this.$ssrContext) this.slotNamesSet();
		} else this.$emit("slot-names-set", this.slotNames);
	}
}
