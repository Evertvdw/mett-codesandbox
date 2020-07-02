import { HostDto } from "src/mett/communication/types";

export interface IHostState {
	host: HostDto | null;
	errorThemeLoaded: boolean;
}
