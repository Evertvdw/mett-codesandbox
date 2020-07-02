export interface IError {
	code?: string;
	title: string;
	message?: string;
	info?: any;
	notify?: boolean;
	timestamp: Date;
}

export interface IErrorState {
	errors: IError[];
	warnings: IError[];
	status: number;
	sessionID: string;
}
