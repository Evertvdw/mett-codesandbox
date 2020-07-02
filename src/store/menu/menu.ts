import { Module } from "vuex";
import { actions } from "./actions";
import { IMenuState } from "./types";

import { MenuItemDto } from "src/mett/communication/types";

export function menu(): Module<IMenuState, object> {
	return {
		namespaced: true,

		state: {
			menuItem: {
				id: 0,
				guid: "",
				createdOn: new Date(),
				updatedOn: new Date()
			}
		},

		getters: {
			menuItem: state => state.menuItem,
			menuItemByUrlSegment: (state, getters) => (urlSegment: string, menuItem?: MenuItemDto) => {
				if (!menuItem) menuItem = state.menuItem;

				if (menuItem.urlSegment == urlSegment) return menuItem;

				if (menuItem.relatedMenuItems && menuItem.relatedMenuItems.length > 0) {
					const foundItem = menuItem.relatedMenuItems.find(i => i.urlSegment == urlSegment);

					if (foundItem) return foundItem;
					else {
						for (const i in menuItem.relatedMenuItems) {
							const currentItem = getters.menuItemByUrlSegment(urlSegment, menuItem.relatedMenuItems[i]);

							if (currentItem) return currentItem;
						}
					}
				}

				return null;
			}
		},

		mutations: {
			setMenuItem(state, item: MenuItemDto) {
				state.menuItem = item;
			},
			// For testing the current menu
			// Todo: remove when backend API for menu is complete
			addDummyItems(state) {
				if (
					state.menuItem &&
					state.menuItem.relatedMenuItems &&
					state.menuItem.relatedMenuItems[0] &&
					state.menuItem.relatedMenuItems[0].relatedMenuItems
				) {
					state.menuItem.relatedMenuItems[0].relatedMenuItems.push({
						name: "Fake news",
						urlSegment: "fake-news",
						id: 1892982398239,
						guid: "slklsjdlkjsdfid",
						createdOn: new Date(),
						updatedOn: new Date()
					});
					state.menuItem.relatedMenuItems[0].relatedMenuItems.push({
						name: "Echt nieuws",
						urlSegment: "echt-nieuws",
						id: 19982372788123,
						guid: "lkjsdheifkdjfksid",
						createdOn: new Date(),
						updatedOn: new Date()
					});
				}
			}
		},

		actions
	};
}
