describe("Registring new user...", function() {
    it("Successfully registered new user !", function() {

    cy.visit("http://localhost:3000/")  

    cy.get('.brandName').should("contain", "HACKER NEWS")
     

    cy.get('.loginContainer > :nth-child(4)').click()

      cy.get('.modal > .modal-mask > .modal-wrapper > .modal-container > .modal-header > h3')
      .should("contain", "REGISTER")
       
      const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const email = `cypress_user_${id}@qq.com`;
    const name = `Cypress User # ${id}`;

    cy.get('.modal > .modal-mask > .modal-wrapper > .modal-container > .modal-body > :nth-child(2)')
    .type(name)

    cy.get('.modal > .modal-mask > .modal-wrapper > .modal-container > .modal-body > :nth-child(4)')
      .type(email)

      cy.get('.modal-body > :nth-child(6)')
      .type("abcd1234")

      cy.get('.modal-body > :nth-child(8)')
      .type("abcd1234")

      cy.get('.modal > .modal-mask > .modal-wrapper > .modal-container > .modal-footer > .buttonsContainer > .black')
      .click()
      
      cy.get('.message')
      .should("contain" , "Registration Successful")


    

    })
  });