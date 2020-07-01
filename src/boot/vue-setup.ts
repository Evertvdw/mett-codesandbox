import { Store } from 'vuex'
import VueRouter from 'vue-router'
import { QSsrContext } from '@quasar/app'
import { VueConstructor } from 'vue'
import { MyComponentOptions } from './types'

function loadTheme(app: MyComponentOptions, store: Store<object>) {
  return new Promise((resolve, reject) => {
    app.$themePark.loadTheme('default').then(
      () => {
        resolve()
      },
      (reason: any) => {
        reject(reason)
      }
    )
  })
}

export default ({
  app,
  store,
  ssrContext,
  Vue,
  router
}: {
  app: MyComponentOptions
  store: Store<object>
  ssrContext: QSsrContext
  Vue: VueConstructor<Vue>
  router: VueRouter
}) => {
  return new Promise(async resolve => {
    Vue.config.productionTip = false

    try {
      await loadTheme(app, store)
      resolve()
    } catch (error) {
      console.error(error)
      resolve()
    }
  })
}
