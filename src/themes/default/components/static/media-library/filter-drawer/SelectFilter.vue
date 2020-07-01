<template>
	<q-list dense class="mett-ml-select-filter">
		<q-item class="mett-ml-filter-title">
			<q-item-section class="text-weight-bold text-primary">{{ filter.title }}</q-item-section>
			<q-item-section v-show="filterActive" side>
				<q-btn flat round dense color="negative" icon="delete" @click="disableFilter()" />
			</q-item-section>
		</q-item>
		<q-item>
			<q-select
				ref="select"
				v-model="selectionModel"
				dense
				outlined
				use-input
				use-chips
				multiple
				input-debounce="0"
				:options="options"
				stack-label
				:hint="$t('ml.filters.selectEmpty')"
				class="mett-ml-select-filter-input"
				@filter="filterFn"
				@add="onAdd"
			>
				<template v-slot:no-option>
					<q-item>
						<q-item-section class="text-grey">
							{{ $t("ml.filters.selectEmpty") }}
						</q-item-section>
					</q-item>
				</template>
			</q-select>
		</q-item>
	</q-list>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action, Ref } from "src/mett/components/decorators";
import { IFileFilters, SelectFilter } from "src/store/media-library/types";
import { Prop } from "vue-property-decorator";
import { QSelect } from "quasar";

@Component
export default class MettMediaLibrarySelectFilter extends Vue {
	@Prop() readonly filter!: SelectFilter;
	@Prop() readonly filterKey!: string;

	@Ref("select") selectEl!: QSelect;

	@Getter("mediaLibrary/fileFilters") fileFilters!: IFileFilters;

	@Action("mediaLibrary/setFileFilter") setFileFilter!: ({
		key,
		value,
		valueKey
	}: {
		key: string;
		value: any;
		valueKey?: string;
	}) => void;

	options: string[] = [];

	get filterActive() {
		return this.fileFilters[this.filterKey].active;
	}

	get filterOptions() {
		return this.fileFilters[this.filterKey].options;
	}

	get selectionModel() {
		return this.fileFilters[this.filterKey].value;
	}

	set selectionModel(val: string[]) {
		this.setFileFilter({ key: this.filterKey, value: val });
		if (val.length) {
			this.setFileFilter({ key: this.filterKey, value: true, valueKey: "active" });
		} else {
			this.setFileFilter({ key: this.filterKey, value: false, valueKey: "active" });
		}
	}

	// When an item gets added, clear the userinput that was used for searching
	onAdd() {
		this.selectEl.updateInputValue("");
	}

	disableFilter() {
		this.setFileFilter({ key: this.filterKey, value: false, valueKey: "active" });
		this.setFileFilter({ key: this.filterKey, value: [] });
	}

	filterFn(val: string, doneFn: (callBackFn: () => void) => void) {
		doneFn(() => {
			const needle = val.toLowerCase();
			this.options = this.filterOptions.filter((v: string) => v.toLowerCase().indexOf(needle) > -1);
		});
	}
}
</script>
