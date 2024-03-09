export type OrderType = {
    orderId: string
    orderType: OrderTypeEnum
    customerName: string
    createdDate: string
    createdByUserName: string
}

export type UserType = {
    name: string
    pendingOrder: PendingOrderType
}

export type PendingOrderType = {
    orderId?: string
    orderType?: OrderTypeEnum
    customerName?: string
    createdDate?: string
    createdByUserName?: string
}

export enum OrderTypeEnum {
    standard = "Standard",
    saleOrder = "SaleOrder",
    purchaseOrder = "PurchaseOrder",
    transferOrder = "TransferOrder",
    returnOrder = "ReturnOrder",
}

export type HistoryType = {
    prevRoute: string
}

export type StateType = {
    orders: OrderType[]
    user: UserType
    history: HistoryType
}