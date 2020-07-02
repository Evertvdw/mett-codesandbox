import { ItemDto, MenuItemDto } from "../communication/types";

export enum ItemType {
	item = "item",
	relatedItem = "relatedItem"
}

export enum ArgumentType {
	any = "any",
	object = "object",
	string = "string",
	number = "number",
	boolean = "boolean",
	function = "function",
	array = "array",
	symbol = "symbol",
	undefined = "undefined",
	null = "null",
	NaN = "NaN"
}

export interface ArgumentDefinition {
	value: any;
	type?: ArgumentType[];
}

// Todo: Remove this also when menuItem functionality changes
export interface CustomItemDto extends ItemDto {
	menuItem?: MenuItemDto;
}
