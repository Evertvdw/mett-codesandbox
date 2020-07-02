import { ActionTree } from "vuex";
import { IUserState, ILoadUserRequest } from "./types";
import { i18n } from "src/boot/i18n";

import { CallOptionsModel, Methods, LoadingModes, ResponseStatuses } from "src/mett/communication/load-optimizer/types";
import {
	ApiGetUsersResponse,
	ApiGetUsersByQueryResponse,
	ApiGetUsersByQueryRequest,
	ApiPostLoginRequest,
	ApiPostLoginResponse,
	ApiLogoutResponse
} from "src/mett/communication/types";
import { ITask, TaskStates } from "../task/types";
import { invalidArgument, showReportNotification } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";
import { IError } from "src/store/error/types";

export const actions: ActionTree<IUserState, object> = {
	loadUser({ commit, dispatch }, { userId, userGuid, serverSide = false, useCache = true }: ILoadUserRequest) {
		if (
			invalidArgument(dispatch, "user/loadUser", [
				{ value: userId, type: [ArgumentType.number, ArgumentType.undefined] },
				{ value: userGuid, type: [ArgumentType.string, ArgumentType.undefined] },
				{ value: serverSide, type: [ArgumentType.boolean] },
				{ value: useCache, type: [ArgumentType.boolean] }
			])
		) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			if (!userId && !userGuid) {
				reject(i18n.t("errors.invalidUserIdAndGuid.description"));
			}

			const model: ApiGetUsersByQueryRequest = {
				FilterId: userId,
				FilterGuid: userGuid
			};

			const call: CallOptionsModel = {
				url: "/api/userprofiles/request",
				model: model,
				serverSide: serverSide
			};

			this.$loadOptimizer.add<ApiGetUsersByQueryResponse>(call, useCache).then(
				response => {
					if (response.status == ResponseStatuses.success && response.data)
						commit("upsertUser", { data: response.data });

					this.$loadOptimizer.awaitServerCalls().then(() => resolve());
				},
				(reason: any) => {
					this.$loadOptimizer.awaitServerCalls().then(() => reject(reason));
				}
			);
		});
	},

	loadUsers({ dispatch }, { serverSide = false, useCache = true }: { serverSide?: boolean; useCache?: boolean }) {
		if (
			invalidArgument(dispatch, "user/loadUsers", [
				{ value: serverSide, type: [ArgumentType.boolean] },
				{ value: useCache, type: [ArgumentType.boolean] }
			])
		) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			const call: CallOptionsModel = {
				url: "/api/userprofiles",
				mode: LoadingModes.replace,
				storeItem: "user/users",
				serverSide: serverSide
			};

			this.$loadOptimizer.add<ApiGetUsersResponse>(call, useCache).then(
				() => {
					this.$loadOptimizer.awaitServerCalls().then(() => resolve());
				},
				(reason: any) => {
					this.$loadOptimizer.awaitServerCalls().then(() => reject(reason));
				}
			);
		});
	},

	login({ commit, dispatch }, { email, password }: { email: string; password: string }) {
		if (
			invalidArgument(dispatch, "user/login", [
				{ value: email, type: [ArgumentType.string] },
				{ value: password, type: [ArgumentType.string] }
			])
		) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			if (email == "" || password == "") {
				reject(i18n.t("errors.invalidEmailOrPassword.description"));
				return;
			}

			const loginModel: ApiPostLoginRequest = {
				username: email,
				password: password
			};

			const call: CallOptionsModel = {
				url: "/api/login/getLoginRequest",
				model: loginModel,
				method: Methods.post
			};

			const task: ITask = {
				code: i18n.t("tasks.login.code"),
				title: i18n.t("tasks.login.title"),
				description: i18n.t("tasks.login.description"),
				state: TaskStates.processing,
				dismiss: () => {}
			};

			dispatch("task/addTask", { task }, { root: true });

			this.$loadOptimizer.add<ApiPostLoginResponse>(call, false).then(
				response => {
					dispatch(
						"task/taskDone",
						{
							task,
							description: i18n.t("tasks.login.done"),
							state: TaskStates.done,
							autoDelete: true
						},
						{ root: true }
					);

					if (response.status == ResponseStatuses.success && response.data && response.data.access_token) {
						this.$loadOptimizer.setAccessToken(response.data.access_token);
						this._vm.$q.cookies.set("access_token", response.data.access_token, {
							expires: new Date(Date.now() + 30 * 60 * 1000)
						});

						commit("setLoginData", { loginData: response.data });
						commit("setApplicationUser", { applicationUser: {} });
						dispatch("loadOptimizer/clearCache", undefined, {
							root: true
						});
						dispatch("loadApplicationUser").then(
							() => {},
							() => {}
						);
						dispatch("page/loadPageMenuItems", undefined, { root: true }).then(
							() => {},
							() => {}
						);
						dispatch("menu/setMenu", undefined, { root: true }).then(
							() => {},
							() => {}
						);
					}

					resolve();
				},
				(reason: any) => {
					dispatch(
						"task/taskFailed",
						{
							task,
							description: i18n.t("errors.invalidEmailOrPassword.description"),
							state: TaskStates.failed,
							autoDelete: true
						},
						{ root: true }
					);
					reject(reason);
				}
			);
		});
	},

	logout({ commit, dispatch }) {
		return new Promise((resolve, reject) => {
			const call: CallOptionsModel = {
				url: "/api/logout"
			};

			const task: ITask = {
				code: i18n.t("tasks.logout.code"),
				title: i18n.t("tasks.logout.title"),
				description: i18n.t("tasks.logout.description"),
				state: TaskStates.processing,
				dismiss: () => {}
			};

			dispatch("task/addTask", { task }, { root: true });

			this.$loadOptimizer.add<ApiLogoutResponse>(call, false).then(
				() => {
					dispatch(
						"task/taskDone",
						{
							task,
							description: i18n.t("tasks.logout.done"),
							state: TaskStates.done,
							autoDelete: true
						},
						{ root: true }
					);
					this.$loadOptimizer.setAccessToken(undefined);
					this._vm.$q.cookies.remove("access_token");
					commit("clearApplicationUser");
					commit("layout/setPersonalDrawer", false, { root: true });
					dispatch("menu/setMenu", undefined, { root: true }).then(
						() => {},
						() => {}
					);

					resolve();
				},
				(reason: any) => {
					dispatch(
						"task/taskFailed",
						{
							task,
							description: i18n.t("tasks.logout.failed"),
							state: TaskStates.failed,
							autoDelete: true
						},
						{ root: true }
					);
					reject(reason);
				}
			);
		});
	},

	loadApplicationUser({ commit, rootGetters }) {
		return new Promise((resolve, reject) => {
			const model: ApiGetUsersByQueryRequest = {
				FilterByCurrentAuthenticatedUser: true
			};

			const call: CallOptionsModel = {
				url: "/api/userprofiles/request",
				model: model,
				serverSide: true
			};

			this.$loadOptimizer.add<ApiGetUsersByQueryResponse>(call, false).then(
				response => {
					if (response.status == ResponseStatuses.success && response.data)
						commit("setApplicationUser", { applicationUser: response.data });

					this.$loadOptimizer.awaitServerCalls().then(() => resolve());
				},
				(reason: any) => {
					const error: IError = {
						code: i18n.t("errors.unableToLoadApplicationUser.code"),
						title: i18n.t("errors.unableToLoadApplicationUser.title"),
						message: i18n.t("errors.unableToLoadApplicationUser.description"),
						timestamp: new Date()
					};
					showReportNotification(error, rootGetters["settings/settings"]);
					this.$loadOptimizer.awaitServerCalls().then(() => reject(reason));
				}
			);
		});
	}
};
