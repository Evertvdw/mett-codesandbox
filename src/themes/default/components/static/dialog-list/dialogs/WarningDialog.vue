<template>
	<div>
		<q-card-section class="row items-center">
			<div class="text-h2 text-warning">{{ $t("dialogs.warning.title") }} ({{ warnings.length }})</div>
			<q-space />
			<q-btn v-close-popup icon="close" class="q-button-close" flat round dense />
		</q-card-section>

		<q-card-section>
			<q-scroll-area style="height: 50vh">
				<q-list>
					<div v-for="(warning, index) in warnings" :key="index">
						<q-item class="q-px-none q-py-sm">
							<q-item-section>
								<q-item-label>{{ index + 1 }}. {{ warning.title }}</q-item-label>
								<q-item-label caption lines="2">{{ warning.message }}</q-item-label>
							</q-item-section>

							<q-item-section side top>
								<q-item-label caption>{{ date(warning.timestamp, "HH:mm:ss") }}</q-item-label>
								<q-btn
									v-if="warning.info && expandedWarnings.indexOf(warning) == -1"
									dense
									color="secondary"
									flat
									round
									icon="remove_red_eye"
									@click="showMoreInfo(warning)"
								>
									<q-tooltip>{{ $t("dialogs.warning.moreInfo") }}</q-tooltip>
								</q-btn>
								<q-btn
									v-if="warning.info && expandedWarnings.indexOf(warning) > -1"
									dense
									color="warning"
									flat
									round
									icon="remove_red_eye"
									@click="hideMoreInfo(warning)"
								>
									<q-tooltip>{{ $t("dialogs.warning.lessInfo") }}</q-tooltip>
								</q-btn>
							</q-item-section>
						</q-item>
						<div v-if="expandedWarnings.indexOf(warning) > -1">
							<pre
								class="q-mx-md q-px-md text-body2 overflow-auto border-left-warning-2"
								@click="logWarning(warning)"
								>{{ warning.info }}</pre
							>
						</div>
					</div>
				</q-list>
			</q-scroll-area>
		</q-card-section>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IError } from "src/store/error/types";
import { IDialog } from "src/store/dialog/types";
import { Getter } from "src/mett/components/decorators";
import { date } from "quasar";
const { formatDate } = date;

@Component
export default class WarningDialog extends Vue {
	@Prop() readonly dialog!: IDialog;

	@Getter("error/warnings") warnings!: IError[];

	expandedWarnings: IError[] = [];

	date = formatDate;

	showMoreInfo(warning: IError) {
		this.expandedWarnings.push(warning);
	}

	hideMoreInfo(warning: IError) {
		this.expandedWarnings.splice(this.expandedWarnings.indexOf(warning));
	}

	logWarning(warning: IError) {
		console.log(warning.info);
	}
}
</script>
