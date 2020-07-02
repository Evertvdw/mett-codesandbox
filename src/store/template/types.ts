import { TemplateDto, TemplateElementDto } from "src/mett/communication/types";

export interface ITemplateState {
	templates: TemplateDto[];
	templateElements: TemplateElementDto[];
}
