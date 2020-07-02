import { Vue, Component, Provide, Inject } from "vue-property-decorator";
import { TemplateElementDisplayTypeDto } from "src/mett/communication/types";

@Component
export default class DisplayTypeProvider extends Vue {
	@Inject({ from: "displayType", default: TemplateElementDisplayTypeDto.Default }) dpType!: {
		value: () => TemplateElementDisplayTypeDto;
	};

	childDisplayType?: TemplateElementDisplayTypeDto;

	@Provide()
	get displayType() {
		return {
			value: () => {
				if (this.childDisplayType) return this.childDisplayType;
				else return this.dpType.value();
			}
		};
	}
}
