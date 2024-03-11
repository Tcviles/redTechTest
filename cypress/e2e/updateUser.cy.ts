import { goHome, checkHelloUserText, login, verifyPath, clickUpdateUser, clickCreateOrder } from "./sharedFunctions"

describe('updateUsername', () => {
  it('updatesUsernameAndRedirectsToHome', () => {
    goHome()
    checkHelloUserText("Guest")
    clickUpdateUser()
    login('testUser')
    verifyPath('/')
    checkHelloUserText("testUser")
  }),

  it('createRedirectsToSigninIfNotLoggedIn', () => {
    goHome()
    checkHelloUserText("Guest")
    clickCreateOrder()
    verifyPath('/signin')
  }),

  it('updatesUsernameAndRedirectsToCreate', () => {
    goHome()
    clickCreateOrder()
    login('testUser2')
    verifyPath('/create')
    checkHelloUserText("testUser2")
  })
})