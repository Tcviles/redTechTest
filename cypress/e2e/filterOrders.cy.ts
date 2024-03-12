import { OrderTypeEnum } from "../../src/utils/types"
import { goHome, checkHelloUserText, login, verifyPath, createOrder, verifyOrderOnTable, deleteOrders, createDraft, verifyOrderNotOnTable, verifyDraft, localNav, updateSearch, updateTypeFilter } from "./sharedFunctions"

describe('filterOrders', () => {
  const userName = 'deleteOrdersTest'
  const ordersToFilter = [
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
  const orderToNotFind = [
    {
      userName,
      customer: 'DO NOT FIND ME',
      orderType: OrderTypeEnum.transferOrder
    }
  ]
  const allOrders = [...ordersToFilter, ...orderToNotFind]

  it('searchesOrders', () => {
    goHome()
    localNav('updateUser')
    login(userName)

    allOrders.forEach(order => {
      localNav('createOrder')
      verifyPath('/create')
      checkHelloUserText(userName)
      createOrder(order.customer, order.orderType)
      verifyOrderOnTable(userName, order.customer, order.orderType)
    })

    ordersToFilter.forEach(order => {
      updateSearch(order.customer)
      verifyOrderOnTable(userName, order.customer, order.orderType)
      verifyOrderNotOnTable(orderToNotFind[0].customer)
    })
  })

  it('filtersOrderTypes', () => {
    goHome()
    localNav('updateUser')
    login(userName)

    ordersToFilter.forEach(order => {
      updateTypeFilter(order.orderType)
      verifyOrderOnTable(userName, order.customer, order.orderType)
      verifyOrderNotOnTable(orderToNotFind[0].customer)
    })

    updateTypeFilter('all-types')

    deleteOrders(allOrders)
    cy.wait(500)

    ordersToFilter.forEach(order => {
      verifyOrderNotOnTable(order.customer)
    })
  })
})