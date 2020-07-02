import expect from "expect";

describe("Drawers.Action", () => {
	it("Should appear on right side", () => {
		cy.viewport(1920, 1080);
		cy.visit("/home");
		cy.wait("@getPages");
		cy.get(".mett-header .mett-shortcut-search").click();
		cy.get(".mett-action-drawer .q-drawer").should("be.visible");
		cy.isAtRightViewport(".mett-action-drawer .q-drawer");
	});

	it("Should have a close button inside", () => {
		cy.viewport(1920, 1080);
		cy.get(".mett-action-drawer .q-drawer")
			.find("button")
			.contains("close");
	});

	it("Should close when clicking the close button", () => {
		cy.viewport(1920, 1080);
		cy.get(".mett-action-drawer .q-drawer")
			.find("button")
			.click();
		cy.get(".mett-action-drawer .q-drawer").should("not.be.visible");
	});

	it("Should not close when clicking left of the drawer", () => {
		cy.viewport(1920, 1080);
		cy.get(".mett-header .mett-shortcut-search").click();
		cy.get(".mett-action-drawer .q-drawer").should("be.visible");
		cy.get(".mett-items-page").click("center");
		cy.get(".mett-action-drawer .q-drawer").should("be.visible");
	});

	it("Should not close when clicking inside of the drawer", () => {
		cy.viewport(1920, 1080);
		cy.get(".mett-action-drawer .q-drawer").click("center");
		cy.get(".mett-action-drawer .q-drawer").should("be.visible");
	});
});
