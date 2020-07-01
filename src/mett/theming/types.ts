import Vue, { VueConstructor } from 'vue'

declare module 'vue/types/vue' {
  interface VueConstructor {
    $themePark: (this: Vue) => IThemePark
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $themePark: IThemePark
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    options?: any
  }
}

export interface IComponentContainer {
  [index: string]: VueConstructor<Vue> | (() => VueConstructor<Vue>)
}

export interface IThemePark {
  getThemeName(): string
  getComponent(
    componentLocation: string,
    key: string,
    asyncPayload?: any
  ): Promise<VueConstructor<Vue>>
  componentExists(componentLocation: string): Promise<boolean>
  loadErrorTheme(testThemes?: boolean): Promise<void>
  loadTheme(themeName: string, testThemes?: boolean): Promise<void>
  themeLoaded(): Promise<void>
  setVueInstance(vue: Vue): void
}

export enum ThemeStates {
  initial = 'initial',
  loading = 'loading',
  loaded = 'loaded',
  error = 'error'
}

export class Theme implements ITheme {
  public themeName = ''
  public failOver?: ITheme
  public components: any = {}
}

export interface ITheme {
  themeName: string
  failOver?: ITheme
  components: any
}
