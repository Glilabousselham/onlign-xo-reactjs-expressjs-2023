import axios from "../../helper/axios";
import createThunkHelper from "../../helper/createThunkHelper";

export const checkIsGameStartingThunk = createThunkHelper('gameSlice/check', async () => {
    return (await axios.get("/game/check")).data
})
export const setUserReady = createThunkHelper('gameSlice/setUserReady', async () => {
    return (await axios.put("/game/ready")).data
})
export const userPlayThunk = createThunkHelper('gameSlice/userPlayThunk', async (position) => {
    return (await axios.put("/game/user-play", { position })).data
})
export const userLeaveThunk = createThunkHelper('gameSlice/userLeaveThunk', async () => {
    return (await axios.put("/game/user-leave")).data
})
