import { Module } from "vuex";
import { actions } from "./actions";
import { IErrorState, IError } from "./types";

export function error(): Module<IErrorState, object> {
	const state: IErrorState = {
		errors: [],
		warnings: [],
		status: 200,
		sessionID: ""
	};

	return {
		namespaced: true,
		state,

		getters: {
			errors: state => state.errors,
			warnings: state => state.warnings,
			status: state => state.status,
			sessionID: state => state.sessionID
		},

		mutations: {
			addError(state, error: IError) {
				state.errors.unshift(error);
			},

			addWarning(state, warning: IError) {
				state.warnings.unshift(warning);
			},

			setStatus(state, status: number) {
				state.status = status;
			},

			setSessionID(state, sessionID: string) {
				state.sessionID = sessionID;
			},

			clearErrors(state) {
				state.errors = [];
			},

			clearWarnings(state) {
				state.warnings = [];
			}
		},

		actions
	};
}
