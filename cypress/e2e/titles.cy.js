/// <reference types="cypress" />

describe("sections' title and subtitle", () => {
  it("display intro title and subtitle", () => {
    cy.visit("/");

    cy.get(".intro .section-title").contains("Hello");
    cy.get(".intro .section-subtitle").should(
      "have.text",
      "full stack developer",
    );
  });

  it("display services title", () => {
    cy.visit("/skills");

    cy.get(".my-services .section-title").contains("What I do");
  });

  it("display about title and subtitle", () => {
    cy.visit("/about");

    cy.get(".about-me .section-title").contains("Who I am");
    cy.get(".about-me .section-subtitle").should(
      "have.text",
      "Working from a remote location",
    );
  });

  it("display work title and subtitle", () => {
    cy.visit("/work");

    cy.get(".my-work .section-title").contains("My Work");
    cy.get(".my-work .section-subtitle").should(
      "have.text",
      "A selection of my range of work",
    );
  });

  it("display contact title and subtitle", () => {
    cy.visit("/contact");

    cy.get(".contact-me .section-title").contains("Contact Me");
    cy.get(".contact-me .section-subtitle").should("have.text", "get in touch");
  });
});
