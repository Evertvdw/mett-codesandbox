import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { ItemDto } from "src/mett/communication/types";
import { getItemType, relatedItemsToItems } from "src/mett/helpers/item-helper";
import DisplayTypeInjector from "./display-type-injector";
import { Getter, Action, Ref } from "src/mett/components/decorators";
import { CustomItemDto } from "src/mett/helpers/types";

@Component
export default class ItemContainer extends mixins(DisplayTypeInjector) {
	@Prop() readonly item!: CustomItemDto;
	@Prop({ default: "main" }) readonly mode!: string;

	@Getter("page/originalValueByGuid") originalValueByGuid!: (guid: string) => any;
	@Getter("settings/querySettingByKey") querySettingByKey!: (key: string) => any;
	@Getter("settings/personalByKey") personalByKey!: <T>(key: string) => T;

	@Action("page/updateValue") updateValueInStore!: ({
		value,
		targetItem
	}: {
		value: any;
		targetItem: ItemDto;
	}) => void;
	@Action("settings/setPersonalSetting") setPersonalSetting!: ({ key, value }: { key: string; value: any }) => void;

	@Ref("itemContent") itemContent?: HTMLElement;

	getItemtype = getItemType;
	relatedItemsToItems = relatedItemsToItems;

	get isChanged() {
		if (!this.item || !this.item.guid || this.originalValueByGuid(this.item.guid) === undefined) {
			return false;
		}

		return true;
	}

	get isEdit() {
		return this.$route.name == "EditPage" || this.$route.name == "EditItem";
	}

	get editor() {
		return this.personalByKey("editor");
	}

	get querySettings() {
		if (!this.item || !this.item.guid) return {};

		return this.querySettingByKey(this.item.guid);
	}

	get itemHeight() {
		if (!this.itemContent) return 0;
		return this.itemContent.clientHeight;
	}

	created() {
		if (this.personalByKey("editor") === undefined) this.setPersonalSetting({ key: "editor", value: "TinyMCE" });
	}

	updateValue({ value }: { value: any }) {
		if (this.item) this.updateValueInStore({ value, targetItem: this.item });
	}
}
