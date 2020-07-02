import expect from "expect";

describe("Actions.Content.EditButton", () => {
	it("Should not be visible if logged out", () => {
		cy.clearCookie("access_token");
		cy.viewport(1920, 1080);
		cy.visit("/home");
		cy.get(".mett-content-actions-edit-button").should("not.be.visible");
		cy.viewport(600, 800);
		cy.wait(500);
		cy.get(".mett-mobile-actions-toggle-button").click();
		cy.get(".mett-mobile-actions-edit-button").should("not.be.visible");
	});

	it("Should be visible if logged in", () => {
		cy.viewport(1920, 1080);
		cy.visit("/home");
		cy.wait("@getPages");
		cy.get(".mett-content-actions-edit-button").should("be.visible");
		cy.viewport(600, 800);
		cy.wait(500);
		cy.get(".mett-mobile-actions-toggle-button").click();
		cy.get(".mett-mobile-actions-edit-button").should("be.visible");
	});

	it("Should expand on click", () => {
		cy.viewport(1920, 1080);
		cy.get(".mett-content-actions-edit-button").click();
		cy.get(".mett-save-button").should("be.visible");
		cy.viewport(600, 800);
		cy.wait(500);
		cy.get(".mett-mobile-actions-toggle-button").click();
		cy.get(".mett-save-button").should("be.visible");
	});

	it("Should be expanded if route is /edit on desktop", () => {
		cy.viewport(1920, 1080);
		cy.visit("/home/edit");
		cy.get(".mett-save-button").should("be.visible");
	});

	it("Should be expanded if route is /edit on mobile", () => {
		cy.viewport(600, 800);
		cy.visit("/home/edit");
		cy.get(".mett-save-button").should("be.visible");
	});

	it("Should be collapsed when switching to route not /edit", () => {
		cy.viewport(1920, 1080);
		cy.get(".mett-main-menu a")
			.contains("Home")
			.click({ force: true });
		cy.get(".mett-content-actions-edit-button .mett-save-button").should("not.be.visible");
	});

	it("Should disable save button if no changes made", () => {
		cy.viewport(1920, 1080);
		cy.visit("/home/edit");
		cy.wait("@getPages");
		cy.get(".mett-content-actions-edit-button .mett-save-button")
			.invoke("attr", "disabled")
			.should("eq", "disabled");
	});

	it("Should enable save button if changes made", () => {
		cy.viewport(1920, 1080);
		cy.get(".mett-item-title .mett-title")
			.click()
			.find(".mett-editable")
			.type(
				Math.random()
					.toString(36)
					.substring(0, 1)
			);
		cy.get(".mett-content-actions-edit-button .mett-save-button")
			.invoke("attr", "disabled")
			.should("not.eq", "disabled");
	});

	it("Should disable save button if revert changes made", () => {
		cy.viewport(1920, 1080);
		cy.get(".mett-item-title .mett-title")
			.click()
			.find(".mett-editable")
			.type("{backspace}");
		cy.get(".mett-content-actions-edit-button .mett-save-button")
			.invoke("attr", "disabled")
			.should("eq", "disabled");
	});

	it("Should not have an unsaved class on the reverted item", () => {
		cy.viewport(1920, 1080);
		cy.get(".mett-item-title .mett-title").should("not.have.class", "mett-unsaved");
	});

	it("Should revert unsaved changes when leaving edit mode", () => {
		cy.viewport(1920, 1080);
		cy.get(".mett-item-title .mett-title").then(el => {
			cy.get(".mett-item-title .mett-title")
				.click()
				.find(".mett-editable")
				.type(
					Math.random()
						.toString(36)
						.substring(0, 1)
				);
			cy.wait(500);
			cy.get(".mett-content-actions-edit-button")
				.first()
				.click();
			cy.get(".q-dialog")
				.find("button.bg-negative")
				.click();
			cy.get(".mett-item-title .mett-title").then(newEl => {
				expect(el).toEqual(newEl);
			});
		});
	});

	it("Should maintain state when changing screen <> md", () => {
		cy.viewport(1920, 1080);
		cy.visit("/home/edit");
		cy.wait("@getPages");
		cy.get(".mett-item-title .mett-title")
			.click()
			.find(".mett-editable")
			.type(
				Math.random()
					.toString(36)
					.substring(0, 1)
			);
		cy.get(".mett-save-button")
			.invoke("attr", "disabled")
			.should("not.eq", "disabled");
		cy.viewport(600, 800);
		cy.wait(500);
		cy.get(".mett-mobile-actions-toggle-button").click();
		cy.get(".mett-save-button")
			.invoke("attr", "disabled")
			.should("not.eq", "disabled");
	});

	it("Should have an unsaved class on the changed item", () => {
		cy.viewport(1920, 1080);
		cy.get(".mett-item-title .mett-title.mett-unsaved");
	});
});
