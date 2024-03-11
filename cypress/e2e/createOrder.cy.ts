import { OrderTypeEnum } from "../../src/utils/types"
import { goHome, checkHelloUserText, login, verifyPath, createOrder, verifyOrderOnTable, deleteOrder, createDraft, verifyOrderNotOnTable, clickCreateOrder, verifyDraft } from "./sharedFunctions"

describe('createOrder', () => {
  it('createsNewOrder', () => {
    const userName = 'createOrderTest'
    const customer = 'Pepsi'
    const orderType = OrderTypeEnum.purchaseOrder

    goHome()
    clickCreateOrder()
    login(userName)
    verifyPath('/create')
    checkHelloUserText(userName)
    createOrder(customer, orderType)
    verifyOrderOnTable(userName, customer, orderType)
    deleteOrder(userName, customer, orderType)
  })

  it('savesADraft', () => {
    const userName = 'saveDraftTest'
    const customer = 'Yuengling'
    const orderType = OrderTypeEnum.transferOrder

    goHome()
    clickCreateOrder()
    login(userName)
    verifyPath('/create')
    checkHelloUserText(userName)
    createDraft(customer, orderType)
    verifyOrderNotOnTable(userName, customer, orderType)
    clickCreateOrder()
    verifyDraft(customer, orderType)
  })
})