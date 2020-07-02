import { ActionTree } from "vuex/types";
import { ISearchState } from "./types";

import { CallOptionsModel, Methods } from "src/mett/communication/load-optimizer/types";
import {
	ItemDto,
	SortOnColumnDto,
	SortByActionDto,
	ApiGetSearchByQueryRequest,
	ApiGetSearchByQueryResponse,
	ApiAddSearchResponse,
	ApiAddSearchRequest
} from "src/mett/communication/types";
import { invalidArgument } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";

export const actions: ActionTree<ISearchState, object> = {
	search({ commit, dispatch }, { query }: { query: string }) {
		if (invalidArgument(dispatch, "search/search", [{ value: query, type: [ArgumentType.string] }]))
			return Promise.reject();

		commit("setIsSearching", { isSearching: true });

		return new Promise((resolve, reject) => {
			const model: ApiGetSearchByQueryRequest = {
				Index: "mett456",
				Query: query,
				Page: 1,
				PageSize: 5
			};

			const call: CallOptionsModel = {
				url: "/api/search",
				storeItem: "search/results",
				model: model
			};

			this.$loadOptimizer.add<ApiGetSearchByQueryResponse[]>(call, false).then(
				() => {
					this.$loadOptimizer.awaitServerCalls().then(() => resolve());
					commit("setIsSearching", { isSearching: false });
				},
				(reason: any) => {
					this.$loadOptimizer.awaitServerCalls().then(() => reject(reason));
					commit("setIsSearching", { isSearching: false });
				}
			);
		});
	},

	clearResult({ commit }) {
		commit("setResults", { results: [] });
	},

	indexItem({ rootGetters, dispatch }, { item }: { item: ItemDto }) {
		if (invalidArgument(dispatch, "search/indexItem", [{ value: item, type: [ArgumentType.object] }]))
			return Promise.reject();

		return new Promise((resolve, reject) => {
			const pageGuid: string = rootGetters["page/pageGuid"];

			const model: ApiAddSearchRequest = {
				filterPageGuid: pageGuid,
				filterContainerGuid: item.guid,
				skip: 0,
				take: 10,
				sortOnColumn: SortOnColumnDto.Published,
				sortByAction: SortByActionDto.Ascending
			};

			const call: CallOptionsModel = {
				url: "/api/search/getItemsRequest",
				method: Methods.post,
				model: model
			};

			this.$loadOptimizer.add<ApiAddSearchResponse>(call).then(
				() => {
					resolve();
				},
				(reason: any) => {
					reject(reason);
				}
			);
		});
	}
};
