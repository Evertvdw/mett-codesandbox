export interface LoadOptimizerOptions {
	SSR?: boolean;
	appConfig?: any;
}

export interface RouterOptions {
	route?: string;
}

export interface WrapperOptions {
	loadOptimizer?: LoadOptimizerOptions;
	router?: RouterOptions | boolean;
	store?: boolean;
	themePark?: boolean;
	data?: any;
	mocks?: any;
	props?: any;
	computed?: any;
	methods?: any;
}
