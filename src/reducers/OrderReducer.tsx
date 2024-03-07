import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { orderList } from "../utils/Data";
import { OrderType } from "../utils/types";

const orderSlice = createSlice({
    name: "orders",
    initialState: orderList,
    reducers: {
        addOrder: (state, action: PayloadAction<OrderType>) => {
            state.push(action.payload)
        },
        updateOrder: (state, action: PayloadAction<OrderType>) => {
            const { Id } = action.payload;
            const index = state.findIndex(order => order.Id === Id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteOrder: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            const index = state.findIndex(order => order.Id === idToDelete);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
})

export const{ addOrder, updateOrder, deleteOrder } = orderSlice.actions
export default orderSlice.reducer;