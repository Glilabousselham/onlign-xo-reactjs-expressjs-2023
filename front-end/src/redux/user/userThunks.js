import axios from "../../helper/axios";
import createThunkHelper from "../../helper/createThunkHelper";

export const loginThunk = createThunkHelper('user/login', async (data) => {
    return (await axios.post("/auth/login", data)).data
})
export const getLoggedUserThunk = createThunkHelper('user/getloggeduser', async () => {

    return (await axios.get("/auth/user")).data
})
