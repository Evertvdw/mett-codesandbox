import expect from "expect";

describe("Actions.Content", () => {
	it("Should be hidden if screen > sm", () => {
		cy.viewport(1024, 768);
		cy.visit("/home");
		cy.wait("@getPages");
		cy.get(".mett-mobile-actions").should("not.be.visible");
	});

	it("Should be visible if screen < sm", () => {
		cy.viewport(900, 768);
		cy.get(".mett-mobile-actions").should("not.be.visible");
	});

	it("Should be opened on page load initially", () => {
		cy.viewport(900, 768);
		cy.visit("/home");
		cy.wait("@getPages");
		cy.get(".mett-mobile-actions-menu-button").should("be.visible");
	});

	it("Should close when scrolling down", () => {
		cy.viewport(900, 768);
		cy.scrollTo("bottom", { duration: 100 });
		cy.get(".mett-mobile-actions-menu-button").should("not.be.visible");
	});

	it("Should open when scrolling up", () => {
		cy.viewport(900, 768);
		cy.scrollTo("top", { duration: 100 });
		cy.get(".mett-mobile-actions-menu-button").should("be.visible");
	});

	it("Should toggle on click", () => {
		cy.viewport(900, 768);
		cy.get(".mett-mobile-actions-toggle-button").click();
		cy.get(".mett-mobile-actions-menu-button").should("not.be.visible");
		cy.get(".mett-mobile-actions-toggle-button").click();
		cy.get(".mett-mobile-actions-menu-button").should("be.visible");
	});

	it("Should be hidden if screen changes > sm", () => {
		cy.viewport(1024, 768);
		cy.get(".mett-mobile-actions").should("not.be.visible");
	});

	it("Should be visible if screen changes < sm", () => {
		cy.viewport(900, 768);
		cy.get(".mett-mobile-actions").should("be.visible");
		cy.get(".mett-mobile-actions-menu-button").should("be.visible");
	});
});
