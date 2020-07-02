import { Module } from "vuex";
import { actions } from "./actions";
import { ILayoutState } from "./types";

export function layout(): Module<ILayoutState, object> {
	return {
		namespaced: true,

		state: {
			mobileMenuDrawer: false,
			personalDrawer: false,
			actionDrawer: false,
			layoutView: "lHr LpR lff",
			mobileActionsCollapsed: false
		},

		getters: {
			mobileMenuDrawer: state => state.mobileMenuDrawer,
			personalDrawer: state => state.personalDrawer,
			actionDrawer: state => state.actionDrawer,
			layoutView: state => state.layoutView,
			mobileActionsCollapsed: state => state.mobileActionsCollapsed
		},

		mutations: {
			setMobileMenuDrawer(state, showDrawer: boolean) {
				state.mobileMenuDrawer = showDrawer;
			},
			setPersonalDrawer(state, showDrawer: boolean) {
				state.personalDrawer = showDrawer;
			},
			setActionDrawer(state, showDrawer: boolean) {
				state.actionDrawer = showDrawer;
			},
			setLayoutView(state, layoutView: string) {
				state.layoutView = layoutView;
			},
			setMobileActionsCollapsed(state, showDrawer: boolean) {
				state.mobileActionsCollapsed = showDrawer;
			}
		},

		actions
	};
}
