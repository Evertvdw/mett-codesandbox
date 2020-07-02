import { ActionTree } from "vuex";
import createHashCode from "object-hash";
import { getStoreItemDataByPath } from "src/mett/helpers/store-helper";

import { ILoadOptimizerState, IStoreItemData } from "./types";
import { IError } from "src/store/error/types";
import { i18n } from "src/boot/i18n";
import { LoadingModes, CallOptionsModel, Call } from "src/mett/communication/load-optimizer/types";
import { invalidArgument } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";

const LoadingModeWarning: IError = {
	code: i18n.t("errors.invalidDataForLoadingMode.code"),
	title: i18n.t("errors.invalidDataForLoadingMode.title"),
	timestamp: new Date()
};

export const actions: ActionTree<ILoadOptimizerState, object> = {
	addExecutedServerSideCall({ commit, dispatch }, call: CallOptionsModel) {
		if (
			invalidArgument(dispatch, "loadOptimizer/addExecutedServerSideCall", [
				{ value: call, type: [ArgumentType.object] }
			])
		)
			return;

		commit("addExecutedServerSideCall", createHashCode(call));
	},

	removeServerSideExecutedCall({ commit, dispatch }, call: CallOptionsModel) {
		if (
			invalidArgument(dispatch, "loadOptimizer/removeServerSideExecutedCall", [
				{ value: call, type: [ArgumentType.object] }
			])
		)
			return;
		commit("removeServerSideExecutedCall", createHashCode(call));
	},

	clearServerSideExecutedCalls({ commit }) {
		commit("clearServerSideExecutedCalls");
	},

	fillLoadedStoreItem(
		{ commit, dispatch, rootState },
		data: { storeItem: string; httpData: any; rootState?: object; storeItemData?: IStoreItemData }
	) {
		if (
			invalidArgument(dispatch, "loadOptimizer/fillLoadedStoreItem", [
				{ value: data.storeItem, type: [ArgumentType.string] },
				{ value: data.httpData, type: [ArgumentType.any] },
				{ value: data.rootState, type: [ArgumentType.object, ArgumentType.undefined] },
				{ value: data.storeItemData, type: [ArgumentType.object, ArgumentType.undefined] }
			])
		)
			return;

		data.rootState = rootState;
		const storeItemData = getStoreItemDataByPath(rootState, data.storeItem);
		if (storeItemData === undefined) {
			LoadingModeWarning.message = i18n.t("errors.invalidDataForLoadingMode.description", [
				typeof data.httpData,
				LoadingModes.replace,
				data.storeItem,
				"StoreItem undefined"
			]);
			return dispatch("error/addWarning", LoadingModeWarning, { root: true });
		} else {
			data.storeItemData = storeItemData;
			commit("fillLoadedStoreItem", data);
		}
	},

	addLoadedStoreItem(
		{ commit, dispatch, rootState },
		data: { storeItem: string; httpData: any; rootState?: object; storeItemData?: IStoreItemData }
	) {
		if (
			invalidArgument(dispatch, "loadOptimizer/addLoadedStoreItem", [
				{ value: data.storeItem, type: [ArgumentType.string] },
				{ value: data.httpData, type: [ArgumentType.any] },
				{ value: data.rootState, type: [ArgumentType.object, ArgumentType.undefined] },
				{ value: data.storeItemData, type: [ArgumentType.object, ArgumentType.undefined] }
			])
		)
			return;

		data.rootState = rootState;
		// Check if the store item is of the correct type
		const storeItemData = getStoreItemDataByPath(rootState, data.storeItem);
		if (
			storeItemData === undefined ||
			(!Array.isArray(storeItemData.module[storeItemData.item]) &&
				storeItemData.module[storeItemData.item] !== null)
		) {
			LoadingModeWarning.message = i18n.t("errors.invalidDataForLoadingMode.description", [
				typeof data.httpData,
				LoadingModes.add,
				data.storeItem,
				storeItemData ? typeof storeItemData.module[storeItemData.item] : "StoreItem undefined"
			]);
			return dispatch("error/addWarning", LoadingModeWarning, { root: true });
		} else {
			data.storeItemData = storeItemData;
			commit("addLoadedStoreItem", data);
		}
	},

	prependLoadedStoreItem(
		{ commit, dispatch, rootState },
		data: { storeItem: string; httpData: any; rootState?: object; storeItemData?: IStoreItemData }
	) {
		if (
			invalidArgument(dispatch, "loadOptimizer/prependLoadedStoreItem", [
				{ value: data.storeItem, type: [ArgumentType.string] },
				{ value: data.httpData, type: [ArgumentType.any] },
				{ value: data.rootState, type: [ArgumentType.object, ArgumentType.undefined] },
				{ value: data.storeItemData, type: [ArgumentType.object, ArgumentType.undefined] }
			])
		)
			return;

		data.rootState = rootState;
		const storeItemData = getStoreItemDataByPath(rootState, data.storeItem);
		if (
			storeItemData === undefined ||
			(!Array.isArray(storeItemData.module[storeItemData.item]) &&
				storeItemData.module[storeItemData.item] !== null)
		) {
			LoadingModeWarning.message = i18n.t("errors.invalidDataForLoadingMode.description", [
				typeof data.httpData,
				LoadingModes.prepend,
				data.storeItem,
				storeItemData ? typeof storeItemData.module[storeItemData.item] : "StoreItem undefined"
			]);
			return dispatch("error/addWarning", LoadingModeWarning, { root: true });
		} else {
			data.storeItemData = storeItemData;
			commit("prependLoadedStoreItem", data);
		}
	},

	extendLoadedStoreItem(
		{ commit, dispatch, rootState },
		data: { storeItem: string; httpData: any; rootState?: object; storeItemData?: IStoreItemData }
	) {
		if (
			invalidArgument(dispatch, "loadOptimizer/extendLoadedStoreItem", [
				{ value: data.storeItem, type: [ArgumentType.string] },
				{ value: data.httpData, type: [ArgumentType.any] },
				{ value: data.rootState, type: [ArgumentType.object, ArgumentType.undefined] },
				{ value: data.storeItemData, type: [ArgumentType.object, ArgumentType.undefined] }
			])
		)
			return;

		data.rootState = rootState;
		const storeItemData = getStoreItemDataByPath(rootState, data.storeItem);
		if (
			typeof data.httpData !== "object" ||
			Array.isArray(data.httpData) ||
			storeItemData === undefined ||
			(storeItemData.module[storeItemData.item] !== null &&
				typeof storeItemData.module[storeItemData.item] !== "object" &&
				!Array.isArray(storeItemData.module[storeItemData.item]))
		) {
			LoadingModeWarning.message = i18n.t("errors.invalidDataForLoadingMode.description", [
				typeof data.httpData,
				LoadingModes.extend,
				data.storeItem,
				storeItemData ? typeof storeItemData.module[storeItemData.item] : "StoreItem undefined"
			]);
			return dispatch("error/addWarning", LoadingModeWarning, { root: true });
		} else {
			data.storeItemData = storeItemData;
			commit("extendLoadedStoreItem", data);
		}
	},

	addCachedCall(
		{ commit, dispatch },
		{ call, result, expireInMinutes = 10 }: { call: CallOptionsModel; result: any; expireInMinutes: number }
	) {
		if (
			invalidArgument(dispatch, "loadOptimizer/addCachedCall", [
				{ value: call, type: [ArgumentType.object] },
				{ value: result, type: [ArgumentType.any] },
				{ value: expireInMinutes, type: [ArgumentType.number] }
			])
		)
			return;
		commit("addCachedCall", { call, result, expireInMinutes });
	},

	removeCachedCall({ commit, dispatch }, index: string) {
		if (
			invalidArgument(dispatch, "loadOptimizer/removeCachedCall", [{ value: index, type: [ArgumentType.string] }])
		)
			return;
		commit("removeCachedCall", index);
	},

	clearCache({ commit }) {
		commit("clearCache");
	},

	addPendingCall(
		{ commit, dispatch },
		{ callOptionsModel, call }: { callOptionsModel: CallOptionsModel; call: Call }
	) {
		if (
			invalidArgument(dispatch, "loadOptimizer/addPendingCall", [
				{ value: callOptionsModel, type: [ArgumentType.object] },
				{ value: call, type: [ArgumentType.object] }
			])
		)
			return;
		commit("addPendingCall", { callOptionsModel, call });
	},

	removePendingCall({ commit, dispatch }, { callOptionsModel }: { callOptionsModel: CallOptionsModel }) {
		if (
			invalidArgument(dispatch, "loadOptimizer/removePendingCall", [
				{ value: callOptionsModel, type: [ArgumentType.object] }
			])
		)
			return;
		commit("removePendingCall", { callOptionsModel });
	},

	clearPendingCalls({ commit }) {
		commit("clearPendingCalls");
	}
};
