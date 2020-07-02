import createLoadOptimizer from "src/mett/communication/load-optimizer";
import { QSsrContext } from "@quasar/app";
import { Store } from "vuex";
import { ComponentOptions } from "vue";

export default function({
	app,
	store,
	ssrContext
}: {
	app: ComponentOptions<Vue>;
	store: Store<object>;
	ssrContext: QSsrContext;
}) {
	app.$loadOptimizer = store.$loadOptimizer = createLoadOptimizer(app, store, ssrContext);
}
