export enum FileLocationDto {
  Local = 'Local',
  Azure = 'Azure'
}

export interface FileContainerDto {
  id: number
  location?: string
  fileLocation?: FileLocationDto
  allowedFileExtensions?: string
}

export enum FileTypeDto {
  Unknown = 'Unknown',
  Image = 'Image',
  Document = 'Document',
  Spreadsheet = 'Spreadsheet',
  Presentation = 'Presentation',
  Video = 'Video'
}

export interface FileDto {
  id: number
  guid: string
  fileName?: string
  externalName?: string
  extension?: string
  fileSize: number
  fileType?: FileTypeDto
  fileContainer?: FileContainerDto
  contentType?: string
}

export interface ThemeDto {
  id: number
  name?: string
  path?: string
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface LocalizationCultureDto {
  name?: string
  code?: string
}

export interface SiteRelatedLocalizationCultureDto {
  localizationCulture?: LocalizationCultureDto
  default: boolean
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface SiteDto {
  id: number
  name?: string
  theme?: ThemeDto
  fileContainers?: FileContainerDto[]
  relatedLocalizationCultures?: SiteRelatedLocalizationCultureDto[]
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface HostDto {
  id: number
  siteId: number
  name?: string
  site?: SiteDto
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface AddHostRequest {
  hostName?: string
}

export interface AddHostResponse {
  host?: HostDto
  savedSuccesfully: boolean
}

export interface UpdateHostRequest {
  host?: HostDto
}

export interface UpdateHostResponse {
  host?: HostDto
  savedSuccesfully: boolean
}

export interface AddInstallationResponse {
  addedSuccesfully: boolean
}

export enum SortOnColumnDto {
  Published = 'Published',
  Created = 'Created',
  Updated = 'Updated'
}

export enum SortByActionDto {
  Ascending = 'Ascending',
  Descending = 'Descending'
}

export enum ItemTypeDto {
  Undefined = 'Undefined',
  RootPage = 'RootPage',
  HomePage = 'HomePage',
  CmsPage = 'CmsPage',
  SearchPage = 'SearchPage',
  Settingspage = 'Settingspage',
  Page = 'Page',
  Container = 'Container',
  ElementContainer = 'ElementContainer',
  Element = 'Element',
  CommentContainer = 'CommentContainer',
  Comment = 'Comment',
  CommentElementContainer = 'CommentElementContainer',
  CommentElement = 'CommentElement'
}

export enum ItemValueTypeDto {
  Empty = 'Empty',
  String = 'String',
  DateTime = 'DateTime',
  Double = 'Double'
}

export enum TemplateElementTypeDto {
  ContainerWithList = 'ContainerWithList',
  ContainerWithSingularItem = 'ContainerWithSingularItem',
  ContainerWithFieldset = 'ContainerWithFieldset'
}

export enum TemplateElementDisplayTypeDto {
  Default = 'Default',
  Page = 'Page',
  List = 'List'
}

export interface TemplateElementDto {
  id: number
  name?: string
  view?: string
  recordsPerPage: number
  sortAction?: SortByActionDto
  sortColumn?: SortOnColumnDto
  templateElementType?: TemplateElementTypeDto
  displayType?: TemplateElementDisplayTypeDto
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface TemplateRelatedToTemplateElementDto {
  templateElement?: TemplateElementDto
  sortId: number
  guid: string
  createdOn: Date
  updatedOn: Date
}

export enum TemplateModelElementTypeDto {
  Text = 'Text',
  HtmlContent = 'HtmlContent',
  Files = 'Files',
  File = 'File',
  GoogleMapsCoordinate = 'GoogleMapsCoordinate',
  User = 'User',
  Title = 'Title',
  Container = 'Container'
}

export interface TemplateModelElementDto {
  name?: string
  modelElementType?: TemplateModelElementTypeDto
  displayType?: TemplateElementDisplayTypeDto
  options?: string
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface TemplateModelDto {
  name?: string
  description?: string
  templateModelElements?: TemplateModelElementDto[]
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface TemplateDto {
  id: number
  name?: string
  relatedTemplateElements?: TemplateRelatedToTemplateElementDto[]
  templateModel?: TemplateModelDto
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface MenuItemDto {
  id: number
  name?: string
  urlSegment?: string
  relatedMenuItems?: MenuItemDto[]
  relatedItem?: ItemRelatedToItemDto
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface ItemRelatedToItemDto {
  id: number
  item?: ItemDto
  menuItem?: MenuItemDto
  sortId: number
  childItemCount: number
  sortAction?: SortByActionDto
  sortColumn?: SortOnColumnDto
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface ItemDto {
  id: number
  itemType?: ItemTypeDto
  name?: string
  value?: any
  valueType?: ItemValueTypeDto
  template?: TemplateDto
  templateElement?: TemplateElementDto
  templateModelElement?: TemplateModelElementDto
  relatedItems?: ItemRelatedToItemDto[]
  file?: FileDto
  options?: string
  likeCount: number
  childItemCount: number
  createdById: number
  updatedById: number
  isBeingDeleted: boolean
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface AddItemsRequest {
  filterPageGuid: string
  filterContainerGuid: string
  templateModelId: number
  menuGuid?: string
  parentMenuGuid?: string
}

export interface AddItemsResponse {
  items?: ItemDto[]
  itemsAddedSuccessfully: boolean
}

export interface UpdateItemsRequest {
  filterPageGuid: string
  filterContainerGuid: string
  items?: ItemDto[]
}

export interface UpdateItemsResponse {
  items?: ItemDto[]
  itemsUpdatedSuccessfully: boolean
}

export interface DeleteItemRequest {
  filterPageGuid: string
  filterContainerGuid: string
  guidToDelete: string
}

export interface GetAuth0LoginRequest {
  username?: string
  password?: string
}

export interface LoginDto {
  access_token?: string
}

export interface MenuDto {
  id: number
  name?: string
  description?: string
  path?: string
  menuItems?: MenuItemDto[]
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface PageDto {
  page?: ItemDto
  containers?: ItemDto[]
}

export interface GetPingResponse {
  message?: string
}

export interface SearchResultDto {
  searchResults?: any
  guid: string
  createdOn: Date
  updatedOn: Date
}

export interface GetItemsRequest {
  filterPageGuid: string
  filterContainerGuid: string
  skip: number
  take: number
  sortOnColumn?: SortOnColumnDto
  sortByAction?: SortByActionDto
}

export enum UserSexDto {
  Neutral = 'Neutral',
  Male = 'Male',
  Female = 'Female'
}

export interface UserProfileDto {
  id: number
  sex?: UserSexDto
  firstName?: string
  lastName?: string
  occupation?: string
  birthDay: Date
  avatar?: FileDto
  guid: string
  createdOn: Date
  updatedOn: Date
}

/**
 * Set anti forgery cookie
 * Requires no privileges
 * Route: /api/AntiForgery
 * Method: GET
 */
export type ApiGetAntiForgeryResponse = any

/**
 * Get downloads
 * Requires view:file privileges
 * Route: /api/Downloads
 * Method: GET
 */
export type ApiGetDownloadsResponse = any

/**
 * Get downloads
 * Requires view:file privileges
 * Route: /api/Downloads
 * Method: GET
 */
export interface ApiGetDownloadsRequest {
  fileGuid?: string
  contentDisposition?: string
}

/**
 * Get the file container
 * Requires view privileges
 * Route: /api/FileContainers
 * Method: GET
 */
export type ApiGetFileContainersResponse = FileContainerDto[]

/**
 * Get the files
 * Requires view privileges
 * Route: /api/Files
 * Method: GET
 */
export type ApiGetFilesResponse = FileDto[]

/**
 * Get a file by guid
 * Requires view privileges
 * Route: /api/Files/{uid}
 * Method: GET
 */
export type ApiGetFileByGuidResponse = FileDto

/**
 * Get a file by guid
 * Requires view privileges
 * Route: /api/Files/{uid}
 * Method: GET
 */
export interface ApiGetFileByGuidRequest {}

/**
 * Delete a file by guid
 * Requires delete privileges
 * Route: /api/Files/{uid}
 * Method: DELETE
 */
export type ApiDeleteFileByGuidResponse = boolean

/**
 * Delete a file by guid
 * Requires delete privileges
 * Route: /api/Files/{uid}
 * Method: DELETE
 */
export interface ApiDeleteFileByGuidRequest {}

/**
 * Get the current host
 * Requires public privileges
 * Route: /api/Hosts
 * Method: GET
 */
export type ApiGetHostResponse = HostDto

/**
 * Add new host
 * Requires add privileges
 * Route: /api/Hosts
 * Method: POST
 */
export type ApiAddHostResponse = AddHostResponse

/**
 * Add new host
 * Requires add privileges
 * Route: /api/Hosts
 * Method: POST
 */
export type ApiAddHostRequest = AddHostRequest

/**
 * Get host by name
 * Requires view privileges
 * Route: /api/Hosts/{name}
 * Method: GET
 */
export type ApiGetHostByNameResponse = HostDto

/**
 * Get host by name
 * Requires view privileges
 * Route: /api/Hosts/{name}
 * Method: GET
 */
export interface ApiGetHostByNameRequest {}

/**
 * Update existing host by id
 * Requires update privileges
 * Route: /api/Hosts/{id}
 * Method: PUT
 */
export type ApiUpdateHostByIdResponse = UpdateHostResponse

/**
 * Update existing host by id
 * Requires update privileges
 * Route: /api/Hosts/{id}
 * Method: PUT
 */
export type ApiUpdateHostByIdRequest = UpdateHostRequest

/**
 * Install a new site
 * Requires installation privileges
 * Route: /api/Installation
 * Method: GET
 */
export type ApiAddInstallationResponse = AddInstallationResponse

/**
 * Get items
 * Requires view privileges
 * Route: /api/Items
 * Method: GET
 */
export type ApiGetItemsResponse = ItemDto[]

/**
 * Get items
 * Requires view privileges
 * Route: /api/Items
 * Method: GET
 */
export type ApiGetItemsRequest = GetItemsRequest

/**
 * Add items
 * Requires add privileges
 * Route: /api/Items
 * Method: POST
 */
export type ApiAddItemsResponse = AddItemsResponse

/**
 * Add items
 * Requires add privileges
 * Route: /api/Items
 * Method: POST
 */
export type ApiAddItemsRequest = AddItemsRequest

/**
 * Update items
 * Requires update privileges
 * Route: /api/Items
 * Method: PUT
 */
export type ApiUpdateItemsResponse = UpdateItemsResponse

/**
 * Update items
 * Requires update privileges
 * Route: /api/Items
 * Method: PUT
 */
export type ApiUpdateItemsRequest = UpdateItemsRequest

/**
 * Delete items
 * Requires delete privileges
 * Route: /api/Items
 * Method: DELETE
 */
export type ApiDeleteItemsResponse = boolean

/**
 * Delete items
 * Requires delete privileges
 * Route: /api/Items
 * Method: DELETE
 */
export type ApiDeleteItemsRequest = DeleteItemRequest

/**
 * Login
 * Login route
 * Route: /api/Login/{getLoginRequest}
 * Method: POST
 */
export type ApiPostLoginResponse = LoginDto

/**
 * Login
 * Login route
 * Route: /api/Login/{getLoginRequest}
 * Method: POST
 */
export type ApiPostLoginRequest = GetAuth0LoginRequest

/**
 * Logout
 * Requires no privileges
 * Route: /api/Logout
 * Method: GET
 */
export type ApiLogoutResponse = boolean

/**
 * Get menu for url segment
 * Requires view privileges
 * Route: /api/MenuItems/{getMenuItemRequest}
 * Method: GET
 */
export type ApiGetMenuItemsResponse = MenuItemDto

/**
 * Get menu for url segment
 * Requires view privileges
 * Route: /api/MenuItems/{getMenuItemRequest}
 * Method: GET
 */
export interface ApiGetMenuItemsRequest {
  FilterUrlSegment?: string
  FilterMenuId?: number
  IncludeRelatedMenuItems?: boolean
}

/**
 * Get available menus
 * Requires view privileges
 * Route: /api/Menus
 * Method: GET
 */
export type ApiGetMenusResponse = MenuDto

/**
 * Get pages
 * Requires public privileges
 * Route: /api/Pages
 * Method: GET
 */
export type ApiGetPagesResponse = MenuItemDto[]

/**
 * Get page by query
 * Requires public privileges
 * Route: /api/Pages/{getPageRequest}
 * Method: GET
 */
export type ApiGetPagesByQueryResponse = PageDto

/**
 * Get page by query
 * Requires public privileges
 * Route: /api/Pages/{getPageRequest}
 * Method: GET
 */
export interface ApiGetPagesByQueryRequest {
  FilterPageGuid?: string
  FilterContainerGuid?: string
  LoadComments?: boolean
}

/**
 * Get ping
 * Requires no privileges
 * Route: /api/Ping
 * Method: GET
 */
export type ApiGetPingResponse = GetPingResponse

/**
 * Get items related to an item
 * Requires view privileges
 * Route: /api/RelatedItems
 * Method: GET
 */
export type ApiGetRelatedItemsResponse = ItemRelatedToItemDto[]

/**
 * Get items related to an item
 * Requires view privileges
 * Route: /api/RelatedItems
 * Method: GET
 */
export interface ApiGetRelatedItemsRequest {
  FilterPageGuid?: string
  FilterContainerGuid?: string
  FilterItemGuid?: string
  Skip?: number
  Take?: number
  SortOnColumn?: SortOnColumnDto
  SortByAction?: SortByActionDto
}

/**
 * Get search by query
 * Requires view privileges
 * Route: /api/Search/{getsearchrequest}
 * Method: GET
 */
export type ApiGetSearchByQueryResponse = SearchResultDto[]

/**
 * Get search by query
 * Requires view privileges
 * Route: /api/Search/{getsearchrequest}
 * Method: GET
 */
export interface ApiGetSearchByQueryRequest {
  Index?: string
  Query?: string
  Page?: number
  PageSize?: number
}

/**
 * Add search
 * Requires add privileges
 * Route: /api/Search/{getitemsrequest}
 * Method: POST
 */
export type ApiAddSearchResponse = any

/**
 * Add search
 * Requires add privileges
 * Route: /api/Search/{getitemsrequest}
 * Method: POST
 */
export type ApiAddSearchRequest = GetItemsRequest

/**
 * Delete search
 * Requires delete privileges
 * Route: /api/Search
 * Method: DELETE
 */
export type ApiDeleteSearchResponse = any

/**
 * Get sites
 * Requires view privileges
 * Route: /api/Sites
 * Method: GET
 */
export type ApiGetSitesResponse = SiteDto[]

/**
 * Get sites by guid
 * Requires view privileges
 * Route: /api/Sites/{guid}
 * Method: GET
 */
export type ApiGetSitesByGuidResponse = SiteDto

/**
 * Get sites by guid
 * Requires view privileges
 * Route: /api/Sites/{guid}
 * Method: GET
 */
export interface ApiGetSitesByGuidRequest {
  uid?: string
}

/**
 * Delete sites by guid
 * Requires delete privileges
 * Route: /api/Sites/{guid}
 * Method: DELETE
 */
export type ApiDeleteSitesByGuidResponse = boolean

/**
 * Delete sites by guid
 * Requires delete privileges
 * Route: /api/Sites/{guid}
 * Method: DELETE
 */
export interface ApiDeleteSitesByGuidRequest {
  uid?: string
}

/**
 * Get sites by id
 * Requires view privileges
 * Route: /api/Sites/{id}
 * Method: GET
 */
export type ApiGetSitesByIdResponse = SiteDto

/**
 * Get sites by id
 * Requires view privileges
 * Route: /api/Sites/{id}
 * Method: GET
 */
export interface ApiGetSitesByIdRequest {}

/**
 * Get template elements
 * Requires view privileges
 * Route: /api/TemplateElements
 * Method: GET
 */
export type ApiGetTemplateElementsResponse = TemplateElementDto[]

/**
 * Get templates
 * Requires view privileges
 * Route: /api/Templates
 * Method: GET
 */
export type ApiGetTemplatesResponse = TemplateDto[]

/**
 * Get templates by id
 * Requires view privileges
 * Route: /api/Templates/{id}
 * Method: GET
 */
export type ApiGetTemplatesByIdResponse = TemplateDto

/**
 * Get templates by id
 * Requires view privileges
 * Route: /api/Templates/{id}
 * Method: GET
 */
export interface ApiGetTemplatesByIdRequest {}

/**
 * Get themes
 * Requires view privileges
 * Route: /api/Themes
 * Method: GET
 */
export type ApiGetThemesResponse = ThemeDto[]

/**
 * Get themes by guid
 * Requires view privileges
 * Route: /api/Themes/{guid}
 * Method: GET
 */
export type ApiGetThemesByGuidResponse = ThemeDto

/**
 * Get themes by guid
 * Requires view privileges
 * Route: /api/Themes/{guid}
 * Method: GET
 */
export interface ApiGetThemesByGuidRequest {
  uid?: string
}

/**
 * Get users
 * Requires view privileges
 * Route: /api/UserProfiles
 * Method: GET
 */
export type ApiGetUsersResponse = UserProfileDto[]

/**
 * Get users by query
 * Requires view privileges
 * Route: /api/UserProfiles/{request}
 * Method: GET
 */
export type ApiGetUsersByQueryResponse = UserProfileDto

/**
 * Get users by query
 * Requires view privileges
 * Route: /api/UserProfiles/{request}
 * Method: GET
 */
export interface ApiGetUsersByQueryRequest {
  FilterId?: number
  FilterExternalId?: string
  FilterGuid?: string
  FilterByCurrentAuthenticatedUser?: boolean
}
