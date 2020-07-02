import Vue from "vue";
import Vuex from "vuex";

import { mediaLibrary } from "./media-library/media-library";
import { dialog } from "./dialog/dialog";
import { error } from "./error/error";
import { settings } from "./settings/settings";
import { host } from "./host/host";
import { loadOptimizer } from "./load-optimizer/load-optimizer";

import { ILoadOptimizer } from "src/mett/communication/load-optimizer/types";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

declare module "vuex/types" {
	interface Store<S> {
		_vm: Vue;
		$loadOptimizer: ILoadOptimizer;
	}
}

export default function(/* { ssrContext } */) {
	// eslint-disable-next-line @typescript-eslint/ban-types
	const Store = new Vuex.Store<object>({
		state: {},
		mutations: {
			importLocalStorageItem(state, { moduleName, value }: { moduleName: string; value: any }) {
				(state as any)[moduleName] = Object.assign((state as any)[moduleName], value);
			}
		},
		modules: {
			mediaLibrary: mediaLibrary(),
			dialog: dialog(),
			error: error(),
			loadOptimizer: loadOptimizer(),
			settings: settings(),
			host: host()
		},

		// enable strict mode (adds overhead!)
		// for dev mode only
		strict: process.env.DEV === "true"
	});

	return Store;
}
