import { ActionTree } from "vuex";
import { IDialogState, IDialog, IDialogItem } from "./types";
import { invalidArgument } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";
import { i18n } from "src/boot/i18n";
import { IError } from "../error/types";

export const actions: ActionTree<IDialogState, object> = {
	openDialog({ commit, dispatch }, { dialog }: { dialog: IDialog }) {
		if (invalidArgument(dispatch, "dialog/openDialog", [{ value: dialog, type: [ArgumentType.object] }])) {
			const error: IError = {
				timestamp: new Date(),
				title: i18n.t("errors.unableToShowDialog.title"),
				code: i18n.t("errors.unableToShowDialog.code"),
				message: i18n.t("errors.unableToShowDialog.description", [dialog.title]),
				notify: true
			};
			dispatch("error/addError", error, { root: true });
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			const dialogItem: IDialogItem = {
				dialog,
				resolve,
				reject
			};

			commit("addDialogItem", dialogItem);
		});
	},

	resolveDialog({ commit, getters, dispatch }, { dialog, value }: { dialog: IDialog; value?: any }) {
		if (
			invalidArgument(dispatch, "dialog/resolveDialog", [
				{ value: dialog, type: [ArgumentType.object] },
				{ value: value, type: [ArgumentType.any, ArgumentType.undefined] }
			])
		)
			return;

		const targetContainer: IDialogItem | undefined = getters["dialogItemByDialog"](dialog);

		if (targetContainer) {
			if (targetContainer.resolve) targetContainer.resolve(value);

			if (dialog.resolve) dialog.resolve();

			commit("removeDialogItem", targetContainer);
		}
	},

	rejectDialog({ commit, getters, dispatch }, { dialog, reason }: { dialog: IDialog; reason?: any }) {
		if (
			invalidArgument(dispatch, "dialog/rejectDialog", [
				{ value: dialog, type: [ArgumentType.object] },
				{ value: reason, type: [ArgumentType.any, ArgumentType.undefined] }
			])
		)
			return;

		const targetContainer: IDialogItem | undefined = getters["dialogItemByDialog"](dialog);

		if (targetContainer) {
			if (targetContainer.reject) targetContainer.reject(reason);

			if (dialog.reject) dialog.reject();

			commit("removeDialogItem", targetContainer);
		}
	}
};
