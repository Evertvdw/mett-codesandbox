import Vue from "vue";
import { ActionTree } from "vuex/types";
import { IActionDrawerState } from "./types";
import { invalidArgument } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";

export const actions: ActionTree<IActionDrawerState, object> = {
	setContent({ commit, dispatch }, { content }: { content?: Vue | null }) {
		if (
			invalidArgument(dispatch, "page/setContent", [
				{ value: content, type: [ArgumentType.function, ArgumentType.null] }
			])
		) {
			return;
		}

		commit("setContent", { content });
	}
};
