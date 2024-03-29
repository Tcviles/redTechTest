import { OrderTypeEnum } from "../../src/utils/types"
import { goHome, checkHelloUserText, login, verifyPath, updateOrder, createOrder, verifyOrderOnTable, deleteOrder, localNav } from "./sharedFunctions"

describe('updateOrder', () => {
  it('createsOrderForUpdate', () => {
    const userName = 'updateOrderTest'
    const customer = 'Coke'
    const addToCustomer = 'Cola'
    const newCustomer = `${customer}${addToCustomer}`
    const orderType = OrderTypeEnum.returnOrder
    const orderType2 = OrderTypeEnum.saleOrder

    goHome()
    localNav('updateUser')
    login(userName)
    verifyPath(`/`)
    checkHelloUserText(userName)
    localNav('createOrder')
    createOrder(customer, orderType)
    verifyOrderOnTable(userName, customer, orderType)
    cy.get('tbody')
      .contains('tr', customer)
      .should('contain', userName)
      .should('contain', orderType)
      .find(`[data-cy^='update-btn']`)
      .click()

    updateOrder(addToCustomer, orderType2)
    verifyOrderOnTable(userName, newCustomer, orderType2)
    deleteOrder(userName, newCustomer, orderType2)
  })
})