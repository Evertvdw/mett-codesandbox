import { QSsrContext } from "@quasar/app";
import Redirects from "src/router/redirects";

export default function({ redirect, ssrContext }: { redirect: (url: string) => void; ssrContext?: QSsrContext }) {
	if (ssrContext) {
		// eslint-disable-next-line no-prototype-builtins
		if (Redirects.hasOwnProperty(ssrContext.url)) {
			redirect(Redirects[ssrContext.url]);
		}
	}
}
