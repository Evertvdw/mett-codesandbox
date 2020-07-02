import { ActionTree } from "vuex";
import { IMenuState } from "./types";

import { CallOptionsModel } from "src/mett/communication/load-optimizer/types";
import { ApiGetMenusResponse } from "src/mett/communication/types";

export const actions: ActionTree<IMenuState, object> = {
	setMenu({ commit }) {
		return new Promise((resolve, reject) => {
			const vm = this._vm;
			const call: CallOptionsModel = {
				url: "/api/menuitems/home",
				storeItem: "menu/menuItem",
				priority: 2,
				serverSide: true
			};

			this.$loadOptimizer.add<ApiGetMenusResponse>(call).then(
				() => {
					// Todo: Remove when backend API menu is complete
					if (vm.$ssrContext) commit("addDummyItems");

					this.$loadOptimizer.awaitServerCalls().then(() => resolve());
				},
				(reason: any) => {
					this.$loadOptimizer.awaitServerCalls().then(() => reject(reason));
				}
			);
		});
	}
};
