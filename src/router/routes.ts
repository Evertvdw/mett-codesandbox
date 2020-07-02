import { RouteConfig } from "vue-router";

// import Redirects from "src/router/redirects";

function routes({ store }: { store: any }) {
	const routes: RouteConfig[] = [
		{
			path: "/",
			component: () => import("src/layouts/MainLayout.vue"),
			children: [{ path: "", component: () => import("src/pages/Index.vue") }]
		},

		// Always leave this as last one
		{
			path: "*",
			component: () => import("src/pages/Error404.vue")
		}
	];

	// Add redirects
	// for (const key in Redirects) {
	// 	routes.unshift({
	// 		path: key,
	// 		redirect: Redirects[key]
	// 	});
	// }

	return routes;
}

export default routes;
