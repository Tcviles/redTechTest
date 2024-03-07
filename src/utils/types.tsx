export type OrderType = {
    Id: string,
    Type: OrderTypeEnum,
    CustomerName: string,
    CreatedDate: number,
    CreatedByUsername: string
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