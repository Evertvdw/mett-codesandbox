describe("ItemList.ViewSwitch", () => {
	it("Should switch from card to list view", () => {
		cy.visit("/news");
		cy.wait("@getPages");
		cy.get(".mett-item-list").find(".mett-card-view");
		cy.get(".mett-view-switch-button-list").click();
		cy.get(".mett-item-list .mett-list-item").should("not.have.class", "animated");
		cy.get(".mett-item-list").find(".mett-row-view");
	});

	it("Should persist the switch if navigating", () => {
		cy.get(".q-breadcrumbs__el")
			.contains("Home")
			.click();
		cy.wait("@getPages");
		cy.get(".mett-main-menu a")
			.contains("Nieuws")
			.click({ force: true });
		cy.get(".mett-item-list").find(".mett-row-view");
		cy.saveLocalStorage(); // Store personal settings
	});

	it("Should persist the switch if reloading the page", () => {
		cy.restoreLocalStorage();
		cy.visit("/news");
		cy.wait("@getPages");
		cy.get(".mett-item-list").find(".mett-row-view");
	});

	it("Should switch from list to card view", () => {
		cy.get(".mett-item-list").find(".mett-row-view");
		cy.get(".mett-view-switch-button-card").click();
		cy.get(".mett-item-list .mett-list-item").should("not.have.class", "animated");
		cy.get(".mett-item-list").find(".mett-card-view");
	});
});
