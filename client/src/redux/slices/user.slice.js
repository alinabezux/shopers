import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services";

const initialState = {
    userService: [],
    user: {},

    loading: false,
    error: null
};


const getUserById = createAsyncThunk(
    'userSlice/getUserById',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await userService.getUserById(userId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getUserById.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getUserById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

})

const { reducer: userReducer } = userSlice;

const userActions = {
    getUserById
}

export {
    userReducer, userActions
}
