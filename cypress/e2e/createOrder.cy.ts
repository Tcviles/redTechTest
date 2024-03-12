import { OrderTypeEnum } from "../../src/utils/types"
import { goHome, checkHelloUserText, login, verifyPath, createOrder, verifyOrderOnTable, deleteOrder, createDraft, verifyOrderNotOnTable, verifyDraft, localNav } from "./sharedFunctions"

describe('createOrder', () => {
  it('createsNewOrder', () => {
    const userName = 'createOrderTest'
    const customer = 'Pepsi'
    const orderType = OrderTypeEnum.purchaseOrder

    goHome()
    localNav('createOrder')
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
    localNav('createOrder')
    login(userName)
    verifyPath('/create')
    checkHelloUserText(userName)
    createDraft(customer, orderType)
    verifyOrderNotOnTable(customer)
    localNav('createOrder')
    verifyDraft(customer, orderType)
  })
})