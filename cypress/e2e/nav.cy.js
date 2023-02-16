/// <reference types="cypress" />

describe("nav menu", () => {
  before(() => {
    cy.visit("/");
  });

  it("display nav links", () => {
    cy.get("header .nav .list .item:nth-child(1) a").should(
      "contain.text",
      "Home"
    );
    cy.get("header .nav .list .item:nth-child(2) a").should(
      "contain.text",
      "Skills"
    );
    cy.get("header .nav .list .item:nth-child(3) a").should(
      "contain.text",
      "About"
    );
    cy.get("header .nav .list .item:nth-child(4) a").should(
      "contain.text",
      "Work"
    );
    cy.get("header .nav .list .item:nth-child(5) a").should(
      "contain.text",
      "Contact"
    );
  });
});
