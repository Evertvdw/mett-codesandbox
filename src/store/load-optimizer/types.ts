import { Call } from "src/mett/communication/load-optimizer/types";

export interface ILoadOptimizerState {
	executedServerSideCalls: string[];
	cachedCalls: ICachedCalls;
	debugData: IDebugData[];
	pendingCalls: IPendingCalls;
}

export interface IPendingCalls {
	[index: string]: Call[];
}

export interface ICachedCalls {
	[index: string]: ICachedCall;
}

export interface ICachedCall {
	result: any;
	expireDate: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDebugData {}

export interface IStoreItemData {
	module: any;
	item: string;
}
