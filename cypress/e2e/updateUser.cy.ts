import { goHome, checkHelloUserText, login, verifyPath, localNav } from "./sharedFunctions"

describe('updateUsername', () => {
  it('updatesUsernameAndRedirectsToHome', () => {
    goHome()
    checkHelloUserText("Guest")
    localNav('updateUser')
    login('testUser')
    verifyPath('/')
    checkHelloUserText("testUser")
  }),

  it('createRedirectsToSigninIfNotLoggedIn', () => {
    goHome()
    checkHelloUserText("Guest")
    localNav('createOrder')
    verifyPath('/signin')
  }),

  it('updatesUsernameAndRedirectsToCreate', () => {
    goHome()
    localNav('createOrder')
    login('testUser2')
    verifyPath('/create')
    checkHelloUserText("testUser2")
  })
})