import { ActionTree } from "vuex";
import { IHostState } from "./types";

import { CallOptionsModel } from "src/mett/communication/load-optimizer/types";
import { ApiGetHostResponse } from "src/mett/communication/types";
import { invalidArgument } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";

export const actions: ActionTree<IHostState, object> = {
	loadHostInfo() {
		return new Promise((resolve, reject) => {
			const call: CallOptionsModel = {
				url: "/api/hosts",
				storeItem: "host/host",
				priority: 1,
				serverSide: true
			};

			this.$loadOptimizer.add<ApiGetHostResponse>(call).then(
				() => {
					this.$loadOptimizer.awaitServerCalls().then(() => resolve());
				},
				(reason: any) => {
					this.$loadOptimizer.awaitServerCalls().then(() => reject(reason));
				}
			);
		});
	},

	setErrorThemeLoaded({ dispatch, commit }, { errorThemeLoaded }: { errorThemeLoaded: boolean }) {
		if (
			invalidArgument(dispatch, "page/updateContainers", [
				{ value: errorThemeLoaded, type: [ArgumentType.boolean] }
			])
		)
			return;

		commit("setErrorThemeLoaded", { errorThemeLoaded });
	}
};
