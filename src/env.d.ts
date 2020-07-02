declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "production" | "development";
		APP_ENV: "production" | "development" | "local";
		API: string;
		LOG_URL_SSR: string;
		LOG_URL_CLIENT: string;
		PORT: string;
		VUE_ROUTER_MODE: "hash" | "history" | "abstract" | undefined;
		VUE_ROUTER_BASE: string | undefined;
	}
}
