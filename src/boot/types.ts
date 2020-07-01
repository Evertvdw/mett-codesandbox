import Vue, { ComponentOptions } from 'vue'
import { IThemePark } from 'src/mett/theming/types'

export interface MyComponentOptions extends ComponentOptions<Vue> {
  $themePark: IThemePark
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    $themePark?: IThemePark
  }
}
