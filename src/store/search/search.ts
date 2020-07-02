import { Module } from "vuex";
import { actions } from "./actions";
import { ISearchState } from "./types";

import { SearchResultDto } from "src/mett/communication/types";

export function search(): Module<ISearchState, object> {
	return {
		namespaced: true,

		state: {
			results: [],
			isSearching: false
		},

		getters: {
			results: state => state.results,
			isSearching: state => state.isSearching
		},

		mutations: {
			setResults(state, { results }: { results?: SearchResultDto[] }) {
				if (results) state.results = results;
				else state.results = [];
			},

			setIsSearching(state, { isSearching }: { isSearching: boolean }) {
				state.isSearching = isSearching;
			}
		},

		actions
	};
}
