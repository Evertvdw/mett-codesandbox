import { Module } from "vuex"
import { actions } from "./actions"
import { IMediaLibraryState, FilterComponents, CustomFileDto } from "./types"
// import { FileDto } from "src/mett/communication/types";
import Vue from "vue"
import { i18n } from "src/boot/i18n"

export function mediaLibrary(): Module<IMediaLibraryState, object> {
	return {
		namespaced: true,

		state: {
			fileList: [],
			fileInfoShow: false,
			fileFilterShow: false,
			fileSelect: [],
			fileThumbnailSize: 1.1,
			fileSortField: { label: "Datum", field: "created" },
			fileSortOptions: [
				{ label: "Naam", field: "name" },
				{ label: "Datum", field: "created" },
				{ label: "Hoogte", field: "height" },
				{ label: "Breedte", field: "width" }
			],
			fileSortDirection: 1, // 0 small first, 1 is large/recent first
			fileFilters: {
				search: {
					value: "",
					fields: ["name", "fileName", "caption", "description"]
				},
				created: {
					active: false,
					min: -Infinity,
					max: Infinity,
					setMin: -Infinity,
					setMax: Infinity,
					title: i18n.t("ml.infoList.created"),
					component: FilterComponents.dateRange
				},
				changed: {
					active: false,
					min: -Infinity,
					max: Infinity,
					setMin: -Infinity,
					setMax: Infinity,
					title: i18n.t("ml.infoList.changed"),
					component: FilterComponents.dateRange
				},
				fileType: {
					active: false,
					value: [],
					component: FilterComponents.checkbox,
					title: i18n.t("ml.infoList.fileType"),
					options: []
				},
				tags: {
					active: false,
					title: i18n.t("ml.infoList.tags"),
					value: [],
					component: FilterComponents.select,
					options: []
				},
				author: {
					active: false,
					title: i18n.t("ml.infoList.author"),
					value: [],
					component: FilterComponents.select,
					options: []
				},
				uploadedBy: {
					active: false,
					title: i18n.t("ml.infoList.uploadedBy"),
					value: [],
					component: FilterComponents.select,
					options: []
				},
				height: {
					min: -Infinity,
					max: Infinity,
					setMin: -Infinity,
					setMax: Infinity,
					active: false,
					component: FilterComponents.numberRange,
					title: i18n.t("ml.infoList.height"),
					unit: "px"
				},
				width: {
					min: -Infinity,
					max: Infinity,
					setMin: -Infinity,
					setMax: Infinity,
					active: false,
					component: FilterComponents.numberRange,
					title: i18n.t("ml.infoList.width"),
					unit: "px"
				},
				fileSize: {
					min: -Infinity,
					max: Infinity,
					setMin: -Infinity,
					setMax: Infinity,
					active: false,
					component: FilterComponents.numberRange,
					title: i18n.t("ml.infoList.fileSize"),
					unit: "kb"
				}
			},
			fileFilterOptions: ["author", "fileType", "tags", "uploadedBy"],
			filePreview: null
		},

		getters: {
			fileList: state => state.fileList,
			fileInfoShow: state => state.fileInfoShow,
			fileFilterShow: state => state.fileFilterShow,
			fileSelect: state => state.fileSelect,
			fileThumbnailSize: state => state.fileThumbnailSize,
			fileSortField: state => state.fileSortField,
			fileSortOptions: state => state.fileSortOptions,
			fileSortDirection: state => state.fileSortDirection,
			fileFilters: state => state.fileFilters,
			activeFilters: state => {
				let count = 0
				for (const filter in state.fileFilters) {
					if (state.fileFilters[filter].active) {
						count++
					}
				}
				return count
			},
			fileFilterOptions: state => state.fileFilterOptions,
			filePreview: state => state.filePreview
		},

		mutations: {
			setFileInfoShow(state, val: boolean) {
				state.fileInfoShow = val
			},

			setFileFilterShow(state, val: boolean) {
				state.fileFilterShow = val
			},

			setFileList(state, val: CustomFileDto[]) {
				state.fileList = val
			},

			clearFileList(state) {
				state.fileList = []
				state.fileSelect = []
				state.filePreview = null
			},

			setFileSelect(state, val: string[]) {
				state.fileSelect = val
			},

			setFileThumbnailSize(state, val: number) {
				state.fileThumbnailSize = val
			},

			setFileSortField(state, val: object) {
				state.fileSortField = val
			},

			setFileSortDirection(state, val: 0 | 1) {
				state.fileSortDirection = val
			},

			setFileFilter(
				state,
				{ key, value, valueKey }: { key: string; value: any; valueKey?: string }
			) {
				state.fileFilters[key][valueKey ? valueKey : "value"] = value
			},

			setFilePreview(state, val: CustomFileDto) {
				state.filePreview = val
			},

			setFileTags(state, val: string[]) {
				if (state.filePreview) state.filePreview.tags = val
			},

			setFileMetaText(
				state,
				{
					val,
					key
				}: {
					val: string
					key:
					| "name"
					| "fileName"
					| "alt"
					| "caption"
					| "description"
					| "author"
				}
			) {
				if (state.filePreview) state.filePreview[key] = val
			},

			setFileEdit(
				state,
				{
					clipData,
					clipThumbnail
				}: {
					clipData: {
						x: number
						y: number
						width: number
						height: number
						rotate: number
						scaleX: number
						scaleY: number
					}
					clipThumbnail: string
				}
			) {
				// Todo: Save the thumbnail as image on some file storage and set the url of that in the data
				if (state.filePreview) {
					delete clipData.scaleX
					delete clipData.scaleY
					// Rotate can be negative, translate that to a positive value
					const normalizedRotate = (clipData.rotate + 360) % 360
					let originalWidth = state.filePreview.width
					let originalHeight = state.filePreview.height
					if (normalizedRotate % 180) {
						// If rotate is 90 or 270, the image is sideways and height <> width should swap
						;[originalWidth, originalHeight] = [originalHeight, originalWidth]
					}
					let insetLeft = Math.max(0, clipData.x)
					let insetRight = originalWidth - (clipData.x + clipData.width)
					let insetTop = Math.max(0, clipData.y)
					let insetBottom = originalHeight - (clipData.y + clipData.height)
					if (normalizedRotate % 180) {
						;[insetLeft, insetRight] = [insetRight, insetLeft]
						;[insetTop, insetBottom] = [insetBottom, insetTop]
					}
					// clip-path: inset(from-top, from-right, from-bottom, from-left)
					const fromTop = (insetTop / originalHeight) * 100
					const fromRight = (insetRight / originalWidth) * 100
					const fromBottom = (insetBottom / originalHeight) * 100
					const fromLeft = (insetLeft / originalWidth) * 100
					const array = [fromTop, fromRight, fromBottom, fromLeft]
					for (let i = 0; i < normalizedRotate; i += 90) {
						array.unshift(array.pop() as number)
					}
					const clipPath = `inset(${array[0]}% ${array[1]}% ${array[2]}% ${
						array[3]
					}%)`
					// Vue set because fileEdit was previously undefined and then just assigning is not reactive
					Vue.set(state.filePreview, "fileEdit", {
						normalizedRotate,
						clipPath,
						clipData,
						clipThumbnail,
						clipWidth: Math.min(
							clipData.x < 0 ? clipData.width + clipData.x : clipData.width,
							originalWidth
						),
						clipHeight: Math.min(
							clipData.y < 0 ? clipData.height + clipData.y : clipData.height,
							originalHeight
						)
					})
				}
			}
		},

		actions
	}
}
