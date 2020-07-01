import { createThemePark } from 'src/mett/theming/theme-park'
import { Store } from 'vuex'
import VueRouter from 'vue-router'
import { ComponentOptions } from 'vue'

export default function({
  app,
  store,
  router
}: {
  app: ComponentOptions<Vue>
  store: Store<object>
  router: VueRouter
}) {
  const originalBeforeCreate = app.beforeCreate
  const themePark = createThemePark(app, store, router)
  app.$themePark = themePark
  app.beforeCreate = function(...args: []) {
    if (originalBeforeCreate) originalBeforeCreate.apply(this, args)
    this.$themePark = themePark
  }
}
