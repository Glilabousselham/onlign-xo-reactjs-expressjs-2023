import { createAsyncThunk } from "@reduxjs/toolkit"

const createThunkHelper = function (name, callback) {
    return createAsyncThunk(name, async (data, thunkApi) => {

        try {
            return await callback(data, thunkApi)
        } catch (error) {
            return thunkApi.rejectWithValue(error?.response ? ({
                status: error.response.status,
                data: error.response.data
            }) : null)
        }

    })
}

export default createThunkHelper