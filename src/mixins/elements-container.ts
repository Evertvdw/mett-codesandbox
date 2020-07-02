import { VueConstructor } from "vue";
import { mixins } from "vue-class-component";
import { Vue, Component } from "vue-property-decorator";
import { ItemDto, TemplateElementDisplayTypeDto } from "src/mett/communication/types";
import { IError } from "src/store/error/types";
import { Action } from "src/mett/components/decorators";
import DisplayTypeInjector from "./display-type-injector";

@Component
export default class ElementsContainer extends mixins(DisplayTypeInjector) {
	@Action("error/addWarning") addWarning!: (warning: IError) => void;

	elements: { [index: string]: () => Promise<VueConstructor<Vue>> } = {};

	elementByItem(item: ItemDto, payload: any) {
		let view: string | undefined;

		if (item.templateElement) {
			if (
				item.templateElement.displayType == TemplateElementDisplayTypeDto.Default ||
				item.templateElement.displayType == this.currentDisplayType
			)
				view = item.templateElement.view;
			else return null;
		}

		if (item.templateModelElement) {
			if (
				item.templateModelElement.displayType == TemplateElementDisplayTypeDto.Default ||
				item.templateModelElement.displayType == this.currentDisplayType
			)
				view = "Types." + item.templateModelElement.modelElementType;
			else return null;
		}

		if (!view) {
			const warning: IError = {
				title: this.$t("errors.unableToLoadElement.title"),
				message: this.$t("errors.unableToLoadElement.description", ["unknown"]),
				info: item,
				timestamp: new Date()
			};

			this.addWarning(warning);

			view = "Default";
		}

		if (!this.elements[view]) {
			this.elements[view] = async () => {
				if (await this.$root.$themePark.componentExists("Components.Dynamic." + view))
					return this.$root.$themePark.getComponent("Components.Dynamic." + view, "dynamic" + view, payload);
				else {
					const warning: IError = {
						title: this.$t("errors.unableToLoadElement.title"),
						message: this.$t("errors.unableToLoadElement.description", [view]),
						timestamp: new Date()
					};

					this.addWarning(warning);

					return this.$root.$themePark.getComponent("Components.Dynamic.Default", "dynamicDefault");
				}
			};
		}

		return this.elements[view];
	}
}
