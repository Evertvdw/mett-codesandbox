import { Module } from "vuex";
import { actions } from "./actions";
import { ITemplateState } from "./types";

import Vue from "vue";

export function template(): Module<ITemplateState, object> {
	return {
		namespaced: true,

		state: {
			templates: [],
			templateElements: []
		},

		getters: {
			templates: state => state.templates,
			templateById: state => (id: number) => state.templates.find(t => t.id == id),
			templateElements: state => state.templateElements,
			templateElementById: state => (id: number) => state.templateElements.find(e => e.id == id)
		},

		mutations: {
			addTemplateElementsToTemplate(state, { templateId, templateElements }) {
				if (!template) return;

				const targetTemplate = state.templates.find(t => t.id == templateId);
				let targetIndex = -1;

				if (targetTemplate) targetIndex = state.templates.indexOf(targetTemplate);

				if (targetIndex > -1)
					Vue.set(state.templates[targetIndex], "relatedTemplateElements", templateElements);
			}
		},

		actions
	};
}
