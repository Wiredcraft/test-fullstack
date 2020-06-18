describe("Loading homepage...", function() {
    it("successfully loads !", function() {
      cy.visit("http://localhost:3000/")
      cy.get('.brandName').should("contain", "HACKER NEWS")
    })
})



  