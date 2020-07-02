export interface ISettingsState {
	[index: string]: any;
}

export enum ViewTypes {
	card = "card",
	list = "list"
}

export enum FileElementTypes {
	image = "img",
	link = "a",
	div = "div"
}

export enum EditorTypes {
	inline = "inline",
	classic = "classic"
}

export enum EditorModes {
	html = "html",
	text = "text",
	singleLineText = "singleLineText"
}
