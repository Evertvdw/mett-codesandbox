describe("Dialogs", () => {
	it("Should open a dialog", () => {
		cy.clearCookie("access_token");
		cy.viewport(1920, 1080);
		cy.visit("/home");
		cy.get(".mett-header .mett-shortcut-login")
			.find("button")
			.click();
		cy.get(".q-dialog");
	});

	it("Should not close the dialog if clicking within the dialog", () => {
		cy.get(".text-h2")
			.contains("Inloggen")
			.trigger("mousedown");
		cy.get(".q-dialog");
	});

	it("Should close the dialog if clicking outside the dialog", () => {
		cy.get(".q-dialog__backdrop").trigger("click", 50, 100, { force: true });
		cy.get(".q-dialog").should("not.exist");
	});
});
