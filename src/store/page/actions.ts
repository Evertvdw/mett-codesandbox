import { ActionTree } from "vuex";
import { IPageState, ILoadChildItemsRequest } from "./types";
import { i18n } from "src/boot/i18n";

import { CallOptionsModel, Methods, ResponseStatuses } from "src/mett/communication/load-optimizer/types";
import {
	ItemDto,
	FileDto,
	ApiGetPagesResponse,
	ApiGetPagesByQueryRequest,
	ApiGetPagesByQueryResponse,
	ApiGetRelatedItemsRequest,
	ApiGetRelatedItemsResponse,
	ApiUpdateItemsRequest,
	ApiUpdateItemsResponse,
	ApiAddItemsRequest,
	ApiAddItemsResponse,
	ApiDeleteItemsRequest,
	ApiDeleteItemsResponse
} from "src/mett/communication/types";
import { ITask, TaskStates } from "../task/types";
import { invalidArgument } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";
import { IError } from "../error/types";

export const actions: ActionTree<IPageState, object> = {
	loadPageMenuItems() {
		return new Promise((resolve, reject) => {
			const call: CallOptionsModel = {
				url: "/api/pages",
				storeItem: "page/pageMenuItems",
				priority: 2,
				serverSide: true
			};

			this.$loadOptimizer.add<ApiGetPagesResponse>(call).then(
				() => {
					this.$loadOptimizer.awaitServerCalls().then(() => resolve());
				},
				(reason: any) => {
					this.$loadOptimizer.awaitServerCalls().then(() => reject(reason));
				}
			);
		});
	},

	loadPageData({ dispatch }, { guid, containerGuid }: { guid: string; containerGuid?: string }) {
		if (
			invalidArgument(dispatch, "page/loadPageData", [
				{ value: guid, type: [ArgumentType.string] },
				{ value: containerGuid, type: [ArgumentType.string, ArgumentType.undefined] }
			])
		) {
			const error: IError = {
				timestamp: new Date(),
				title: i18n.t("errors.unableToLoadPageData.title"),
				code: i18n.t("errors.unableToLoadPageData.code"),
				message: i18n.t("errors.unableToLoadPageData.description"),
				info: `Guid: ${guid}, containerGuid: ${containerGuid}`,
				notify: true
			};
			dispatch("error/addError", error, { root: true });
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			if (!guid) reject(i18n.t("errors.invalidGuid.description"));

			if (!containerGuid) containerGuid = "";

			const model: ApiGetPagesByQueryRequest = {
				FilterPageGuid: guid,
				FilterContainerGuid: containerGuid
			};

			const call: CallOptionsModel = {
				url: "/api/pages/getPageRequest",
				model: model,
				storeItem: "page/page",
				extraOptions: {
					headers: { "Page-Guid": guid }
				},
				priority: 1,
				serverSide: true
			};

			this.$loadOptimizer.add<ApiGetPagesByQueryResponse>(call).then(
				() => {
					this.$loadOptimizer.awaitServerCalls().then(() => resolve());
				},
				(reason: any) => {
					this.$loadOptimizer.awaitServerCalls().then(() => reject(reason));
				}
			);
		});
	},

	updateContainers({ commit, dispatch }, { containers }: { containers: ItemDto[] }) {
		if (invalidArgument(dispatch, "page/updateContainers", [{ value: containers, type: [ArgumentType.array] }]))
			return;

		commit("updateContainers", { containers });
	},

	loadChildItems({ commit, getters, dispatch }, loadChildItemsRequest: ILoadChildItemsRequest) {
		if (
			invalidArgument(dispatch, "page/loadChildItems", [
				{ value: loadChildItemsRequest, type: [ArgumentType.object] }
			])
		) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			const serverSide =
				typeof loadChildItemsRequest.serverSide == "undefined" ? true : loadChildItemsRequest.serverSide;
			const pageGuid: string = getters["pageGuid"];

			const model: ApiGetRelatedItemsRequest = {
				FilterPageGuid: pageGuid,
				FilterContainerGuid: loadChildItemsRequest.item.guid,
				Skip: loadChildItemsRequest.skip,
				Take: loadChildItemsRequest.take,
				SortOnColumn: loadChildItemsRequest.sortOnColumn,
				SortByAction: loadChildItemsRequest.sortByAction
			};

			const call: CallOptionsModel = {
				url: "/api/relatedItems",
				model: model,
				serverSide: serverSide
			};

			this.$loadOptimizer.add<ApiGetRelatedItemsResponse>(call, loadChildItemsRequest.useCache).then(
				response => {
					if (response.status == ResponseStatuses.success) {
						commit("fillRelatedItems", {
							relatedItems: response.data,
							targetItem: loadChildItemsRequest.item
						});
					}

					this.$loadOptimizer.awaitServerCalls().then(() => resolve());
				},
				(reason: any) => {
					this.$loadOptimizer.awaitServerCalls().then(() => reject(reason));
				}
			);
		});
	},

	setFile(
		{ commit, getters, dispatch },
		{ file, targetItem, containerGuid = "" }: { file: FileDto; targetItem: ItemDto; containerGuid?: string }
	) {
		if (
			invalidArgument(dispatch, "page/setFile", [
				{ value: file, type: [ArgumentType.object] },
				{ value: targetItem, type: [ArgumentType.object] },
				{ value: containerGuid, type: [ArgumentType.string, ArgumentType.undefined] }
			])
		) {
			const error: IError = {
				timestamp: new Date(),
				title: i18n.t("errors.unableToSetFile.title"),
				code: i18n.t("errors.unableToSetFile.code"),
				message: i18n.t("errors.unableToSetFile.description"),
				notify: true
			};
			dispatch("error/addError", error, { root: true });
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			const currentFile = targetItem.file;
			const pageGuid: string = getters["pageGuid"];

			commit("setFile", { file, targetItem });

			if (!targetItem) reject(i18n.t("errors.noTargetItem.description"));

			const model: ApiUpdateItemsRequest = {
				filterPageGuid: pageGuid,
				filterContainerGuid: containerGuid,
				items: [targetItem]
			};

			const call: CallOptionsModel = {
				url: "/api/items",
				method: Methods.put,
				model: model
			};

			const task: ITask = {
				code: i18n.t("tasks.setFile.code"),
				title: i18n.t("tasks.setFile.title"),
				description: i18n.t("tasks.setFile.description"),
				state: TaskStates.processing,
				dismiss: () => {}
			};

			dispatch("task/addTask", { task }, { root: true });

			this.$loadOptimizer.add<ApiUpdateItemsResponse>(call).then(
				() => {
					dispatch(
						"task/taskDone",
						{
							task,
							description: i18n.t("tasks.setFile.done"),
							state: TaskStates.done
						},
						{ root: true }
					);
					resolve();
				},
				(reason: any) => {
					dispatch(
						"task/taskFailed",
						{
							task,
							description: i18n.t("tasks.setFile.failed"),
							state: TaskStates.failed
						},
						{ root: true }
					);
					commit("setFile", { file: currentFile, targetItem });
					reject(reason);
				}
			);
		});
	},

	updateValue({ commit, getters, dispatch }, { value, targetItem }: { value: any; targetItem: ItemDto }) {
		if (
			invalidArgument(dispatch, "page/updateValue", [
				{ value: value },
				{ value: targetItem, type: [ArgumentType.object] }
			])
		) {
			return;
		}

		const originalValue = getters["originalValueByGuid"](targetItem.guid);

		let targetValue;
		if (targetItem.value === null || targetItem.value === undefined) {
			targetValue = "";
		} else {
			targetValue = targetItem.value;
		}

		// Remove leading and trailing whitespaces
		const trimmedValue = value.trim();

		if (!(typeof originalValue === "string") && trimmedValue !== targetValue)
			commit("setOriginalValue", {
				guid: targetItem.guid,
				value: targetValue
			});
		else if (originalValue === value) commit("removeOriginalValue", { guid: targetItem.guid });

		commit("updateValue", { value, targetItem });
	},

	saveChangedItems({ commit, getters, dispatch }) {
		commit("setSaving", true);
		return new Promise((resolve, reject) => {
			const changedItems: { items: ItemDto[]; containerGuid: string; pageGuid: string }[] =
				getters["changedItems"];

			const clone: { items: ItemDto[]; containerGuid: string; pageGuid: string }[] = JSON.parse(
				JSON.stringify(changedItems)
			);

			if (clone.length == 0) return resolve();

			const calls: CallOptionsModel[] = [];

			clone.forEach(changed => {
				const model: ApiUpdateItemsRequest = {
					filterPageGuid: changed.pageGuid,
					filterContainerGuid: changed.containerGuid,
					items: changed.items
				};

				const call: CallOptionsModel = {
					url: "/api/items",
					method: Methods.put,
					model: model,
					priority: 1
				};
				calls.push(call);
			});

			const task: ITask = {
				code: i18n.t("tasks.saveChanges.code"),
				title: i18n.t("tasks.saveChanges.title"),
				description: i18n.t("tasks.saveChanges.description"),
				state: TaskStates.processing,
				dismiss: () => {}
			};

			dispatch("task/addTask", { task }, { root: true });

			this.$loadOptimizer.add<ApiUpdateItemsResponse>(calls).then(
				() => {
					dispatch(
						"task/taskDone",
						{
							task,
							description: i18n.t("tasks.saveChanges.done"),
							state: TaskStates.done
						},
						{ root: true }
					);
					commit("clearOriginalValues");
					commit("setSaving", false);
					resolve();
				},
				(reason: any) => {
					dispatch(
						"task/taskFailed",
						{
							task,
							description: i18n.t("tasks.saveChanges.failed"),
							state: TaskStates.failed
						},
						{ root: true }
					);
					commit("setSaving", false);
					reject(reason);
				}
			);
		});
	},

	restoreChangedItems({ commit, getters }) {
		const changedItems: { items: ItemDto[]; containerGuid: string; pageGuid: string }[] = getters["changedItems"];

		changedItems.forEach(ci => {
			ci.items.forEach(item => {
				commit("updateValue", {
					value: getters["originalValueByGuid"](item.guid),
					targetItem: item
				});
			});
		});

		commit("clearOriginalValues");
	},

	addItem({ getters, dispatch, commit }, { containerGuid }: { containerGuid?: string }) {
		if (
			invalidArgument(dispatch, "page/addItem", [
				{ value: containerGuid, type: [ArgumentType.string, ArgumentType.undefined] }
			])
		) {
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			const pageGuid: string = getters["pageGuid"];

			if (!containerGuid) {
				containerGuid = "";
			}

			const model: ApiAddItemsRequest = {
				filterPageGuid: pageGuid,
				filterContainerGuid: containerGuid,
				templateModelId: 3 // Todo: make this dynamic
			};

			const call: CallOptionsModel = {
				url: "/api/items",
				method: Methods.post,
				model: model
			};

			const task: ITask = {
				code: i18n.t("tasks.addItem.code"),
				title: i18n.t("tasks.addItem.title"),
				description: i18n.t("tasks.addItem.description"),
				state: TaskStates.processing,
				dismiss: () => {}
			};

			dispatch("task/addTask", { task }, { root: true });

			this.$loadOptimizer.add<ApiAddItemsResponse>(call).then(
				response => {
					if (response.status == ResponseStatuses.success) {
						commit("addItem", { response: response.data });
					}
					dispatch(
						"task/taskDone",
						{
							task,
							description: i18n.t("tasks.addItem.done"),
							state: TaskStates.done
						},
						{ root: true }
					);
					resolve();
				},
				(reason: any) => {
					dispatch(
						"task/taskFailed",
						{
							task,
							description: i18n.t("tasks.addItem.failed"),
							state: TaskStates.failed
						},
						{ root: true }
					);

					reject(reason);
				}
			);
		});
	},

	deleteItem({ getters, dispatch, commit }, { guid, containerGuid }: { guid: string; containerGuid?: string }) {
		if (
			invalidArgument(dispatch, "page/setFile", [
				{ value: guid, type: [ArgumentType.string] },
				{ value: containerGuid, type: [ArgumentType.string, ArgumentType.undefined] }
			])
		) {
			const error: IError = {
				timestamp: new Date(),
				title: i18n.t("errors.unableToDeleteItem.title"),
				code: i18n.t("errors.unableToDeleteItem.code"),
				message: i18n.t("errors.unableToDeleteItem.description"),
				notify: true
			};
			dispatch("error/addError", error, { root: true });
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			const pageGuid: string = getters["pageGuid"];
			const item = getters["itemByGuid"](guid);

			if (!item) {
				return;
			}

			if (!containerGuid) {
				containerGuid = "";
			}

			const model: ApiDeleteItemsRequest = {
				filterPageGuid: pageGuid,
				filterContainerGuid: containerGuid,
				guidToDelete: guid
			};

			const call: CallOptionsModel = {
				url: "/api/items",
				method: Methods.delete,
				model: model
			};

			const task: ITask = {
				code: i18n.t("tasks.deleteItem.code"),
				title: i18n.t("tasks.deleteItem.title"),
				description: i18n.t("tasks.deleteItem.description"),
				state: TaskStates.processing,
				dismiss: () => {}
			};

			dispatch("task/addTask", { task }, { root: true });
			commit("setItemBeingDeleted", { item });

			this.$loadOptimizer.add<ApiDeleteItemsResponse>(call).then(
				() => {
					dispatch(
						"task/taskDone",
						{
							task,
							description: i18n.t("tasks.deleteItem.done"),
							state: TaskStates.done
						},
						{ root: true }
					);

					commit("deleteItem", { item });

					resolve();
				},
				(reason: any) => {
					dispatch(
						"task/taskFailed",
						{
							task,
							description: i18n.t("tasks.deleteItem.failed"),
							state: TaskStates.failed
						},
						{ root: true }
					);

					commit("unsetItemBeingDeleted", { item });

					reject(reason);
				}
			);
		});
	},

	forceReload({ commit }) {
		commit("increaseForceReloadIndex");
	}
};
