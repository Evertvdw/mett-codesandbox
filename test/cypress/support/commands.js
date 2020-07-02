/* eslint-disable jest/valid-expect */
/* eslint-disable jest/no-standalone-expect */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

// these two commands let you persist local storage between tests
const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
	Object.keys(localStorage).forEach(key => {
		LOCAL_STORAGE_MEMORY[key] = localStorage[key];
	});
});

Cypress.Commands.add("restoreLocalStorage", () => {
	Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
		localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
	});
});

Cypress.Commands.add("isNotInViewport", element => {
	cy.get(element).then($el => {
		const bottom = Cypress.$(cy.state("window")).height();
		const rect = $el[0].getBoundingClientRect();

		expect(rect.top).to.be.greaterThan(bottom);
		expect(rect.bottom).to.be.greaterThan(bottom);
		expect(rect.top).to.be.greaterThan(bottom);
		expect(rect.bottom).to.be.greaterThan(bottom);
	});
});

Cypress.Commands.add("isInViewport", element => {
	cy.get(element).then($el => {
		const bottom = Cypress.$(cy.state("window")).height();
		const rect = $el[0].getBoundingClientRect();

		expect(rect.top).not.to.be.greaterThan(bottom);
		expect(rect.bottom).not.to.be.greaterThan(bottom);
		expect(rect.top).not.to.be.greaterThan(bottom);
		expect(rect.bottom).not.to.be.greaterThan(bottom);
	});
});

Cypress.Commands.add("isAtBottomViewport", element => {
	cy.get(element).then($el => {
		const bottom = Cypress.$(cy.state("window")).height();
		const rect = $el[0].getBoundingClientRect();

		expect(rect.bottom + parseInt($el[0].style.marginBottom)).to.be.equal(bottom);
	});
});

Cypress.Commands.add("isAtTopViewport", element => {
	cy.get(element).then($el => {
		const rect = $el[0].getBoundingClientRect();

		expect(rect.top - parseInt($el[0].style.marginTop)).to.be.equal(0);
	});
});

Cypress.Commands.add("isAtLeftViewport", element => {
	cy.get(element).then($el => {
		const rect = $el[0].getBoundingClientRect();

		let marginLeft = 0;
		if ($el[0].style.marginLeft) marginLeft = parseInt($el[0].style.marginLeft);

		expect(rect.left - marginLeft).to.be.at.most(0);
		expect(rect.right).to.be.greaterThan(0);
	});
});

Cypress.Commands.add("isAtRightViewport", element => {
	cy.get(element).then($el => {
		const width = Cypress.$(cy.state("window")).width();
		const rect = $el[0].getBoundingClientRect();

		let marginRight = 0;
		if ($el[0].style.marginRight) marginRight = parseInt($el[0].style.marginRight);

		expect(rect.right + marginRight).to.be.greaterThan(width);
		expect(rect.left).to.be.lessThan(width);
	});
});

// CHAINABLE QUASAR INPUT FIELD TYPES
// usage:
//
// cy.get('[data-cy=target-element]').quasar('text', '');
//
//
Cypress.Commands.add("testRoute", route => {
	cy.location().should(loc => {
		// eslint-disable-next-line jest/valid-expect, jest/no-standalone-expect
		expect(loc.hash).to.contain(route);
	});
});

Cypress.Commands.add("quasar", { prevSubject: "element" }, (subject, mode, option) => {
	if (mode === "select") {
		cy.wrap(subject)
			.invoke("show")
			.click({ force: true })
			.then(() => {
				cy.get(".q-popover")
					.contains(option)
					.click();
			});
	} else if (mode === "grid") {
		cy.wrap(subject).within(() => {
			cy.get("input").click({ force: true, multiple: true });
		});
	} else if (mode === "tag-list") {
		Object.keys(option).forEach(x => {
			cy.wrap(subject).within(() => {
				cy.get("input")
					.first()
					.type(`${option[x]}{enter}`);
			});
		});
	} else {
		cy.wrap(subject)
			.invoke("show")
			.within(() => {
				// eslint-disable-line
				switch (mode) {
					case "date":
					case "text":
					case "email":
						cy.get("input:first")
							.type(option)
							.should("have.value", option);
						break;
					case "radio":
					case "checkbox":
						cy.contains(option).click();
						break;
					default:
						break;
				}
			});
	}
});

addMatchImageSnapshotCommand();

// Cypress.Commands.add('loadStore', () => {});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
