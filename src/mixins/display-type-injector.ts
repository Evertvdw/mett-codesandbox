import { Vue, Component, Inject } from "vue-property-decorator";
import { TemplateElementDisplayTypeDto } from "src/mett/communication/types";

@Component
export default class DisplayTypeInjector extends Vue {
	@Inject({ from: "displayType", default: TemplateElementDisplayTypeDto.Default }) dpType?: {
		value: () => TemplateElementDisplayTypeDto;
	};

	currentDisplayType: TemplateElementDisplayTypeDto = TemplateElementDisplayTypeDto.Default;

	created() {
		if (this.dpType) this.currentDisplayType = this.dpType.value();
	}
}
