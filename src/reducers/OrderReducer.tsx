import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderType } from "../utils/types";

const orderSlice = createSlice({
    name: "orders",
    initialState: [] as OrderType[],
    reducers: {
        addOrder: (state, action: PayloadAction<OrderType>) => {
            state.push(action.payload)
        },
        syncOrders: (state, action: PayloadAction<OrderType[]>) => {
            return [...action.payload]
        },
        updateOrder: (state, action: PayloadAction<OrderType>) => {
            const { orderId } = action.payload;
            const index = state.findIndex(order => order.orderId === orderId);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteOrders: (state, action: PayloadAction<string[]>) => {
            const idsToDelete = action.payload;
            idsToDelete.forEach(id => {
                const index = state.findIndex(order => order.orderId === id);
                if (index !== -1) {
                    state.splice(index, 1);
                }
            });
        }
    }
})

export const{ addOrder, syncOrders, updateOrder, deleteOrders } = orderSlice.actions
export default orderSlice.reducer;