import axios from "../../helper/axios";
import createThunkHelper from "../../helper/createThunkHelper";

export const getConnectedUsersThunk = createThunkHelper('users/getConnectedUsersThunk', async () => {
    return (await axios.get("/users/connected")).data
})