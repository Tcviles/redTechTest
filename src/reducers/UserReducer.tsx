import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: { Name: "Guest" },
    reducers: {
        updateUser: (state, action: PayloadAction<string>) => {
            state.Name = action.payload
        }
    }
})

export const{ updateUser } = userSlice.actions
export default userSlice.reducer