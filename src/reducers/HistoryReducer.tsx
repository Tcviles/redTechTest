import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "history",
    initialState: { prevRoute: '/' },
    reducers: {
        setHistory: (state, action: PayloadAction<string>) => {
            state.prevRoute= action.payload
        },
    }
})

export const{ setHistory } = userSlice.actions
export default userSlice.reducer