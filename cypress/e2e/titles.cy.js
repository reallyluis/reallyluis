/// <reference types="cypress" />

describe("sections' title and subtitle", () => {
  before(() => {
    cy.visit("/");
  });

  it("display intro title and subtitle", () => {
    cy.get(".intro .section-title").contains("Hello");
    cy.get(".intro .section-subtitle").should(
      "have.text",
      "full-stack developer"
    );
  });

  it.skip("display services title", () => {
    cy.get(".my-services .section-title").contains("What I do");
  });

  it.skip("display about title and subtitle", () => {
    cy.get(".about-me .section-title").contains("Who I am");
    cy.get(".about-me .section-subtitle").should(
      "have.text",
      "Working from a remote location"
    );
  });

  it.skip("display work title and subtitle", () => {
    cy.get(".my-work .section-title").contains("My Work");
    cy.get(".my-work .section-subtitle").should(
      "have.text",
      "A selection of my range of work"
    );
  });

  it.skip("display contact title and subtitle", () => {
    cy.get(".contact-me .section-title").contains("Contact Me");
    cy.get(".contact-me .section-subtitle").should("have.text", "get in touch");
  });
});
