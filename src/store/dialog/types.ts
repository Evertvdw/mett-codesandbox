import Vue from "vue";

export interface IDialog {
	title?: string;
	titleClass?: string; // Set the class (e.g. text-h2) on the title for sizing etc
	message?: string;
	resolveText?: string;
	rejectText?: string;
	resolve?: () => void; // Extra function to call when resolving the dialog
	reject?: () => void; // Extra function to call when rejecting the dialog
	component?: Vue;
	fullScreen?: boolean | false;
	maxWidth?: boolean | false;
	customMaxWidth?: string; // If you want a higher max-width the 560 px (default) but not fullwidth
	custom?: boolean; // Don't use a card but define what comes in QDialog
}

export interface IDialogItem {
	dialog: IDialog;
	resolve: (value?: any) => void;
	reject?: (reason?: any) => void;
}

export interface IDialogState {
	dialogList: IDialogItem[];
}
