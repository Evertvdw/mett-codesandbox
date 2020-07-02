/* eslint-disable @typescript-eslint/ban-types */
import Vue from "vue";

export interface ICallOptions {
	url: string;
	method: Methods;
	query: string;
	storeItem: string;
	priority: number;
	mode: LoadingModes;
	model?: any;
	serverSide: boolean;
	forwardCookies: boolean;
	extraOptions: any;
	cacheExpireInMinutes: number;
	error?: any;

	id?: string;
	remove?: boolean;
	then?: {
		success?: (response: IAddResponse<any>) => void;
		error?: Function;
	};
	//skipped?: Function;
	onDone?: Function;
	loaded?: boolean;
	skip?: boolean;
}

export interface IAddResponse<T> {
	status: ResponseStatuses;
	data?: T;
}

interface IAddResult<T> {
	then(success?: (response: IAddResponse<T>) => void, error?: Function): IAddResult<T>;
	//skipped(callback: Function): IAddResult<T>;
}

export enum ResponseStatuses {
	success = "success",
	skipped = "skipped",
	error = "error"
}

// Declaration of the different modes.
// add: Adds the result to the current values in the Vuex Store object
// replace: Replaces the current values in the Vuex Store object
export enum LoadingModes {
	add = "add",
	replace = "replace",
	prepend = "prepend",
	extend = "extend"
}

export enum Methods {
	get = "get",
	post = "post",
	put = "put",
	delete = "delete"
}

export class DefaultOptions implements ICallOptions {
	public url = "";
	public method: Methods = Methods.get;
	public query = "";
	public storeItem = "";
	public priority = 3;
	public mode: LoadingModes = LoadingModes.replace;
	public serverSide = false;
	public forwardCookies = true;
	public extraOptions: any = {};
	public cacheExpireInMinutes = 10;
}

export class Call {
	public options: ICallOptions;
	public originalOptionsModel: CallOptionsModel;
	public useCache: boolean;
	public start: number;

	private _defaultOptions: ICallOptions = new DefaultOptions();

	constructor(options: CallOptionsModel, useCache = true, start: number) {
		this.options = Object.assign({}, this._defaultOptions, options);
		this.originalOptionsModel = options;
		this.useCache = useCache;
		this.start = start;
	}
}

export interface IArrayProperties {
	numberOfLoadingItems: number;
	values: any;
	errors: any[];
	then?: {
		success?: (response: IAddResponse<any>) => void;
		error?: Function;
	};
}

export interface CallOptionsModel {
	// The URL to the endpoint for this call.
	// Required for use with a REST call.
	// Optional for use with a GraphQL call.
	url?: string;

	// The method to use for this call.
	// Only available with REST calls.
	// Default value: Methods.get.
	// Optional.
	method?: Methods;

	// The model to send with a POST or PUT request.
	// Only available with REST calls.
	// Optional;
	model?: any;

	// GraphQL query.
	// Not allowed with REST calls.
	// Required for GraphQL calls.
	query?: string;

	// Name of the vuex store item which will contain the result.
	// Optional.
	storeItem?: string;

	// Priority of the call. The lower the number, the higher the priority ;)
	// The loadOptimizer will bundle calls with the same priority and will wait
	// till all these calls are ready before loading the lower priorities.
	// Optional.
	priority?: number;

	// The mode will determine how to treat the result of the call.
	// Optional.
	mode?: LoadingModes;

	// Set to true to also get this data in server side rendering, before pushing
	// the HTML to the client.
	// Optional.
	serverSide?: boolean;

	// If the call is server side you want to forward the cookies to the local
	// server, to be able to use authentication data.
	// Optional.
	forwardCookies?: boolean;

	// Use the extraOptions to add options to the vue-resource call, like header data.
	// Optional.
	extraOptions?: any;

	// The number of minutes a result is cached.
	// Default value: 10.
	// Optional.
	cacheExpireInMinutes?: number;
}

export interface ILoadOptimizer {
	modes: LoadingModes;
	add<T>(callOptions: CallOptionsModel | CallOptionsModel[], useCache?: boolean): IAddResult<T>;
	awaitServerCalls(): Promise<{}>;
	clearCache(): void;
	clearPendingCalls(): void;
	setServerSideCookies(cookieString?: string): void;
	setAccessToken(accessToken?: string): void;
	accessTokenSet(): boolean;
	setBaseUrl(url: string): void;
	setVueInstance(vue: Vue): void;
}
