import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { OrderTypeEnum, SavedDraftType } from "../utils/types"

const userSlice = createSlice({
    name: "user",
    initialState: { name: "Guest", savedDraft: { customerName: '', orderType: OrderTypeEnum.standard }},
    reducers: {
        updateUser: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        updateSavedDraft: (state, action: PayloadAction<SavedDraftType>) => {
            state.savedDraft = action.payload
        },
    }
})

export const{ updateUser, updateSavedDraft } = userSlice.actions
export default userSlice.reducer