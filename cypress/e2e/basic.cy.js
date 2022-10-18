/// <reference types="cypress" />

describe("reallyluis app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays intro title and subtitle", () => {
    cy.get(".intro .section-title").should("contains", "Hello, I am Luis");
    cy.get(".intro .section-subtitle").should(
      "have.text",
      "full-stack developer"
    );
  });
});
