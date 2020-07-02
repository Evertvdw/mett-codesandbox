import createHashCode from "object-hash";
import { Module } from "vuex";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { ILoadOptimizerState, ICachedCall } from "./types";

import { CallOptionsModel, Call } from "src/mett/communication/load-optimizer/types";

export function loadOptimizer(): Module<ILoadOptimizerState, object> {
	return {
		namespaced: true,

		state: {
			executedServerSideCalls: [],
			debugData: [],
			cachedCalls: {},
			pendingCalls: {}
		},

		getters: {
			isAlreadyExecutedServerSide: state => (call: CallOptionsModel) => {
				return state.executedServerSideCalls.indexOf(createHashCode(call)) > -1;
			},
			cachedCall: state => (call: CallOptionsModel) => {
				const index = createHashCode(call);
				const cachedCall: ICachedCall | undefined = state.cachedCalls[index];

				if (cachedCall && new Date() > cachedCall.expireDate) return undefined;

				return cachedCall;
			},
			pendingCall: state => (callOptionsModel: CallOptionsModel) => {
				const index = createHashCode(callOptionsModel);
				const pendingCall: Call[] | undefined = state.pendingCalls[index];

				return pendingCall;
			}
		},

		mutations,
		actions
	};
}
