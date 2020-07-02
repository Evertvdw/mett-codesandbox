import Vue from "vue";
import { Module } from "vuex";
import { actions } from "./actions";
import { ISettingsState } from "./types";
import { safeStringify } from "src/mett/communication/load-optimizer/util";

export function settings(): Module<ISettingsState, object> {
	return {
		namespaced: true,

		state: {
			settings: {
				api: {
					url: process.env.API
				},
				tasks: {
					timeout: {
						short: 2000,
						long: 10000
					}
				},
				mediaLibrary: {
					pageSize: 50,
					minFileWidth: 160,
					maxFileWidth: 320,
					minFileHeight: 120,
					maxFileHeight: 240,
					minZoomLevel: 100,
					maxZoomLevel: 200
				},
				localStorageItems: [
					{
						moduleName: "settings",
						itemName: "personal"
					}
				]
			},
			personal: {},
			query: {}
		},

		getters: {
			settings: state => state.settings,
			localStorageItems: state => state.settings.localStorageItems,
			personal: state => state.personal,
			personalByKey: state => <T>(key: string) => state.personal[key] as T,
			query: state => state.query,
			querySettingByKey: state => (key: string) => state.query[key] || {},
			formattedQuery: state => {
				const returnObject: any = {};

				for (const key in state.query) {
					returnObject[key] = safeStringify(state.query[key]);
				}

				return returnObject;
			}
		},

		mutations: {
			setPersonalSetting(state, { key, value }: { key: string; value: any }) {
				Vue.set(state.personal, key, value);
			},

			setQuerySetting(state, { key, value, merge = true }: { key: string; value: any; merge?: boolean }) {
				const oldValue = state.query[key];
				let newValue: any = null;

				if (merge && oldValue) {
					if (Array.isArray(oldValue) && Array.isArray(value)) newValue = oldValue.concat(newValue);
					else if (typeof oldValue == "object" && typeof value == "object")
						newValue = Object.assign(oldValue, value);
					else newValue = value;
				} else {
					newValue = value;
				}
				Vue.set(state.query, key, newValue);
			},

			setQuery(state, { value }: { value: any }) {
				Vue.set(state, "query", value);
			}
		},

		actions
	};
}
