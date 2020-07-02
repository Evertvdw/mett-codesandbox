export interface ITask {
	id?: number;
	code: string;
	title: string;
	description: string;
	state: TaskStates;
	dismiss: Function;
}

export enum TaskStates {
	processing = "processing",
	done = "done",
	failed = "failed"
}

export interface ITaskState {
	tasks: ITask[];
}
