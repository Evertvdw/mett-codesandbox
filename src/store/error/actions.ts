import { ActionTree } from "vuex";
import { IErrorState, IError } from "./types";
import { invalidArgument } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";
import { showReportNotification } from "src/mett/helpers/store-helper";
import { log } from "src/boot/logger";

export const actions: ActionTree<IErrorState, object> = {
	addError({ commit, dispatch, rootGetters }, error: IError) {
		if (invalidArgument(dispatch, "error/addError", [{ value: error, type: [ArgumentType.object] }])) {
			return;
		}

		commit("addError", error);
		log(
			{
				short_message: `[_ID_] | ${error.code} - ${error.title}`,
				full_message: error.message,
				level: 3
			},
			{
				error: error
			}
		);
		if (error.notify) {
			const settings = rootGetters["settings/settings"];
			showReportNotification(error, settings);
		}
	},

	addWarning({ commit, dispatch, rootGetters }, warning: IError) {
		if (invalidArgument(dispatch, "error/addWarning", [{ value: warning, type: [ArgumentType.object] }])) {
			return;
		}

		commit("addWarning", warning);
		log(
			{
				short_message: `[_ID_] | ${warning.code} - ${warning.title}`,
				full_message: warning.message,
				level: 4
			},
			{
				error: warning
			}
		);
		if (warning.notify) {
			const settings = rootGetters["settings/settings"];
			showReportNotification(warning, settings);
		}
	},

	clearErrors({ commit }) {
		commit("clearErrors");
	},

	clearWarnings({ commit }) {
		commit("clearWarnings");
	},

	raise401({ commit }) {
		commit("setStatus", 401);
	},

	raise404({ commit }) {
		commit("setStatus", 404);
	},

	raise500({ commit }) {
		commit("setStatus", 500);
	},

	raise200({ commit }) {
		commit("setStatus", 200);
	}
};
