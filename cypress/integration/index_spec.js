describe("page/index.ts", () => {
  it("should navigate to Error page", () => {
    cy.visit("/");
    cy.url().should("include", "/error");
  });

  it("should appear validation error message", () => {
    cy.visit("/?key=asdguashdasa");

    cy.get("[data-cy=email]").type("test").should("have.value", "test");

    cy.get("[data-cy=warningEmail]").should("be.visible");

    cy.get("[data-cy=email]").type("test@example.com");

    cy.get("[data-cy=warningEmail]").should("have.class", "text-transparent");
  });

  it("should navigate to Error page if key is wrong", () => {
    cy.visit("/?key=asdguashdasa");

    cy.get("[data-cy=email]")
      .type("test@example.com")
      .should("have.value", "test@example.com");

    cy.get("[data-cy=startButton]").should("be.disabled");

    cy.get("[data-cy=password]").type("aaaaaa").should("have.value", "aaaaaa");

    cy.get("[data-cy=startButton]").should("not.be.disabled");

    cy.get("[data-cy=startButton]").click();

    cy.url().should("include", "/error");
  });
});
