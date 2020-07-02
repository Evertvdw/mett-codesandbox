import { MutationTree } from "vuex";
import { ILoadOptimizerState } from "./types";
import createHashCode from "object-hash";

export const mutations: MutationTree<ILoadOptimizerState> = {
	addExecutedServerSideCall(state, hashedCall) {
		state.executedServerSideCalls.push(hashedCall);
	},

	removeServerSideExecutedCall(state, hashedCall) {
		let index = -1;

		while ((index = state.executedServerSideCalls.indexOf(hashedCall)) > -1)
			state.executedServerSideCalls.splice(index, 1);
	},

	clearServerSideExecutedCalls(state) {
		state.executedServerSideCalls = [];
	},

	fillLoadedStoreItem(state, data) {
		const storeItemData = data.storeItemData;
		storeItemData.module[storeItemData.item] = data.httpData;
	},

	addLoadedStoreItem(state, data) {
		const storeItemData = data.storeItemData;
		if (storeItemData.module[storeItemData.item] === null) {
			if (Array.isArray(data.httpData)) {
				storeItemData.module[storeItemData.item] = data.httpData;
			} else storeItemData.module[storeItemData.item] = [data.httpData];
		} else
			storeItemData.module[storeItemData.item] = storeItemData.module[storeItemData.item].concat(data.httpData);
	},

	prependLoadedStoreItem(state, data) {
		const storeItemData = data.storeItemData;
		if (storeItemData.module[storeItemData.item] === null) {
			if (Array.isArray(data.httpData)) {
				storeItemData.module[storeItemData.item] = data.httpData;
			} else storeItemData.module[storeItemData.item] = [data.httpData];
		} else {
			if (Array.isArray(data.httpData)) {
				data.httpData.map((item: any) => storeItemData.module[storeItemData.item].unshift(item));
			} else {
				storeItemData.module[storeItemData.item].unshift(data.httpData);
			}
		}
	},

	extendLoadedStoreItem(state, data) {
		const storeItemData = data.storeItemData;
		storeItemData.module[storeItemData.item] = Object.assign(
			{},
			storeItemData.module[storeItemData.item],
			data.httpData
		);
	},

	addCachedCall(state, { call, result, expireInMinutes = 10 }) {
		const expireDate = new Date();
		expireDate.setMinutes(expireDate.getMinutes() + expireInMinutes);

		state.cachedCalls[createHashCode(call)] = { result, expireDate };
	},

	removeCachedCall(state, index) {
		delete state.cachedCalls[index];
	},

	clearCache(state) {
		state.cachedCalls = {};
	},

	addPendingCall(state, { callOptionsModel, call }) {
		const index = createHashCode(callOptionsModel);

		if (!state.pendingCalls[index]) state.pendingCalls[index] = [];

		state.pendingCalls[index].push(call);
	},

	removePendingCall(state, { callOptionsModel }) {
		const index = createHashCode(callOptionsModel);

		delete state.pendingCalls[index];
	},

	clearPendingCalls(state) {
		state.pendingCalls = {};
	}
};
