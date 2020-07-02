import Vue, { VueConstructor } from "vue";
import { IThemePark } from "../types";
import { Store } from "vuex";
import VueRouter from "vue-router";

const themePark: IThemePark = {
	getThemeName() {
		return "default";
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getComponent(componentLocation: string, key: string, asyncPayload?: any) {
		const dashed = key.replace(".", "").replace(/([A-Z]|[0-9]+)/g, m => "-" + m.toLowerCase());
		return new Promise<VueConstructor<Vue>>(resolve => {
			resolve(
				Vue.component(key, {
					template: `<div class="${dashed}"></div>`
				})
			);
		});
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	componentExists(componentLocation: string) {
		return new Promise<boolean>(resolve => {
			resolve(true);
		});
	},
	loadErrorTheme(testThemes?: boolean) {
		return this.loadTheme("error", testThemes);
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	loadTheme(themeName: string, testThemes?: boolean) {
		return new Promise<void>(resolve => {
			resolve();
		});
	},
	themeLoaded() {
		return new Promise<void>(resolve => {
			resolve();
		});
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setVueInstance(vue: Vue) {
		return;
	}
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createThemePark(app: any | VueConstructor<Vue>, store: Store<object>, router: VueRouter): IThemePark {
	return themePark;
}
