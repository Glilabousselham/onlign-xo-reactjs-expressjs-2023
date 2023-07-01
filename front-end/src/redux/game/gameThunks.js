import axios from "../../helper/axios";
import createThunkHelper from "../../helper/createThunkHelper";

export const checkIsGameStartingThunk = createThunkHelper('gameSlice/check', async () => {
    return (await axios.get("/game/check")).data
})
