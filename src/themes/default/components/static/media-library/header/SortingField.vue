<template>
	<q-select
		v-if="$q.screen.gt.sm"
		v-model="fileSortFieldModel"
		color="secondary"
		outlined
		dense
		:options="fileSortOptions"
		:label="$t('ml.header.sorting')"
		class="mett-ml-sorting-field col"
	>
		<template v-slot:prepend>
			<q-icon
				name="sort"
				:class="{ 'rotate-180': !fileSortDirection }"
				@click.stop="setFileSortDirection(!fileSortDirection)"
			/>
		</template>
		<template v-slot:option="scope">
			<q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
				<q-item-section>
					<q-item-label>{{ scope.opt.label }}</q-item-label>
				</q-item-section>
			</q-item>
		</template>
	</q-select>
	<q-select
		v-else
		v-model="fileSortFieldModel"
		dense
		:options="fileSortOptions"
		hide-selected
		hide-dropdown-icon
		outlined
		class="mett-ml-sorting-field-mobile"
	>
		<template v-slot:before-options>
			<div class="q-pa-md">
				<q-btn
					label="Omdraaien"
					color="secondary"
					@click.stop="setFileSortDirection(!fileSortDirection)"
				></q-btn>
			</div>
		</template>
		<template v-slot:prepend>
			<q-icon
				name="sort"
				:class="{ 'rotate-180': !fileSortDirection }"
				@click.stop="setFileSortDirection(!fileSortDirection)"
			/>
		</template>
	</q-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "src/mett/components/decorators";

@Component
export default class MettMediaLibrarySortingField extends Vue {
	@Getter("mediaLibrary/fileSortField") fileSortField!: string;
	@Getter("mediaLibrary/fileSortOptions") fileSortOptions!: object[];
	@Getter("mediaLibrary/fileSortDirection") fileSortDirection!: object[];

	@Action("mediaLibrary/setFileSortField") setFileSortField!: (val: string) => void;
	@Action("mediaLibrary/setFileSortDirection") setFileSortDirection!: (val: string) => void;

	get fileSortFieldModel() {
		return this.fileSortField;
	}

	set fileSortFieldModel(val: string) {
		this.setFileSortField(val);
	}
}
</script>
