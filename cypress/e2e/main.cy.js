describe("SQL Playground", () => {
  it("should run a query and display the results", () => {
    cy.visit("index.html");
    cy.get("#run-button").click();
    cy.get("#results").should("contain", "John Smith");
  });
});
