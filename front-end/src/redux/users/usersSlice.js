import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, getLoggedUserThunk, getConnectedUsersThunk } from "./usersThunks"
const initialState = {
    connectedUsers: null,
}
const usersSlice = createSlice({
    name: "usersSlice",
    initialState: initialState,

    reducers: {
        newUserConnected: (state, { payload }) => {
            if (!state.connectedUsers?.find(u => u._id === payload._id)) {
                state.connectedUsers = [payload, ...state.connectedUsers]
            }
        },
        newUserDisconnected: (state, { payload }) => {
            if (state.connectedUsers !== null) {
                state.connectedUsers = state.connectedUsers.filter(u => u._id !== payload._id)
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getConnectedUsersThunk.fulfilled, (state, { payload }) => {
            state.connectedUsers = payload
        })
    }

})

export default usersSlice.reducer
export const { newUserConnected, newUserDisconnected } = usersSlice.actions