/// <reference types="cypress" />

describe("sections' content", () => {
  it("display services content", () => {
    cy.visit("/skills");

    cy.get(".my-services .services .service:nth-child(1)").contains(
      "applications these days",
    );
    cy.get(".my-services .services .service:nth-child(2)").contains(
      "More recently I have worked",
    );
    cy.get(".my-services .services .service:nth-child(3)").contains(
      "based data storage",
    );
  });

  it("display about content", () => {
    cy.visit("/about");

    cy.get(".about-me > div > p:nth-child(1)").contains(
      "I have worked in several",
    );
    cy.get(".about-me > div > p:nth-child(2)").contains("looking forward to");
  });

  it("display work content", () => {
    cy.visit("/work");

    cy.get(".my-work .portfolio > .item:nth-child(1) .title").should(
      "have.text",
      "Fundraising",
    );
    cy.get(".my-work .portfolio > .item:nth-child(4) .title").should(
      "have.text",
      "Telecommunications",
    );
  });

  it("display contact content", () => {
    cy.visit("/contact");

    cy.get("#contact label:nth-child(2) span").should("have.text", "Email");
  });
});
