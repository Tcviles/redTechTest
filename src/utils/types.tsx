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
    Standard = "Standard",
    SaleOrder = "SaleOrder",
    PurchaseOrder = "PurchaseOrder",
    TransferOrder = "TransferOrder",
    ReturnOrder = "ReturnOrder",
}

export type StateType = {
    orders: OrderType[],
    user: UserType
}