import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, getLoggedUserThunk } from "./userThunks"
const initialState = {
    user: null,
    loading: false,
    checked: false
}
const userSlice = createSlice({
    name: "userslice",
    initialState: initialState,

    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
            state.user = payload.user
            window.localStorage.setItem('token', `${payload.token_type} ${payload.token}`);
            state.loading = false
        }).addCase(loginThunk.rejected, (state) => {
            state.loading = false
        }).addCase(loginThunk.pending, (state) => {
            state.loading = true
        })
            // get user
            .addCase(getLoggedUserThunk.fulfilled, (state, { payload }) => {
                state.user = payload
                state.checked = true;
            }).addCase(getLoggedUserThunk.rejected, (state) => {
                state.checked = true;
            })

    }

})

export default userSlice.reducer