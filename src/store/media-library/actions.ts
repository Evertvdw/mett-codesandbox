import { ActionTree } from "vuex/types";
import { IMediaLibraryState } from "./types";
import { invalidArgument } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";

import { v4 as uuidv4 } from "uuid";

export const actions: ActionTree<IMediaLibraryState, object> = {
	setFileInfoShow({ commit }, val: boolean) {
		commit("setFileInfoShow", val);
	},

	setFileFilterShow({ commit }, val: boolean) {
		commit("setFileFilterShow", val);
	},

	setFileList({ commit }) {
		const metters = ["Rinse", "Rinze", "Tom", "Chris", "Evert", "Jan", "Jeroen", "Jasper"];
		const randomTags = [
			"Awesome",
			"Baas",
			"Mwah",
			"#VindIkleuk",
			"Priem!",
			"#BlackLivesMatter",
			"Npm install",
			"QuasarFtw"
		];
		const images = [
			"demo1-852x305.jpg",
			"demo10-881x255.jpg",
			"demo11-640x318.jpg",
			"demo12-447x579.jpg",
			"demo13-696x756.jpg",
			"demo14-809x1232.jpg",
			"demo15-487x331.jpg",
			"demo16-647x733.jpg",
			"demo17-535x805.jpg",
			"demo18-493x304.jpg",
			"demo19-845x620.jpg",
			"demo2-1236x1057.jpg",
			"demo20-656x688.jpg",
			"demo21-614x1074.jpg",
			"demo22-778x986.jpg",
			"demo23-349x1113.jpg",
			"demo24-791x278.jpg",
			"demo25-821x830.jpg",
			"demo26-749x1094.jpg",
			"demo27-662x600.jpg",
			"demo28-1030x1036.jpg",
			"demo29-967x682.jpg",
			"demo3-492x687.jpg",
			"demo30-637x796.jpg",
			"demo4-836x364.jpg",
			"demo5-432x1162.jpg",
			"demo6-379x278.jpg",
			"demo7-1124x1126.jpg",
			"demo8-1055x971.jpg",
			"demo9-734x971.jpg"
		];
		const data: any[] = [];

		metters.forEach(name => {
			for (let i = 0; i < 125; i++) {
				const url = images[Math.floor(30 * Math.random())];
				const match = url.match(/(?=x)?\d{3,4}/g);
				let width, height;
				if (match && match.length == 2) {
					width = Number(match[0]);
					height = Number(match[1]);
				}
				data.push({
					name: `${name} numero ${i}`,
					fileName: (name + i).toLowerCase() + ".jpg",
					alt: `Sprekend ${name}`,
					caption: `${i} is beter dan ${i - 1}`,
					description: `Kijk ${name} shinen!`,
					fileType: "Image",
					author: `${metters[Math.floor(8 * Math.random())]}`,
					uploadedBy: `${metters[Math.floor(8 * Math.random())]}`,
					guid: uuidv4(),
					fileSize: Math.ceil(1000 * Math.random()),
					height: height,
					width: width,
					url: `demo-images/${url}`,
					tags: randomTags.slice(0, Math.ceil(8 * Math.random())),
					created: Date.now() - Math.ceil(202399397823 * Math.random()),
					changed: Date.now() - Math.ceil(202399397823 * Math.random()),
					link: "#test",
					thumbnail: "test"
				});
			}
			let width = 250 + Math.ceil(1000 * Math.random());
			let height = 250 + Math.ceil(1000 * Math.random());
			let video = Math.round(Math.random()) ? "demo-videos/sample1.mp4" : "demo-videos/sample2.mp4";
			data.push({
				name: `${name} video`,
				fileName: video,
				alt: `Sprekend ${name}`,
				caption: `Wat een leuke video van ${name}`,
				description: `Kijk ${name} shinen!`,
				fileType: "Video",
				author: `${metters[Math.floor(8 * Math.random())]}`,
				uploadedBy: `${metters[Math.floor(8 * Math.random())]}`,
				guid: uuidv4(),
				fileSize: Math.ceil(1000 * Math.random()),
				height: height,
				width: width,
				tags: randomTags.slice(0, Math.ceil(8 * Math.random())),
				created: Date.now() - Math.ceil(20239939782 * Math.random()),
				changed: Date.now() - Math.ceil(20239939782 * Math.random()),
				url: video,
				link: "#test",
				thumbnail: "demo-images/thumbnail-video.png"
			});
			width = 250 + Math.ceil(1000 * Math.random());
			height = 250 + Math.ceil(1000 * Math.random());
			video = Math.round(Math.random())
				? "https://youtube.com/embed/0oqU_YjQVmw"
				: "https://youtube.com/embed/55TudEXOhf4";
			data.push({
				name: `${name} videoURL`,
				fileName: video,
				alt: `Sprekend ${name}`,
				caption: `Wat een leuke video van ${name}`,
				description: `Kijk ${name} shinen!`,
				fileType: "Video",
				author: `${metters[Math.floor(8 * Math.random())]}`,
				uploadedBy: `${metters[Math.floor(8 * Math.random())]}`,
				guid: uuidv4(),
				fileSize: Math.ceil(1000 * Math.random()),
				height: height,
				width: width,
				tags: randomTags.slice(0, Math.ceil(8 * Math.random())),
				created: Date.now() - Math.ceil(20239939782 * Math.random()),
				changed: Date.now() - Math.ceil(20239939782 * Math.random()),
				url: video,
				link: "#test",
				thumbnail: "demo-images/unicorn.jpg"
			});
			const audio = Math.round(Math.random()) ? "demo-audio/example1.mp3" : "demo-audio/example2.mp3";
			data.push({
				name: `${name} audio`,
				fileName: audio,
				alt: `Sprekend ${name}`,
				caption: `Wat een leuk liedje van ${name}`,
				description: `Kijk ${name} shinen!`,
				fileType: "Unknown",
				author: `${metters[Math.floor(8 * Math.random())]}`,
				uploadedBy: `${metters[Math.floor(8 * Math.random())]}`,
				guid: uuidv4(),
				fileSize: Math.ceil(1000 * Math.random()),
				tags: randomTags.slice(0, Math.ceil(8 * Math.random())),
				created: Date.now() - Math.ceil(20239939782 * Math.random()),
				changed: Date.now() - Math.ceil(20239939782 * Math.random()),
				url: audio,
				link: "#test"
			});
		});
		setTimeout(() => {
			commit("setFileList", data);
		}, 300);
	},

	clearFileList({ commit }) {
		commit("clearFileList");
	},

	setFileSelect({ commit }, val: string[]) {
		commit("setFileSelect", val);
	},

	setFileThumbnailSize({ commit }, val: number) {
		commit("setFileThumbnailSize", val);
	},

	setFileSortField({ commit }, val: object) {
		commit("setFileSortField", val);
	},

	setFileSortDirection({ commit }, val: 0 | 1) {
		commit("setFileSortDirection", val);
	},

	setFileFilter({ commit, dispatch }, { key, value, valueKey }: { key: string; value: any; valueKey?: string }) {
		if (
			invalidArgument(dispatch, "mediaLibrary/setFileFilter", [
				{ value: key, type: [ArgumentType.string] },
				{ value: value, type: [ArgumentType.any] },
				{ value: valueKey, type: [ArgumentType.undefined, ArgumentType.string] }
			])
		) {
			return;
		}

		commit("setFileFilter", { key, value, valueKey });
	},

	setFileFilterOptions({ commit, getters }, val: { [key: string]: string[] }) {
		for (const filterKey in val) {
			// If a filter is active don't reduce the amount of options already set on there
			// Otherwise, if you check 1 item from a checkbox list the other items are hidden so selecting multiple becomes impossible
			if (!getters["fileFilters"][filterKey].active)
				commit("setFileFilter", { key: filterKey, value: val[filterKey], valueKey: "options" });
		}
	},

	setSelectedFolder({ commit }, val: "Private" | "Shared" | "All") {
		commit("setSelectedFolder", val);
	},

	setFilePreview({ commit, getters }, val: object) {
		if (!getters["mediaLibrary/fileInfoShow"]) commit("setFileInfoShow", true);
		commit("setFilePreview", val);
	},

	setFileTags({ commit }, val: string[]) {
		commit("setFileTags", val);
	},

	setFileMetaText(
		{ commit },
		{ val, key }: { val: string; key: "name" | "fileName" | "alt" | "caption" | "description" | "author" }
	) {
		commit("setFileMetaText", { val, key });
	},

	setFileEdit({ commit }, val: object) {
		commit("setFileEdit", val);
	}
};
