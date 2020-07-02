import { Module } from "vuex";
import { actions } from "./actions";
import { IHostState } from "./types";

export function host(): Module<IHostState, object> {
	const state: IHostState = {
		host: null,
		errorThemeLoaded: false
	};

	return {
		namespaced: true,
		state,

		getters: {
			host: state => state.host,
			site: state => (state.host ? state.host.site : undefined),
			theme: (state, getters, rootState, rootGetters) => {
				if (rootGetters["error/status"] !== 500) {
					return state.host && state.host.site ? state.host.site.theme : undefined;
				} else {
					return {
						name: "error"
					};
				}
			},
			errorThemeLoaded: state => state.errorThemeLoaded,
			// Todo: Check if this file container is still necessary
			FileContainer: state => (state.host && state.host.site ? state.host.site.fileContainers : undefined)
		},

		mutations: {
			setErrorThemeLoaded(state, { errorThemeLoaded }: { errorThemeLoaded: boolean }) {
				state.errorThemeLoaded = errorThemeLoaded;
			}
		},

		actions
	};
}
