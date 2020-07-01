import VueRouter from 'vue-router'
import Vue, { VueConstructor } from 'vue'
import { Store } from 'vuex'
import {
  IComponentContainer,
  ITheme,
  IThemePark,
  Theme,
  ThemeStates
} from './types'

export function createThemePark(
  app: any | VueConstructor<Vue>,
  store: Store<object>,
  router: VueRouter
): IThemePark {
  let _vue = app
  let _themeState: ThemeStates = ThemeStates.initial
  let _themeToLoad = ''
  let _theme: ITheme = new Theme()
  let _components: IComponentContainer | null = null
  let _themeName = ''
  const _pendingLoadedPromises: any[] = []
  const _pendingComponentsPromises: any[] = []
  let _pendingComponentsPromisesTimeout: any = 0

  const getComponents = function(): Promise<IComponentContainer | null> {
    return new Promise((resolve, reject) => {
      clearTimeout(_pendingComponentsPromisesTimeout)

      if (_themeState === ThemeStates.loaded) {
        resolve(_components)
      } else if (
        _themeState === ThemeStates.loading ||
        _themeState === ThemeStates.initial
      ) {
        _pendingComponentsPromises.push(resolve)
        _pendingComponentsPromisesTimeout = setTimeout(function() {
          for (const index in _pendingComponentsPromises) {
            _pendingComponentsPromises[index](null)
          }
        }, 30000)
      } else {
        reject()
      }
    })
  }

  const initTheme = function() {
    _components = {}

    if (!_theme) {
      _themeState = ThemeStates.error
    } else {
      setComponentsByTheme(_theme)

      _themeName = _theme.themeName
      _themeState = ThemeStates.loaded
    }

    for (const index in _pendingLoadedPromises) {
      _pendingLoadedPromises[index]()
    }

    for (const index in _pendingComponentsPromises) {
      _pendingComponentsPromises[index](_components)
    }
  }

  const setComponentsByTheme = function(theme: ITheme) {
    if (!theme) return null

    if (typeof theme.failOver !== 'undefined' && theme.failOver !== null)
      setComponentsByTheme(theme.failOver)

    const components = getComponentsByContainer(theme.components)

    Object.assign(_components, components)
  }

  const getComponentsByContainer = function(
    componentsContainer: any,
    prefix?: string
  ) {
    const components: any = {}

    for (const componentName in componentsContainer) {
      const component = componentsContainer[componentName]
      const componentId = (prefix ? prefix + '.' : '') + componentName

      if (
        typeof component === 'object' &&
        typeof component.render === 'undefined'
      ) {
        Object.assign(
          components,
          getComponentsByContainer(component, componentId)
        )
      } else components[componentId] = component
    }

    return components
  }

  return {
    getThemeName() {
      return _themeName
    },

    loadErrorTheme(testThemes?: boolean) {
      store.dispatch('host/setErrorThemeLoaded', { errorThemeLoaded: true })

      return this.loadTheme('error', testThemes)
    },

    loadTheme(targetTheme: string, testThemes?: boolean) {
      _themeToLoad = targetTheme
      _themeState = ThemeStates.loading

      return new Promise((resolve, reject) => {
        import('src/themes/_initializers/' + targetTheme).then(
          function(result) {
            if (targetTheme === _themeToLoad) {
              _theme = result.default
              initTheme()
              resolve()
            }
          },
          function(error) {
            if (targetTheme === _themeToLoad) {
              _theme = new Theme()
              _components = null
              _themeName = ''
              _themeState = ThemeStates.error

              reject(error)
            }
          }
        )
      })
    },

    // Todo: Check if they key on this function as argument is necessary as it isn't used anywhere.
    getComponent(
      componentLocation: string,
      key: string,
      asyncPayload?: any
    ): Promise<VueConstructor<Vue>> {
      return new Promise(async (resolve, reject) => {
        const currentComponents: IComponentContainer | null = await getComponents()

        if (currentComponents == null) {
          store.dispatch('error/addError', {
            code: app.i18n.t('errors.unableToLoadComponent.code'),
            title: app.i18n.t('errors.unableToLoadComponent.title'),
            message: app.i18n.t('errors.unableToLoadComponent.description')
          })
          return reject()
        }

        const componentLocationParts = componentLocation.split('.')
        componentLocationParts.push(
          componentLocationParts[componentLocationParts.length - 1]
        )
        const componentSubLocation = componentLocationParts.join('.')

        if (!(await this.componentExists(componentLocation))) {
          store.dispatch('error/addError', {
            code: app.i18n.t('errors.unableToLoadComponentOrSubComponent.code'),
            title: app.i18n.t(
              'errors.unableToLoadComponentOrSubComponent.title'
            ),
            message: app.i18n.t(
              'errors.unableToLoadComponentOrSubComponent.description',
              [componentLocation, componentSubLocation, _themeName]
            )
          })
          return reject()
        }

        let currentItem = currentComponents[componentLocation]
        let currentComponent: VueConstructor<Vue>

        if (!currentItem) currentItem = currentComponents[componentSubLocation]

        if (
          typeof (currentItem as any).render !== 'undefined' ||
          typeof (currentItem as any).options !== 'undefined'
        )
          currentComponent = currentItem as VueConstructor<Vue>
        else currentComponent = (currentItem as () => VueConstructor<Vue>)()

        if (
          currentComponent.options &&
          currentComponent.options.methods &&
          typeof currentComponent.options.methods.asyncLoad === 'function'
        ) {
          try {
            let asyncLoadExecutionKey: any = 'default'

            if (asyncPayload) asyncLoadExecutionKey = asyncPayload

            if (
              !currentComponent.options.asyncLoadExecutionKeys ||
              currentComponent.options.asyncLoadExecutionKeys.indexOf(
                asyncLoadExecutionKey
              ) === -1
            ) {
              if (!currentComponent.options.asyncLoadExecutionKeys) {
                currentComponent.options.asyncLoadExecutionKeys = []
                currentComponent.options.asyncLoadExecutions = []
              }

              currentComponent.options.asyncLoadExecutionKeys.push(
                asyncLoadExecutionKey
              )

              currentComponent.options.asyncLoadExecutions.push(
                currentComponent.options.methods
                  .asyncLoad(
                    Object.assign({ vm: _vue, store, router }, asyncPayload)
                  )
                  .then(() => {
                    currentComponent.options.asyncLoadExecutionKeys = null
                    currentComponent.options.asyncLoadExecutions = null
                  })
              )
            }

            await currentComponent.options.asyncLoadExecutions[
              currentComponent.options.asyncLoadExecutionKeys.indexOf(
                asyncLoadExecutionKey
              )
            ]
          } catch (error) {
            currentComponent.options.asyncLoadExecutionKeys = null
            currentComponent.options.asyncLoadExecutions = null
          }
        }

        resolve(currentComponent)
      })
    },

    async componentExists(componentLocation: string) {
      const currentComponents: IComponentContainer | null = await getComponents()
      const componentLocationParts = componentLocation.split('.')
      componentLocationParts.push(
        componentLocationParts[componentLocationParts.length - 1]
      )

      const componentSubLocation = componentLocationParts.join('.')

      if (
        currentComponents &&
        (currentComponents[componentLocation] ||
          currentComponents[componentSubLocation])
      )
        return true

      return false
    },

    themeLoaded() {
      return new Promise((resolve, reject) => {
        if (_themeState === ThemeStates.loaded) resolve()
        if (_themeState === ThemeStates.initial) reject()
        else _pendingLoadedPromises.push(resolve)
      })
    },

    setVueInstance(vue: Vue) {
      if (vue.$store || !store) _vue = vue
    }
  }
}
