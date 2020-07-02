import expect from "expect";
// import * as ctx from "../../../../quasar.conf.js";

describe("ItemListActions", () => {
	it("Buttons should position correctly on scroll", () => {
		cy.viewport(1920, 1080);
		cy.visit("/news/edit");
		cy.wait("@getPages");
		cy.get("footer").scrollIntoView({ duration: 1000 });
		cy.isInViewport(".mett-item-list-actions");
	});

	it("Buttons should position correctly on scroll on mobile", () => {
		cy.viewport(400, 800);
		cy.visit("/news/edit");
		cy.wait("@getPages");
		cy.get("footer").scrollIntoView({ duration: 1000 });
		cy.isInViewport(".mett-item-list-actions");
	});

	it("Settings button should open settings drawer", () => {
		cy.viewport(1920, 1080);
		cy.visit("/news/edit");
		cy.wait("@getPages");
		cy.get(".mett-item-list-settings-button").trigger("click");
		cy.isInViewport(".mett-action-drawer");
	});

	it("Should add item to list with add button", () => {
		// This will add a news item to the database
		// Todo: Write this test when we can reset the database with seed data
	});
});
