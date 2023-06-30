import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    alert: {
        message: null,
        type: 'primary',
        title: "Alert",
        open: false,
        onHide: null,
    }
}
const alertSlice = createSlice({
    name: "alert",
    initialState: initialState,

    reducers: {
        setAlert: (state, { payload }) => {
            if (!payload.message) {
                payload.message = "something went wrong"
            }
            state.alert = { ...state.alert, open: true, ...payload }
        },
        hideAlert: (state) => {
            state.alert = initialState
        }
    },


})

export default alertSlice.reducer
export const { hideAlert, setAlert } = alertSlice.actions