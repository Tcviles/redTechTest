import { OrderType, OrderTypeEnum } from "./types"

export const orderList: OrderType[] = [
    {
        orderId: "1",
        orderType: OrderTypeEnum.Standard,
        customerName: "thomas",
        createdDate: "07/20/1990",
        createdByUserName: "thomas"
    },
    {
        orderId: "2",
        orderType: OrderTypeEnum.SaleOrder,
        customerName: "ryker",
        createdDate: "09/26/2018",
        createdByUserName: "thomas"
    },
    {
        orderId: "3",
        orderType: OrderTypeEnum.TransferOrder,
        customerName: "reyden",
        createdDate: "03/22/2021",
        createdByUserName: "thomas"
    }
]