import axios from "../../helper/axios";
import createThunkHelper from "../../helper/createThunkHelper";

export const sendRequestThunk = createThunkHelper('request/sendRequestThunk', async (receiver) => {
    return (await axios.post("/requests/" + receiver)).data
})
export const getAllRequestsThunk = createThunkHelper('request/getAllRequestsThunk', async () => {
    return (await axios.get("/requests")).data
})
export const deleteSendedRequestThunk = createThunkHelper('request/deleteSendedRequestThunk', async (request) => {
    return (await axios.delete("/requests/sended/" + request)).data
})
export const checkSendedRequestThunk = createThunkHelper('request/checkSendedRequestThunk', async () => {
    return (await axios.get("/requests/check")).data
})
// reject request
export const deleteReceivedRequestThunk = createThunkHelper('request/deleteReceivedRequestThunk', async (request) => {
    return (await axios.delete("/requests/received/" + request)).data
})
// accept request
export const acceptReceivedRequestThunk = createThunkHelper('request/acceptReceivedRequestThunk', async (request) => {
    return (await axios.post("/requests/received/" + request)).data
})