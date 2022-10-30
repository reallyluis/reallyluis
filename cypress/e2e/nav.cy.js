/// <reference types="cypress" />

describe("nav menu", () => {
  before(() => {
    cy.visit("/");
  });

  it("display nav links", () => {
    cy.get("header .nav .list .item:nth-child(1) .link").should(
      "have.text",
      "Home"
    );
    cy.get("header .nav .list .item:nth-child(2) .link").should(
      "have.text",
      "Skills"
    );
    cy.get("header .nav .list .item:nth-child(3) .link").should(
      "have.text",
      "About"
    );
    cy.get("header .nav .list .item:nth-child(4) .link").should(
      "have.text",
      "Work"
    );
    cy.get("header .nav .list .item:nth-child(5) .link").should(
      "have.text",
      "Contact"
    );
  });
});
