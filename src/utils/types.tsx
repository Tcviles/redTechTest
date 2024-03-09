export type OrderType = {
    orderId: string
    orderType: OrderTypeEnum
    customerName: string
    createdDate: string
    createdByUserName: string
}

export type UserType = {
    name: string
    savedDraft: SavedDraftType
}

export type SavedDraftType = {
    orderType: OrderTypeEnum
    customerName: string
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