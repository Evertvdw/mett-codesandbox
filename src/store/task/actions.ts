import { ActionTree } from "vuex";
import { ITaskState, ITask } from "./types";
import { i18n } from "src/boot/i18n";

import { Notify } from "quasar";
import { invalidArgument, showReportNotification } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";
import { IError } from "../error/types";

let taskIndex = 0;

export const actions: ActionTree<ITaskState, object> = {
	addTask({ commit, dispatch }, { task }: { task: ITask }) {
		if (invalidArgument(dispatch, "task/addTask", [{ value: task, type: [ArgumentType.object] }])) {
			return;
		}
		task.id = ++taskIndex;
		commit("addTask", { task });
		task.dismiss = Notify.create({
			message: task.description,
			type: "info",
			timeout: 0
		});
	},
	deleteTask({ commit, dispatch }, { task }: { task: ITask }) {
		if (invalidArgument(dispatch, "task/addTask", [{ value: task, type: [ArgumentType.object] }])) {
			return;
		}
		commit("deleteTask", { task });
	},
	taskDone(
		{ commit, dispatch, rootGetters },
		{
			task,
			title,
			description,
			autoDelete = true
		}: {
			task: ITask;
			title?: string;
			description?: string;
			autoDelete?: boolean;
		}
	) {
		if (
			invalidArgument(dispatch, "task/taskDone", [
				{ value: task, type: [ArgumentType.object] },
				{ value: title, type: [ArgumentType.string, ArgumentType.undefined] },
				{ value: description, type: [ArgumentType.string, ArgumentType.undefined] },
				{ value: autoDelete, type: [ArgumentType.boolean] }
			])
		) {
			return;
		}
		const settings = rootGetters["settings/settings"];

		commit("taskDone", { task, title, description });
		task.dismiss();
		Notify.create({
			message: task.description,
			type: "positive"
		});

		if (autoDelete) {
			setTimeout(() => {
				dispatch("deleteTask", { task });
			}, settings.tasks.timeout.short);
		}
	},
	taskFailed(
		{ commit, rootGetters, dispatch },
		{
			task,
			title,
			description,
			autoDelete = false
		}: { task: ITask; title?: string; description?: string; autoDelete?: boolean }
	) {
		if (
			invalidArgument(dispatch, "task/taskFailed", [
				{ value: task, type: [ArgumentType.object] },
				{ value: title, type: [ArgumentType.string, ArgumentType.undefined] },
				{ value: description, type: [ArgumentType.string, ArgumentType.undefined] },
				{ value: autoDelete, type: [ArgumentType.boolean] }
			])
		) {
			return;
		}
		const settings = rootGetters["settings/settings"];

		const error: IError = {
			timestamp: new Date(),
			title: i18n.t("errors.unableToCompleteTask.title", [task.title]),
			message: i18n.t("errors.unableToCompleteTask.description"),
			code: i18n.t("errors.unableToCompleteTask.code"),
			info: task
		};

		commit("taskFailed", { task, title, description });
		task.dismiss();

		showReportNotification(error, settings);

		if (autoDelete) {
			setTimeout(() => {
				dispatch("deleteTask", { task });
			}, settings.tasks.timeout.short);
		}
	}
};
