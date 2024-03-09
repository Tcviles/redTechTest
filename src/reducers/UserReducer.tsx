import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: { name: "Guest", pendingOrder: { started: false }},
    reducers: {
        updateUser: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
    }
})

export const{ updateUser } = userSlice.actions
export default userSlice.reducer