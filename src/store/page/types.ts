import { MenuItemDto, PageDto, ItemDto, SortOnColumnDto, SortByActionDto } from "src/mett/communication/types";

export interface IPageState {
	pageMenuItems: MenuItemDto[];
	page: PageDto | null;
	originalValues: IOriginalValues;
	forceReloadIndex: number;
	saving: boolean;
}

export interface IOriginalValues {
	[index: string]: any;
}

export interface ILoadChildItemsRequest {
	item: ItemDto;
	useCache?: boolean;
	serverSide?: boolean;
	skip: number;
	take: number;
	sortOnColumn?: SortOnColumnDto;
	sortByAction?: SortByActionDto;
}
