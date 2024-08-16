import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services";

const initialState = {
    users: [],
    userId: authService.getUser(),

    loading: false,
    logInError: null,
    registerError: null,
    error: null
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
            localStorage.setItem('access', data.accessToken)
            sessionStorage.setItem('userId', data._user);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const forgotPassword = createAsyncThunk(
    'authSlice/forgotPassword',
    async ({ email }, { rejectWithValue }) => {
        try {
            const { data } = await authService.forgotPassword(email);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const setNewPassword = createAsyncThunk(
    'authSlice/setNewPassword',
    async ({ token, newPassword }, { rejectWithValue }) => {
        try {
            const { data } = await authService.setNewPassword(token, newPassword);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const logOut = createAsyncThunk(
    'authSlice/logOut',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logOut();
            authService.deleteInfo()
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {

    },
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
                state.userId = action.payload._user
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

            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
            })
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(setNewPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(setNewPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setNewPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(logOut.fulfilled, (state) => {
                state.userId = null
                state.loading = false
                state.error = null;
            })
            .addCase(logOut.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logOut.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
});


const { reducer: authReducer } = authSlice;

const authActions = {
    register, logIn, logOut, forgotPassword, setNewPassword
}

export {
    authReducer, authActions
}