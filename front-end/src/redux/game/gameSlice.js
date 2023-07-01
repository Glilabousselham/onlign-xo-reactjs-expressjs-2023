import { createSlice } from "@reduxjs/toolkit"
import { checkIsGameStartingThunk } from "./gameThunks"

const initialState = {
    gameInfo: null,
    checked: false,
}

const gameSlice = createSlice({
    name: "gameSlice",
    initialState: initialState,

    reducers: {

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

    }

})

export default gameSlice.reducer