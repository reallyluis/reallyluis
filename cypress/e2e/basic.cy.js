/// <reference types="cypress" />

describe("reallyluis app", () => {
  beforeEach(() => {
    cy.visit(Cypress.env('HOST'));
  });

  it("displays intro title and subtitle", () => {
    cy.get(".intro .section-title").should("have.text", "\nHello, I am Luis\n");
    cy.get(".intro .section-subtitle").should(
      "have.text",
      "full-stack developer"
    );
  });
});
