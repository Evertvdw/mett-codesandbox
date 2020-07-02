// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "cy-mobile-commands";

const resizeObserverLoopErrRe = /^ResizeObserver loop limit exceeded/;
const resizeObserverLoopErrUn = /^ResizeObserver loop completed with undelivered notifications/;

Cypress.on("uncaught:exception", err => {
	if (resizeObserverLoopErrRe.test(err.message) || resizeObserverLoopErrUn.test(err.message)) {
		// returning false here prevents Cypress from
		// failing the test
		return false;
	}
});

if (Cypress.config().baseUrl == "http://localhost:8000") {
	Cypress.env("loginUrl", "http://localhost:60375/api/login");
} else {
	Cypress.env("loginUrl", "https://api.mett.nl/api/login");
}

beforeEach(() => {
	if (Cypress.env("access_token")) {
		cy.setCookie("access_token", Cypress.env("access_token"));
		cy.setCookie("Mett.JWT.Payload", Cypress.env("Mett.JWT.Payload"));
		cy.setCookie("Mett.JWT.Signature", Cypress.env("Mett.JWT.Signature"));
	} else {
		cy.request({ failOnStatusCode: false, url: Cypress.env("loginUrl"), method: "GET" })
			.its("body.access_token")
			.then(access_token => {
				Cypress.env("access_token", access_token);
				cy.getCookie("Mett.JWT.Payload").then(cookie => {
					Cypress.env("Mett.JWT.Payload", cookie.value);
				});
				cy.getCookie("Mett.JWT.Signature").then(cookie => {
					Cypress.env("Mett.JWT.Signature", cookie.value);
				});
				cy.setCookie("access_token", access_token);
			});
	}
	cy.server();
	cy.route({
		method: "POST",
		url: "/log",
		response: "Success"
	});
	cy.route("/api/pages/*").as("getPages");
	cy.route({
		url: "/api/logout",
		method: "GET",
		response: true
	}).as("logout");
	cy.route({
		method: "POST",
		url: "/api/login/*",
		response: {
			redirect: "/api/login"
		}
	});
});
