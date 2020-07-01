import Vue from 'vue'
import Vuex from 'vuex'

import { mediaLibrary } from './media-library/media-library'
import { dialog } from './dialog/dialog'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store<object>({
    state: {},
    mutations: {
      importLocalStorageItem(
        state,
        { moduleName, value }: { moduleName: string; value: any }
      ) {
        ;(state as any)[moduleName] = Object.assign(
          (state as any)[moduleName],
          value
        )
      }
    },
    modules: {
      mediaLibrary: mediaLibrary(),
      dialog: dialog()
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV === 'true'
  })

  return Store
}
