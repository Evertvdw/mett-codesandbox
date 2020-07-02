import { ActionTree } from "vuex";
import { ISettingsState } from "./types";
import { Dictionary } from "../types";
import { invalidArgument } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";
import { i18n } from "src/boot/i18n";
import { IError } from "src/store/error/types";

export const actions: ActionTree<ISettingsState, object> = {
	setPersonalSetting({ commit, dispatch }, { key, value }: { key: string; value: any }) {
		if (
			invalidArgument(dispatch, "settings/setPersonalSetting", [
				{ value: key, type: [ArgumentType.string] },
				{ value: value, type: [ArgumentType.any] }
			])
		) {
			return;
		}

		commit("setPersonalSetting", { key, value });
	},

	setQuerySetting({ commit, dispatch }, { key, value, merge = true }: { key: string; value: any; merge?: boolean }) {
		if (
			invalidArgument(dispatch, "settings/setQuerySetting", [
				{ value: key, type: [ArgumentType.string] },
				{ value: value, type: [ArgumentType.any] },
				{ value: merge, type: [ArgumentType.boolean] }
			])
		) {
			return;
		}

		commit("setQuerySetting", { key, value, merge });
	},

	setQuery({ commit, dispatch }, { value = {} }: { value?: Dictionary<any> | null }) {
		if (
			invalidArgument(dispatch, "settings/setQuery", [
				{ value: value, type: [ArgumentType.object, ArgumentType.undefined, ArgumentType.null] }
			])
		) {
			return;
		}

		for (const index in value) {
			if (typeof value[index] == "string") {
				try {
					value[index] = JSON.parse(value[index]);
				} catch (error) {
					const warning: IError = {
						title: i18n.t("errors.unableToJsonParseValue.title"),
						code: i18n.t("errors.unableToJsonParseValue.code"),
						message: i18n.t("errors.unableToJsonParseValue.description"),
						info: error,
						timestamp: new Date()
					};
					dispatch("error/addWarning", warning, { root: true });
				}
			}
		}

		commit("setQuery", { value });
	}
};
