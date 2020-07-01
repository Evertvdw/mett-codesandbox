import { createDecorator } from 'vue-class-component'
import { Store, DispatchOptions } from 'vuex'
import Vue, { ComputedOptions } from 'vue'

export function Getter(getterPath: string) {
  return createDecorator((options, key) => {
    if (!options.computed) options.computed = {}

    options.computed[key] = function() {
      return (this.$store as Store<any>).getters[getterPath]
    }
  })
}

export function Setter(setterPath: string) {
  return createDecorator((options, key) => {
    if (!options.methods) options.methods = {}

    options.methods[key] = function(payload?: any) {
      return (this.$store as Store<any>).commit(setterPath, payload)
    }
  })
}

export function Action(actionPath: string) {
  return createDecorator((options, key) => {
    if (!options.methods) options.methods = {}

    options.methods[key] = function(
      payload?: any,
      dispatchOptions?: DispatchOptions
    ) {
      return (this.$store as Store<any>).dispatch(
        actionPath,
        payload,
        dispatchOptions
      )
    }
  })
}

export function Comp(componentLocation: string | any, payload?: any) {
  return (target: Vue, key: string) => {
    createDecorator((componentOptions, k) => {
      // eslint-disable-next-line prefer-const
      let originalBeforeCreate = componentOptions.beforeCreate

      componentOptions.beforeCreate = function(this: Vue) {
        if (!this.$options.components) this.$options.components = {}

        if (!this.$options.computed) this.$options.computed = {}

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const theThis = this

        if (typeof componentLocation === 'string') {
          this.$options.components[k] = function() {
            return theThis.$root.$themePark.getComponent(
              componentLocation,
              k,
              payload
            )
          }
        } else {
          this.$options.components[k] = componentLocation
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.$options.computed[k] = () => this.$options.components![k]

        if (originalBeforeCreate) originalBeforeCreate.apply(this)
      }
    })(target, key)
  }
}

export function Ref(refName: string) {
  return createDecorator((options, key) => {
    if (!options.computed) options.computed = {}

    options.computed[key] = {
      cache: false,
      get: function() {
        return (this as Vue).$refs[refName]
      }
    }
  })
}

export const NoCache = createDecorator((options, key) => {
  if (!options.computed) return

  ;(options.computed[key] as ComputedOptions<any>).cache = false
})
