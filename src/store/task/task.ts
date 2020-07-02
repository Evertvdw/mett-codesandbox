import { Module } from "vuex";
import { actions } from "./actions";
import { ITaskState, ITask, TaskStates } from "./types";

export function task(): Module<ITaskState, object> {
	return {
		namespaced: true,

		state: {
			tasks: []
		},

		getters: {
			tasks: state => state.tasks
		},

		mutations: {
			addTask(state, { task }: { task: ITask }) {
				state.tasks.push(task);
			},
			deleteTask(state, { task }: { task: ITask }) {
				const index = state.tasks.indexOf(task);

				state.tasks.splice(index, 1);
			},
			taskDone(state, { task, title, description }: { task: ITask; title?: string; description?: string }) {
				if (title) {
					task.title = title;
				}

				if (description) {
					task.description = description;
				}

				task.state = TaskStates.done;
			},
			taskFailed(state, { task, title, description }: { task: ITask; title?: string; description?: string }) {
				if (title) {
					task.title = title;
				}

				if (description) {
					task.description = description;
				}

				task.description = task.description.replace("{taskCode}", task.code);
				task.state = TaskStates.failed;
			}
		},

		actions
	};
}
