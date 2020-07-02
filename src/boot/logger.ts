import { QSsrContext } from "@quasar/app";
import Vue from "vue";
import { Store } from "vuex";

import Axios from "axios";
import { ILogRequired, ILogExtra, SourceType } from "./types";
import { v4 as uuidv4 } from "uuid";

let id: string;
let source: SourceType = SourceType.frontend;
let url: string;

export default ({ ssrContext, store }: { ssrContext: QSsrContext; store: Store<object> }) => {
	if (ssrContext) {
		source = SourceType.ssr;
		id = uuidv4();
		store.commit("error/setSessionID", id);
		url = process.env.LOG_URL_SSR;
	} else {
		id = store.getters["error/sessionID"];
		url = process.env.LOG_URL_CLIENT;
	}

	Vue.prototype.$log = log;
};

function log(message: ILogRequired, extra?: ILogExtra) {
	const send = extra ? extra : {};
	message.origin = source;
	message.short_message = message.short_message.replace("_ID_", id);

	if (process.env && process.env.APP_ENV === "production") {
		Axios.post(url, Object.assign(send, message)).then(
			() => {},
			() => {}
		);
	} else if (process.env.APP_DEBUG) {
		console.log(Object.assign(send, message));
	} else {
		console.log(message.short_message.split(" | ")[1]);
	}
}

export { log };
