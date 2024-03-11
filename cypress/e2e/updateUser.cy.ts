describe('updateUsername', () => {
  it('updatesUsernameAndRedirectsToHome', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-cy="hello-user-txt"]')
      .should('exist')
      .should('have.text', 'Hello Guest')

    cy.get('[data-cy="update-user-btn"]')
      .click()

    const newUsername = 'testUser'

    cy.get('[data-cy="username-fld"]')
      .should('exist')
      .type(newUsername)

    cy.get('[data-cy="user-submit-btn"]').click()

    cy.url().should('eq', 'http://localhost:3000/')

    cy.get('[data-cy="hello-user-txt"]')
      .should('exist')
      .should('have.text', 'Hello testUser')
  }),

  it('redirectsToSigninIfNotLoggedIn', () => {
    cy.visit('localhost:3000/')

    cy.get('[data-cy="hello-user-txt"]')
      .should('exist')
      .should('have.text', 'Hello Guest')

    cy.get('[data-cy="create-order-btn"]')
      .click()

    cy.url().should('eq', 'http://localhost:3000/signin')
  }),

  it('updatesUsernameAndRedirectsToCreate', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-cy="create-order-btn"]')
      .click()

    const newUsername = 'testUser2'

    cy.get('[data-cy="username-fld"]')
      .should('exist')
      .type(newUsername)

    cy.get('[data-cy="user-submit-btn"]').click()

    cy.url().should('eq', 'http://localhost:3000/create')

    cy.get('[data-cy="hello-user-txt"]')
      .should('exist')
      .should('have.text', 'Hello testUser2')
  })

})