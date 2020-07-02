import { ILoadOptimizer } from "src/mett/communication/load-optimizer/types";
import Vue, { ComponentOptions } from "vue";
import { IThemePark } from "src/mett/theming/types";
import VueI18n from "vue-i18n/types";

export enum SourceType {
	backend = "backend",
	frontend = "frontend",
	ssr = "ssr"
}

export interface ILogRequired {
	short_message: string;
	full_message: any;
	level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	origin?: SourceType;
	status?: number;
}

export interface ILogExtra {
	[prop: string]: any;
}

declare module "vue/types/vue" {
	interface Vue {
		$log: (message: ILogRequired, extra?: ILogExtra) => void;
	}
}

export interface MyComponentOptions extends ComponentOptions<Vue> {
	$loadOptimizer: ILoadOptimizer;
	$themePark: IThemePark;
	i18n: typeof VueI18n.prototype;
}

declare module "vue/types/options" {
	interface ComponentOptions<V extends Vue> {
		$loadOptimizer?: ILoadOptimizer;
		$themePark?: IThemePark;
	}
}
