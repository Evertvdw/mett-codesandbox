import { RouteConfig } from "vue-router";

import CmsPage from "src/pages/CmsPage.vue";
import ItemsPage from "src/pages/ItemsPage.vue";
import ProfilePage from "src/pages/ProfilePage.vue";
import SearchPage from "src/pages/SearchPage.vue";

import Redirects from "src/router/redirects";

function routes({ store }: { store: any }) {
	const routes: RouteConfig[] = [
		{
			path: "*/",
			component: () => {
				if (store && store.getters["host/errorThemeLoaded"]) {
					return import("src/layouts/ErrorLayout.vue");
				} else {
					return import("src/layouts/MainLayout.vue");
				}
			},
			children: [
				{
					path: "profile",
					name: "ProfilePage",
					component: ProfilePage
				},
				{
					path: "cms",
					name: "CmsPage",
					component: CmsPage
				},
				{
					path: "search",
					name: "SearchPage",
					component: SearchPage
				},
				{
					path: ":pageName/item/:itemName",
					name: "ViewItem",
					component: ItemsPage
				},
				{
					path: ":pageName/add",
					name: "AddItem",
					component: ItemsPage
				},
				{
					path: ":pageName/edit/:itemName",
					name: "EditItem",
					component: ItemsPage
				},
				{
					path: ":pageName/edit",
					name: "EditPage",
					component: ItemsPage
				},
				{
					path: ":pageName",
					name: "ViewPage",
					component: ItemsPage
				}
			]
		}
	];

	// Add redirects
	for (const key in Redirects) {
		routes.unshift({
			path: key,
			redirect: Redirects[key]
		});
	}

	// Always leave this as last one
	routes.push({
		path: "*",
		name: "ErrorPage",
		component: () => import("src/pages/ErrorPage.vue")
	});

	return routes;
}

export default routes;
