import expect from "expect";

describe("Header", () => {
	it("Should show menu items and shortcuts if screen > sm", () => {
		cy.viewport(1024, 1080);
		cy.visit("/home");
		cy.wait("@getPages");
		cy.get(".mett-main-menu").should("be.visible");
		cy.get(".mett-shortcuts").should("be.visible");
	});

	it("Should hide menu items and shortcuts if screen < sm", () => {
		cy.viewport(1023, 1080);
		cy.get(".mett-main-menu").should("not.be.visible");
		cy.get(".mett-shortcuts").should("not.be.visible");
	});

	it("Should hide when scrolling down", () => {
		cy.viewport(1023, 1080);
		cy.scrollTo("bottom", { duration: 100 });
		cy.get(".mett-header").should("not.be.visible");
	});

	it("Should appear when scrolling up", () => {
		cy.viewport(1023, 1080);
		cy.scrollTo(0, 100, { duration: 100 });
		cy.get(".mett-header").should("be.visible");
	});
});
