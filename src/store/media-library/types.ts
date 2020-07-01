import { FileDto } from 'src/mett/communication/types'

export enum FilterComponents {
  numberRange = 'mett-ml-number-range-filter',
  dateRange = 'mett-ml-date-range-filter',
  checkbox = 'mett-ml-checkbox-filter',
  select = 'mett-ml-select-filter'
}

export interface NumberRangeFilter {
  min: number
  max: number
  setMin: number
  setMax: number
  active: boolean
  component: FilterComponents.numberRange
  title: string
  unit: string
}

export interface DateRangeFilter {
  min: number
  max: number
  setMin: number
  setMax: number
  active: boolean
  component: FilterComponents.dateRange
  title: string
}

export interface SelectFilter {
  active: boolean
  component: FilterComponents.select
  value: string[]
  title: string
  options: string[]
}

export interface CheckboxFilter {
  active: boolean
  value: string[]
  component: FilterComponents.checkbox
  title: string
  options: string[]
}

export interface IFileFilters {
  [key: string]: any
  search: {
    value: string
    fields: string[]
  }
  height: NumberRangeFilter
  width: NumberRangeFilter
  author: SelectFilter
  fileType: CheckboxFilter
  created: DateRangeFilter
  changed: DateRangeFilter
  uploadedBy: SelectFilter
  tags: SelectFilter
}

// Todo: Remove this when everything is included from the backend
export interface CustomFileDto extends FileDto {
  fileEdit: {
    normalizedRotate: number
    clipData: {
      x: number
      height: number
      width: number
      y: number
      rotate: number
    }
    clipThumbnail: string
    clipPath: string
    clipWidth: number
    clipHeight: number
  }
  url: string
  height: number
  width: number
  name: string
  alt: string
  caption: string
  description: string
  author: string
  tags: string[]
}

export interface IMediaLibraryState {
  fileList: CustomFileDto[]
  fileInfoShow: boolean
  fileFilterShow: boolean
  fileSelect: string[]
  fileThumbnailSize: number
  fileSortField: object
  fileSortOptions: object[]
  fileSortDirection: 0 | 1
  fileFilters: IFileFilters
  fileFilterOptions: string[]
  filePreview: CustomFileDto | null
}
