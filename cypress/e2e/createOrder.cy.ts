import { OrderTypeEnum } from "../../src/utils/types"
import { goHome, checkHelloUserText, login, verifyPath, createOrder, verifyOrderOnTable, deleteOrder } from "./sharedFunctions"

describe('createOrder', () => {
  it('createsNewOrder', () => {
    const userName = 'createOrderTest'
    const customer = 'Pepsi'
    const orderType = OrderTypeEnum.purchaseOrder

    goHome()
    cy.get('[data-cy="create-order-btn"]').click()
    login('createOrderTest')
    verifyPath('/create')
    checkHelloUserText("createOrderTest")
    createOrder(customer, orderType)
    verifyOrderOnTable(userName, customer, orderType)
    deleteOrder(userName, customer, orderType)
  })
})