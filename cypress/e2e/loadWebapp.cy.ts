import { goHome } from "./sharedFunctions"

describe('loadsHome', () => {
  it('loadsItems', () => {
    goHome()

    cy.get('[data-cy="red-tech-logo"]')
      .should('exist')

    cy.get('[data-cy="hello-user-txt"]')
      .should('exist')
      .should('have.text', 'Hello Guest')

    cy.get('[data-cy="create-order-btn"]')
      .should('exist')
      .should('include.text', 'Create Order')

    cy.get('[data-cy="delete-selected-btn"]')
      .should('exist')
      .should('include.text', 'Delete Selected')

    cy.get('[data-cy="search-fld"]')
      .should('exist')

    cy.get('[data-cy="type-fltr"]')
      .should('exist')
      .should('include.text', 'All Types')

    cy.get('[data-cy="footer-txt"]')
      .should('exist')
      .should('have.text', 'Thomas Viles')
  })

})