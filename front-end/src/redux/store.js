import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import usersSlice from "./users/usersSlice";
import requestsSlice from "./requests/requestsSlice";
import alertSlice from "./alert/alertSlice";
import gameSlice from "./game/gameSlice";

export const store = configureStore({
    reducer: {
        userSlice,
        usersSlice,
        requestsSlice,
        alertSlice,
        gameSlice,
    }
})

