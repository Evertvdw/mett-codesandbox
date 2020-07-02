<template>
	<div>
		<q-card-section class="row items-center">
			<div class="text-h2 text-negative">{{ $t("dialogs.error.title") }} ({{ errors.length }})</div>
			<q-space />
			<q-btn v-close-popup icon="close" class="q-button-close" flat round dense />
		</q-card-section>

		<q-card-section>
			<q-scroll-area style="height: 50vh">
				<q-list>
					<div v-for="(error, index) in errors" :key="index">
						<q-item class="q-px-none q-py-sm">
							<q-item-section>
								<q-item-label>{{ index + 1 }}. {{ error.title }}</q-item-label>
								<q-item-label caption lines="2">{{ error.message }}</q-item-label>
							</q-item-section>

							<q-item-section side top>
								<q-item-label caption>{{ date(error.timestamp, "HH:mm:ss") }}</q-item-label>
								<q-btn
									v-if="error.info && expandedErrors.indexOf(error) == -1"
									dense
									color="secondary"
									flat
									round
									icon="remove_red_eye"
									@click="showMoreInfo(error)"
								>
									<q-tooltip>{{ $t("dialogs.error.moreInfo") }}</q-tooltip>
								</q-btn>
								<q-btn
									v-if="error.info && expandedErrors.indexOf(error) > -1"
									dense
									color="negative"
									flat
									round
									icon="remove_red_eye"
									@click="hideMoreInfo(error)"
								>
									<q-tooltip>{{ $t("dialogs.error.lessInfo") }}</q-tooltip>
								</q-btn>
							</q-item-section>
						</q-item>

						<div v-if="expandedErrors.indexOf(error) > -1">
							<pre
								class="q-mx-md q-px-md text-body2 overflow-auto border-left-negative-2"
								@click="logError(error)"
								>{{ error.info }}</pre
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
export default class ErrorDialog extends Vue {
	@Prop() readonly dialog!: IDialog;

	@Getter("error/errors") errors!: IError[];

	date = formatDate;
	expandedErrors: IError[] = [];

	showMoreInfo(error: IError) {
		this.expandedErrors.push(error);
	}

	hideMoreInfo(error: IError) {
		this.expandedErrors.splice(this.expandedErrors.indexOf(error));
	}

	logError(error: IError) {
		console.log(error.info);
	}
}
</script>
