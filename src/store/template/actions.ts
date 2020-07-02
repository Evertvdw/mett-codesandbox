import { ActionTree } from "vuex";
import { ITemplateState } from "./types";
import { i18n } from "src/boot/i18n";

import { CallOptionsModel, ResponseStatuses } from "src/mett/communication/load-optimizer/types";
import { TemplateDto, ApiGetTemplatesResponse, ApiGetTemplatesByIdResponse } from "src/mett/communication/types";
import { invalidArgument } from "src/mett/helpers/store-helper";
import { ArgumentType } from "src/mett/helpers/types";

export const actions: ActionTree<ITemplateState, object> = {
	loadTemplates() {
		return new Promise((resolve, reject) => {
			const call: CallOptionsModel = {
				url: "/api/templates",
				storeItem: "template/templates",
				priority: 1,
				serverSide: true
			};

			this.$loadOptimizer.add<ApiGetTemplatesResponse>(call).then(
				() => {
					this.$loadOptimizer.awaitServerCalls().then(() => resolve());
				},
				(reason: any) => {
					this.$loadOptimizer.awaitServerCalls().then(() => reject(reason));
				}
			);
		});
	},

	addTemplateElementsToTemplate({ commit, getters, dispatch }, { templateId }: { templateId: number }) {
		if (
			invalidArgument(dispatch, "template/addTemplateElementsToTemplate", [
				{ value: templateId, type: [ArgumentType.number] }
			])
		) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			const template: TemplateDto = getters["templateById"](templateId);

			if (template && template.relatedTemplateElements && template.relatedTemplateElements.length > 0) {
				resolve();
				return;
			} else if (!template) {
				reject(i18n.t("errors.templateNotFound.description", [templateId]));
				return;
			}

			const call: CallOptionsModel = {
				url: "/api/templates" + "/" + templateId,
				priority: 2,
				serverSide: true
			};

			this.$loadOptimizer.add<ApiGetTemplatesByIdResponse>(call).then(
				response => {
					if (response.status == ResponseStatuses.success && response.data) {
						commit("addTemplateElementsToTemplate", {
							templateId: response.data.id,
							templateElements: response.data.relatedTemplateElements
						});
					}
					this.$loadOptimizer.awaitServerCalls().then(() => resolve());
				},
				(reason: any) => {
					this.$loadOptimizer.awaitServerCalls().then(() => reject(reason));
				}
			);
		});
	}
};
