import { OrderType, OrderTypeEnum } from "./types"

export const orderList: OrderType[] = [
    {
        Id: "1",
        Type: OrderTypeEnum.Standard,
        CustomerName: "thomas",
        CreatedDate: Date.now(),
        CreatedByUsername: "thomas"
    },
    {
        Id: "2",
        Type: OrderTypeEnum.SaleOrder,
        CustomerName: "ryker",
        CreatedDate: Date.now(),
        CreatedByUsername: "thomas"
    },
    {
        Id: "3",
        Type: OrderTypeEnum.TransferOrder,
        CustomerName: "reyden",
        CreatedDate: Date.now(),
        CreatedByUsername: "thomas"
    }
]