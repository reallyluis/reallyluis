/// <reference types="cypress" />

describe("nav menu", () => {
  before(() => {
    cy.visit("/");
  });

  it("display nav links", () => {
    cy.get("header .nav .list .item:nth-child(1) .link").should(
      "contain.text",
      "Home"
    );
    cy.get("header .nav .list .item:nth-child(2) .link").should(
      "contain.text",
      "Skills"
    );
    cy.get("header .nav .list .item:nth-child(3) .link").should(
      "contain.text",
      "About"
    );
    cy.get("header .nav .list .item:nth-child(4) .link").should(
      "contain.text",
      "Work"
    );
    cy.get("header .nav .list .item:nth-child(5) .link").should(
      "contain.text",
      "Contact"
    );
  });
});
