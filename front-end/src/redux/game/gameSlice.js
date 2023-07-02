import { createSlice } from "@reduxjs/toolkit"
import { checkIsGameStartingThunk, setUserReady, userLeaveThunk, userPlayThunk } from "./gameThunks"

const initialState = {
    gameInfo: null,
    checked: false,
}

const gameSlice = createSlice({
    name: "gameSlice",
    initialState: initialState,

    reducers: {
        setGameInfo: (state, { payload }) => {
            state.gameInfo = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkIsGameStartingThunk.fulfilled, (state, { payload }) => {
                state.checked = true
                state.gameInfo = payload
            })
            .addCase(checkIsGameStartingThunk.pending, (state, { payload }) => {
                state.checked = true

            })

        builder
            .addCase(setUserReady.fulfilled, (state, { payload }) => {
                state.gameInfo = payload
            })

        builder
            .addCase(userPlayThunk.fulfilled, (state, { payload }) => {
                state.gameInfo = payload
            })
        builder
            .addCase(userLeaveThunk.fulfilled, (state, { payload }) => {
            })


    }

})

export default gameSlice.reducer


export const { setGameInfo } = gameSlice.actions