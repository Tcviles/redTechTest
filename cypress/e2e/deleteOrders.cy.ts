import { OrderTypeEnum } from "../../src/utils/types"
import { goHome, checkHelloUserText, login, verifyPath, createOrder, verifyOrderOnTable, deleteOrders, createDraft, verifyOrderNotOnTable, verifyDraft, localNav } from "./sharedFunctions"

describe('deleteOrders', () => {
  it('deletesMultipleOrders', () => {
    const userName = 'deleteOrdersTest'
    const ordersToDelete = [
      {
        userName,
        customer: 'Michael',
        orderType: OrderTypeEnum.purchaseOrder
      },
      {
        userName,
        customer: 'Leonardo',
        orderType: OrderTypeEnum.standard
      },
      {
        userName,
        customer: 'Raphael',
        orderType: OrderTypeEnum.returnOrder
      },
      {
        userName,
        customer: 'Donatello',
        orderType: OrderTypeEnum.saleOrder
      },
    ]

    goHome()
    localNav('updateUser')
    login(userName)

    ordersToDelete.forEach(order => {
      localNav('createOrder')
      verifyPath('/create')
      checkHelloUserText(userName)
      createOrder(order.customer, order.orderType)
      verifyOrderOnTable(userName, order.customer, order.orderType)
    })
    deleteOrders(ordersToDelete)
    cy.wait(500)

    ordersToDelete.forEach(order => {
      verifyOrderNotOnTable(order.customer)
    })
  })
})