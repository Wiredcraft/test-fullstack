describe("Logging in...", function() {
    it("Successfully logged in !", function() {

      cy.visit("http://localhost:3000/")  

      cy.get('.brandName').should("contain", "HACKER NEWS")

      cy.get('.loginContainer > :nth-child(2)').click()

      cy.get('.modal > .modal-mask > .modal-wrapper > .modal-container > .modal-header > h3')
      .should("contain", "LOGIN")

      cy.get('.modal > .modal-mask > .modal-wrapper > .modal-container > .modal-body > :nth-child(2)')
      .type("ammadtarar@qq.com")

      cy.get('.modal > .modal-mask > .modal-wrapper > .modal-container > .modal-body > [type="password"]')
      .type("abcd1234")

      cy.get('.modal > .modal-mask > .modal-wrapper > .modal-container > .modal-footer > .buttonsContainer > .black')
      .click()

      cy.get('.username')
      .should("contain" , "Ammad")

      cy.get('.btLogin')
      .click()

      cy.get('.loginContainer > :nth-child(2)')
      .should("contain" , "LOGIN")

    })
  });
