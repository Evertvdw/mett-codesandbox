import Vue from "vue";
import { Module } from "vuex";
import { actions } from "./actions";
import { IActionDrawerState } from "./types";

export function actionDrawer(): Module<IActionDrawerState, object> {
	return {
		namespaced: true,

		state: {
			content: null
		},

		getters: {
			content: state => state.content
		},

		mutations: {
			setContent(state, { content }: { content?: Vue | null }) {
				if (content) state.content = content;
				else state.content = null;
			}
		},

		actions
	};
}
