import { goHome, checkHelloUserText, login, verifyPath } from "./sharedFunctions"

describe('updateUsername', () => {
  it('updatesUsernameAndRedirectsToHome', () => {
    goHome()
    checkHelloUserText("Guest")

    cy.get('[data-cy="update-user-btn"]').click()

    login('testUser')
    verifyPath('/')
    checkHelloUserText("testUser")
  }),

  it('createRedirectsToSigninIfNotLoggedIn', () => {
    goHome()
    checkHelloUserText("Guest")

    cy.get('[data-cy="create-order-btn"]').click()

    verifyPath('/signin')
  }),

  it('updatesUsernameAndRedirectsToCreate', () => {
    goHome()

    cy.get('[data-cy="create-order-btn"]').click()

    login('testUser2')
    verifyPath('/create')
    checkHelloUserText("testUser2")
  })
})