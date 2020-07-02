import expect from "expect";

describe("Actions.Content", () => {
	it("Should be positioned below if screen < lg", () => {
		cy.viewport(1439, 1080);
		cy.visit("/home");
		cy.wait("@getPages");
		cy.isAtBottomViewport(".mett-content-actions");
	});

	it("Should be positioned top if screen > lg", () => {
		cy.viewport(1920, 1080);
		cy.get("footer").scrollIntoView({ duration: 1000 });
		cy.isAtTopViewport(".mett-content-actions");
	});

	it("Should be positioned at the top of the items-page if screen > lg", () => {
		cy.viewport(1920, 1080);
		cy.scrollTo("top", { duration: 1500 });

		cy.get(".mett-items-page").then(page => {
			const pageRect = page[0].getBoundingClientRect();
			cy.get(".mett-content-actions").then(actions => {
				const actionsRect = actions[0].getBoundingClientRect();
				expect(pageRect.top + parseInt(actions[0].style.marginRight)).toBe(actionsRect.top);
			});
		});
	});

	it("Should overlap the page content", () => {
		cy.viewport(1920, 1080);
		cy.wait(100);
		cy.get(".mett-content-actions").should("be.visible");
	});

	it("Should not overlap the action drawer", () => {
		cy.viewport(1920, 1080);
		cy.wait(100);
		cy.get(".mett-shortcut-search")
			.first()
			.trigger("click");
		cy.get(".mett-content-actions").should("not.be.visible");
	});

	it("Should not overlap a dialog", () => {
		cy.viewport(1920, 1080);
		cy.visit("/home");
		cy.wait(["@getPages"]);
		cy.get(".mett-personal-drawer-list .q-item")
			.contains("Media")
			.trigger("click", { force: true });
		cy.get(".mett-content-actions").should("not.be.visible");
	});

	it("Should not be visible if screen < md", () => {
		cy.visit("/home");
		cy.wait("@getPages");
		cy.get(".mett-content-actions").should("not.be.visible");
	});
});
