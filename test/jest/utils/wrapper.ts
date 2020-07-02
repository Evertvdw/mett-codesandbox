import { WrapperOptions, RouterOptions } from "./types";
import { createLocalVue, mount } from "@vue/test-utils";
import { VueConstructor } from "vue";
import { createThemePark } from "src/mett/theming/theme-park";
import { i18n } from "src/boot/i18n";
import createStore from "src/store";
import routes from "src/router/routes";
import VueRouter from "vue-router";
import { IThemePark } from "src/mett/theming/types";
import { ILoadOptimizer } from "src/mett/communication/load-optimizer/types";
import createLoadOptimizer from "src/mett/communication/load-optimizer";
import Substitute from "@fluffy-spoon/substitute";
import { QSsrContext } from "@quasar/app";

const app: any = {
	$root: {
		$el: {
			dataset: {
				"server-rendered": false
			}
		}
	},
	i18n: i18n
};

export const createWrapper = async function(component: VueConstructor, options: WrapperOptions) {
	const localVue = createLocalVue();
	const store = createStore();
	const router = new VueRouter({ routes: routes({ store }) });
	let themePark: IThemePark;
	let loadOptimizer: ILoadOptimizer;

	if (options.router) localVue.use(VueRouter);
	if (options.themePark) themePark = createThemePark(null, store, router);
	if (options.loadOptimizer) {
		if (options.store) {
			loadOptimizer = createLoadOptimizer(
				app,
				store,
				options.loadOptimizer.SSR ? Substitute.for<QSsrContext>() : undefined
			);
			store.$loadOptimizer = loadOptimizer;
		} else {
			console.log("You cannot use the loadOptimizer without a store");
		}
	}

	return mount(component, {
		localVue,
		i18n,
		beforeCreate() {
			if (options.themePark) {
				this.$themePark = this.$root.$themePark = themePark;
			}

			if (options.router && (options.router as RouterOptions).route) {
				router.push((options.router as RouterOptions).route as string);
			}

			this.$log = jest.fn();
		},
		...Object.assign(
			{},
			options.store && { store },
			options.router && { router },
			options.mocks && { mocks: options.mocks },
			options.props && { propsData: options.props },
			options.computed && { computed: options.computed },
			options.methods && { methods: options.methods },
			options.data && {
				data() {
					return { ...options.data };
				}
			}
		)
	});
};

export const createWrapperStore = async function(options: WrapperOptions) {
	const store = createStore();
	let loadOptimizer: ILoadOptimizer;
	if (options.loadOptimizer) {
		if (options.store) {
			loadOptimizer = createLoadOptimizer(
				app,
				store,
				options.loadOptimizer.SSR ? Substitute.for<QSsrContext>() : undefined
			);
			store.$loadOptimizer = loadOptimizer;
		} else {
			console.log("You cannot use the loadOptimizer without a store");
		}
	}
	return store;
};

export const createWrapperThemePark = async function() {
	const store = createStore();
	const router = new VueRouter({ routes: routes({ store }) });
	const themePark = createThemePark(app, store, router);
	return themePark;
};
