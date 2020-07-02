describe("Drawers.MobileMenu", () => {
	it("Should appear on left side", () => {
		cy.visit("/home");
		cy.wait("@getPages");
		cy.get(".mett-mobile-actions-menu-button").click();
		cy.isAtLeftViewport(".mett-mobile-menu-drawer .q-drawer");
	});

	it("Should be 80vw wide", () => {
		cy.viewport(1000, 800);
		cy.get(".mett-mobile-menu-drawer .q-drawer")
			.invoke("outerWidth")
			.should("eq", 800);
	});

	it("Should hide if screen changes > sm", () => {
		cy.viewport(1024, 800);
		cy.get(".mett-mobile-menu-drawer .q-drawer").should("not.be.visible");
	});

	it("Should be hidden if screen changes back to < sm", () => {
		cy.get(".mett-mobile-menu-drawer .q-drawer").should("be.visible");
	});

	it("Should not close when clicking inside the drawer", () => {
		cy.get(".mett-mobile-menu-drawer .q-drawer").click("top");
		cy.get(".mett-mobile-menu-drawer .q-drawer").should("be.visible");
	});

	it("Should close when clicking right of the drawer", () => {
		cy.get(".mett-mobile-menu-drawer .q-drawer__backdrop").click("right", { force: true });
		cy.get(".mett-mobile-menu-drawer .q-drawer").should("not.be.visible");
	});

	it("Should close when swiping left", () => {
		cy.visitMobile("/home");
		cy.get(".mett-mobile-actions-menu-button").click();
		cy.get(".mett-mobile-menu-drawer .q-drawer").should("be.visible");
		cy.get(".mett-mobile-menu-drawer .fullscreen").swipe("right", "left");
		cy.get(".mett-mobile-menu-drawer .q-drawer").should("not.be.visible");
	});

	it("Should not close when swiping right", () => {
		cy.visitMobile("/home");
		cy.get(".mett-mobile-actions-menu-button").click();
		cy.get(".mett-mobile-menu-drawer .q-drawer").should("be.visible");
		cy.get(".mett-mobile-menu-drawer .fullscreen").swipe("left", "right");
		cy.get(".mett-mobile-menu-drawer .q-drawer").should("be.visible");
	});
});
