import Vue from "vue";
import Vuex from "vuex";

import { actionDrawer } from "./action-drawer/action-drawer";
import { dialog } from "./dialog/dialog";
import { error } from "./error/error";
import { host } from "./host/host";
import { layout } from "./layout/layout";
import { loadOptimizer } from "./load-optimizer/load-optimizer";
import { mediaLibrary } from "./media-library/media-library";
import { menu } from "./menu/menu";
import { page } from "./page/page";
import { search } from "./search/search";
import { settings } from "./settings/settings";
import { task } from "./task/task";
import { template } from "./template/template";
import { user } from "./user/user";
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
	const Store = new Vuex.Store<object>({
		state: {},
		mutations: {
			importLocalStorageItem(state, { moduleName, value }: { moduleName: string; value: any }) {
				(state as any)[moduleName] = Object.assign((state as any)[moduleName], value);
			}
		},
		modules: {
			actionDrawer: actionDrawer(),
			dialog: dialog(),
			error: error(),
			host: host(),
			loadOptimizer: loadOptimizer(),
			mediaLibrary: mediaLibrary(),
			menu: menu(),
			page: page(),
			search: search(),
			settings: settings(),
			template: template(),
			task: task(),
			user: user(),
			layout: layout()
		},

		// enable strict mode (adds overhead!)
		// for dev mode only
		strict: process.env.DEV === "true"
	});

	return Store;
}
