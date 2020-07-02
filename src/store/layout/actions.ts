import { ActionTree } from "vuex";
import { ILayoutState } from "./types";
import { invalidArgument } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";

export const actions: ActionTree<ILayoutState, object> = {
	setMobileMenuDrawer({ commit, dispatch }, showDrawer: boolean) {
		if (
			invalidArgument(dispatch, "actions/setMobileMenuDrawer", [
				{ value: showDrawer, type: [ArgumentType.boolean] }
			])
		) {
			return;
		}

		commit("setMobileMenuDrawer", showDrawer);
	},
	setPersonalDrawer({ commit, dispatch }, showDrawer: boolean) {
		if (
			invalidArgument(dispatch, "actions/setPersonalDrawer", [
				{ value: showDrawer, type: [ArgumentType.boolean] }
			])
		) {
			return;
		}

		commit("setPersonalDrawer", showDrawer);
	},
	setActionDrawer({ commit, dispatch }, showDrawer: boolean) {
		if (
			invalidArgument(dispatch, "actions/setActionDrawer", [{ value: showDrawer, type: [ArgumentType.boolean] }])
		) {
			return;
		}

		commit("setActionDrawer", showDrawer);
	},
	setLayoutView({ commit, dispatch }, layoutView: string) {
		if (invalidArgument(dispatch, "actions/setLayoutView", [{ value: layoutView, type: [ArgumentType.string] }])) {
			return;
		}

		commit("setLayoutView", layoutView);
	},
	setMobileActionsCollapsed({ commit, dispatch }, showDrawer: boolean) {
		if (
			invalidArgument(dispatch, "actions/setMobileActionsCollapsed", [
				{ value: showDrawer, type: [ArgumentType.boolean] }
			])
		) {
			return;
		}

		commit("setMobileActionsCollapsed", showDrawer);
	}
};
