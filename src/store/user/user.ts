import { Module } from "vuex";
import { actions } from "./actions";
import { IUserState } from "./types";

import { UserProfileDto, LoginDto } from "src/mett/communication/types";

export function user(): Module<IUserState, object> {
	return {
		namespaced: true,

		state: {
			applicationUser: null,
			users: [],
			loginData: null
		},

		getters: {
			applicationUser: state => state.applicationUser,
			users: state => state.users,
			userByGuid: state => (guid: string) => {
				return state.users.find(u => u.guid == guid);
			},
			userById: state => (id: number) => {
				return state.users.find(u => u.id == id);
			},
			loginData: state => state.loginData
		},

		mutations: {
			fillUsers(state, { users }: { users: UserProfileDto[] }) {
				state.users = users;
			},

			upsertUser(state, { user }: { user: UserProfileDto }) {
				const targetIndex = state.users.findIndex(u => u.id == user.id);

				if (targetIndex > -1) state.users[targetIndex] = user;
				else state.users.push(user);
			},

			setApplicationUser(state, { applicationUser }: { applicationUser: UserProfileDto }) {
				state.applicationUser = applicationUser;
			},

			clearApplicationUser(state) {
				state.applicationUser = null;
			},

			setLoginData(state, { loginData }: { loginData: LoginDto }) {
				state.loginData = loginData;
			},

			clearLoginData(state) {
				state.loginData = null;
			}
		},

		actions
	};
}
