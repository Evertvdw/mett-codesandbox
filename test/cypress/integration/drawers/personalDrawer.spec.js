import expect from "expect";

describe("Drawers.Personal", () => {
	it("Should not be visible if logged out", () => {
		cy.clearCookie("access_token");
		cy.viewport(1920, 1080);
		cy.visit("/home");
		cy.wait("@getPages");
		cy.get(".mett-personal-drawer .q-drawer").should("not.be.visible");
		cy.viewport(600, 800);
		cy.wait(500);
		cy.get(".mett-mobile-actions-personal-button, .mett-personal-drawer .q-drawer").should("not.be.visible");
	});

	it("Should be visible if logged in", () => {
		cy.viewport(1920, 1080);
		cy.visit("/home");
		cy.wait("@getPages");
		cy.get(".mett-personal-drawer .q-drawer").should("be.visible");
		cy.viewport(600, 800);
		cy.wait(100);
		cy.get(".mett-mobile-actions-toggle-button").click();
		cy.get(".mett-mobile-actions-personal-button").click();
		cy.get(".mett-personal-drawer .q-drawer").should("be.visible");
	});

	it("Should expand on mouseover on desktop", () => {
		cy.viewport(1920, 1080);
		cy.wait(500);
		cy.get(".mett-personal-drawer .q-drawer--standard").should("not.be.visible");
		cy.get(".mett-personal-drawer .q-drawer").trigger("mouseover");
		cy.get(".mett-personal-drawer .q-drawer--standard").should("be.visible");
	});

	it("Should close on mouseout on desktop", () => {
		cy.viewport(1920, 1080);
		cy.get(".mett-personal-drawer .q-drawer").trigger("mouseout");
		cy.get(".mett-personal-drawer .q-drawer--standard").should("not.be.visible");
	});

	it("Should expand on click on mobile", () => {
		cy.viewport(600, 800);
		cy.get(".mett-mobile-actions-toggle-button").click();
		cy.get(".mett-mobile-actions-personal-button").click();
		cy.get(".mett-personal-drawer .q-drawer--mobile").should("be.visible");
	});

	it("Should close when clicking right on mobile", () => {
		cy.viewport(600, 800);
		cy.get(".mett-personal-drawer .q-drawer__backdrop").click();
		cy.get(".mett-personal-drawer .q-drawer--mobile").should("not.be.visible");
	});
});
