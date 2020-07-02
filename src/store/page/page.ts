import Vue from "vue";
import { Module } from "vuex";
import { actions } from "./actions";
import { IPageState } from "./types";

import { ItemDto, ItemRelatedToItemDto, FileDto, AddItemsResponse } from "src/mett/communication/types";
import {
	findRelatedItemsByIdRecursive,
	findItemByGuidRecursive,
	findContainerForItemGuid
} from "src/mett/helpers/item-helper";

export function page(): Module<IPageState, object> {
	return {
		namespaced: true,

		state: {
			pageMenuItems: [],
			page: null,
			saving: false,
			originalValues: {},
			forceReloadIndex: 0
		},

		getters: {
			page: state => state.page,
			saving: state => state.saving,
			pageGuid: state => (state.page && state.page.page && state.page.page.guid ? state.page.page.guid : ""),
			pageMenuItems: state => state.pageMenuItems,
			pageMenuItemByUrlSegment: state => (urlSegment: string) =>
				state.pageMenuItems.find(p => p.urlSegment == urlSegment),
			containers: state => (state.page ? state.page.containers : undefined),
			itemByGuid: state => (guid: string) => {
				if (!state.page || !state.page.containers) return undefined;

				return findItemByGuidRecursive(state.page.containers, guid);
			},
			originalValues: state => state.originalValues,
			originalValueByGuid: state => (guid: string) => state.originalValues[guid],
			changedItems: (state, getters) => {
				const changedItems: { items: ItemDto[]; containerGuid: string; pageGuid: string }[] = [];
				const pageGuid = getters.pageGuid;

				if (!state.page || !state.page.containers) return changedItems;

				for (const index in state.originalValues) {
					const item = findItemByGuidRecursive(state.page.containers, index);

					if (item) {
						const container = findContainerForItemGuid(state.page.containers, item.guid);
						if (container && container.guid) {
							const obj = changedItems.find(obj => obj.containerGuid == container.guid);
							if (obj) obj.items.push(item);
							else {
								changedItems.push({
									items: [item],
									containerGuid: container.guid,
									pageGuid: pageGuid
								});
							}
						}
					}
				}

				return changedItems;
			},
			forceReloadIndex: state => state.forceReloadIndex
		},

		mutations: {
			updateContainers(state, { containers }) {
				if (state.page) state.page.containers = containers;
			},

			setSaving(state, bool) {
				state.saving = bool;
			},

			fillRelatedItems(
				state,
				{ relatedItems, targetItem }: { relatedItems: ItemRelatedToItemDto[]; targetItem: ItemDto }
			) {
				targetItem.relatedItems = relatedItems;
			},

			setFile(state, { file, targetItem }: { file?: FileDto; targetItem: ItemDto }) {
				targetItem.file = file;
			},

			updateValue(state, { value, targetItem }: { value: any; targetItem: ItemDto }) {
				if (!targetItem) return;

				targetItem.value = value;
			},

			setOriginalValue(state, { guid, value }: { guid: string; value: any }) {
				Vue.set(state.originalValues, guid, value);
			},

			removeOriginalValue(state, { guid }: { guid: string }) {
				Vue.delete(state.originalValues, guid);
			},

			clearOriginalValues(state) {
				state.originalValues = {};
			},

			increaseForceReloadIndex(state) {
				state.forceReloadIndex++;
			},

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			addItem(state, { response }: { response: AddItemsResponse }) {
				// Todo: Do something with the response
			},

			deleteItem(state, { item }: { item: ItemDto }) {
				if (!state.page || !state.page.containers) return;

				const relatedItems = findRelatedItemsByIdRecursive(state.page.containers, item.id);

				relatedItems.forEach(ri => {
					Vue.delete(ri, "item");
				});
			},

			setItemBeingDeleted(state, { item }: { item: ItemDto }) {
				if (!item) return;

				Vue.set(item, "isBeingDeleted", true);
			},

			unsetItemBeingDeleted(state, { item }: { item: ItemDto }) {
				if (!item) return;

				Vue.set(item, "isBeingDeleted", false);
			}
		},

		actions
	};
}
