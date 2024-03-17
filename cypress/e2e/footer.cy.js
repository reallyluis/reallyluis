/// <reference types="cypress" />

describe("nav menu", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("display footer links", () => {
    cy.get("footer .footer-list .item:nth-child(1) a").should(
      "have.text",
      "Home",
    );
    cy.get("footer .footer-list .item:nth-child(2) a").should(
      "have.text",
      "Skills",
    );
    cy.get("footer .footer-list .item:nth-child(3) a").should(
      "have.text",
      "About",
    );
    cy.get("footer .footer-list .item:nth-child(4) a").should(
      "have.text",
      "Work",
    );
    cy.get("footer .footer-list .item:nth-child(5) a").should(
      "have.text",
      "Contact",
    );
    cy.get("footer .footer-list .item.copy").contains("reallyluis");
  });
});
