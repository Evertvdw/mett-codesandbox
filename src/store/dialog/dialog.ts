import { Module } from "vuex";
import { actions } from "./actions";
import { IDialogState, IDialog, IDialogItem } from "./types";

export function dialog(): Module<IDialogState, object> {
	const state: IDialogState = {
		dialogList: []
	};

	return {
		namespaced: true,
		state,

		getters: {
			dialogs: state => {
				const dialogs: IDialog[] = [];

				state.dialogList.forEach(dc => {
					dialogs.push(dc.dialog);
				});

				return dialogs;
			},
			dialogItemByDialog: state => (dialog: IDialog) => {
				return state.dialogList.find(dc => dc.dialog == dialog);
			}
		},

		mutations: {
			addDialogItem(state, dialogItem: IDialogItem) {
				state.dialogList.push(dialogItem);
			},

			removeDialogItem(state, dialogItem: IDialogItem) {
				const index = state.dialogList.indexOf(dialogItem);

				if (index > -1) state.dialogList.splice(index, 1);
			}
		},

		actions
	};
}
