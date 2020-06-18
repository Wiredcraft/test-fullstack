describe("Vote for comment ...", function() {
    it("Voted for  comment successfully!", function() {

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
      
      cy.wait(1000)

      cy.get('.card').click()

      cy.get('.modal > .modal-mask > .modal-wrapper > .modal-container > .modal-header > h3')
      .should("contain" , "Add New Comment")
       
      
      const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const testname = `New Comment from Cypress ${id}`

      cy.get('.modal > .modal-mask > .modal-wrapper > .modal-container > .modal-body > input.filedValue')
      .type(testname)

      cy.get('.modal-body > .desc')
      .type("This is a new comment from Cypress automation E2E testing...")

      cy.get('.modal > .modal-mask > .modal-wrapper > .modal-container > .modal-footer > .buttonsContainer > .black')
      .click()
    
      cy.wait(1000)

      cy.get(':nth-child(1) > .commentCard > .title')
      .should("contain" , testname)
      
      cy.get('.notificationContainer > button')
      .click()


      cy.get(':nth-child(1) > .commentCard > .bottom > .btContainer > .btVote')
      .click()
      


      cy.get(':nth-child(1) > .commentCard > .bottom > .btContainer > .btVote')
      .contains("Recind Vote")


      cy.get(':nth-child(1) > .commentCard > .bottom > .btContainer > .btVote')
      .click()

      cy.get(':nth-child(1) > .commentCard > .bottom > .btContainer > .btVote')
      .contains("Vote For This Comment")
      

    })
  });