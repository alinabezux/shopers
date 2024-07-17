import { authService } from "../../services/auth.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],

    loading: false,
    logInError: null,
    registerError: null
}

const register = createAsyncThunk(
    'authSlice/register',
    async ({ user }, { rejectWithValue }) => {
        try {
            const { data } = await authService.register(user);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const logIn = createAsyncThunk(
    'authSlice/logIn',
    async ({ user }, { rejectWithValue }) => {
        try {
            const { data } = await authService.login(user);
            console.log(`login slice - ${data}`)
            localStorage.setItem('access', data.accessToken)

            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.users.push(action.payload)
                state.loading = false
                state.registerError = null
            })
            .addCase(register.pending, (state) => {
                state.loading = true
            })
            .addCase(register.rejected, (state, action) => {
                state.registerError = action.payload
                state.loading = false
            })

            .addCase(logIn.fulfilled, (state, action) => {
                state.loading = false
                state.logInError = null
            })
            .addCase(logIn.pending, (state) => {
                state.loading = true
                state.logInError = null
            })
            .addCase(logIn.rejected, (state, action) => {
                state.loading = false
                state.logInError = action.payload
            })
});


const { reducer: authReducer } = authSlice;

const authActions = {
    register, logIn
}

export {
    authReducer, authActions
}