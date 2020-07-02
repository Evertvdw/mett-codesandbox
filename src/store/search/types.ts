import { SearchResultDto } from "src/mett/communication/types";

export interface ISearchState {
	results: SearchResultDto[];
	isSearching: boolean;
}
