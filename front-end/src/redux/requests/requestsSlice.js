import { createSlice } from "@reduxjs/toolkit"
import { acceptReceivedRequestThunk, checkSendedRequestThunk, deleteReceivedRequestThunk, deleteSendedRequestThunk, getAllRequestsThunk, sendRequestThunk } from "./requestsThunks"

const initialState = {
    allRequests: null,
    sendedRequest: null
}
const requestsSlice = createSlice({
    name: "requestsSlice",
    initialState: initialState,

    reducers: {
        newRequestReceived: (state, { payload }) => {
            if (!state.allRequests?.find(u => u._id === payload._id)) {
                state.allRequests = [payload, ...state.allRequests]
            }
        },
        newRequestDeleted: (state, { payload }) => {

            if (state.allRequests !== null) {

                state.allRequests = state.allRequests.filter(u => u._id !== payload._id)
            }
        },
        sendedRequestDeleted: (state, { payload }) => {
            state.sendedRequest = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllRequestsThunk.fulfilled, (state, { payload }) => {
            state.allRequests = payload
        })
        builder.addCase(deleteReceivedRequestThunk.fulfilled, (state, { payload }) => {
            if (state.allRequests !== null) {
                state.allRequests = state.allRequests.filter(u => u._id !== payload._id)
            }
        })
        builder.addCase(sendRequestThunk.fulfilled, (state, { payload }) => {
            state.sendedRequest = payload
        })
        builder.addCase(deleteSendedRequestThunk.fulfilled, (state, { payload }) => {
            state.sendedRequest = null
        })
        builder.addCase(checkSendedRequestThunk.fulfilled, (state, { payload }) => {
            state.sendedRequest = payload
        })
        builder.addCase(acceptReceivedRequestThunk.fulfilled, (state, { payload }) => {
            // will return a game information
            if (state.allRequests !== null) {
                state.allRequests = state.allRequests.filter(u => u._id !== payload._id)
            }
        })
    }

})

export default requestsSlice.reducer
export const { newRequestDeleted, newRequestReceived, sendedRequestDeleted } = requestsSlice.actions