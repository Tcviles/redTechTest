export type OrderType = {
    orderId: string,
    orderType: OrderTypeEnum,
    customerName: string,
    createdDate: string,
    createdByUserName: string
}

export type UserType = {
    Name: string,
}

export enum OrderTypeEnum {
    standard = "Standard",
    saleOrder = "SaleOrder",
    purchaseOrder = "PurchaseOrder",
    transferOrder = "TransferOrder",
    returnOrder = "ReturnOrder",
}

export type StateType = {
    orders: OrderType[],
    user: UserType
}