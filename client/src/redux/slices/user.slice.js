import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services";

const initialState = {
    users: [],
    currentPageUser: 1,
    totalPagesUser: 0,
    countUser: 0,

    user: {},

    loading: false,
    pswrdLoading: false,
    dataLoading: false,
    error: null,
    pswrdError: null
};

const getAllUsers = createAsyncThunk(
    'userSlice/getAllUsers',
    async (page, { rejectWithValue }) => {
        try {
            const { data } = await userService.getAllUsers(page);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
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

const updateUser = createAsyncThunk(
    'userSlice/updateUser',
    async ({ userId, user }, { rejectWithValue }) => {
        try {
            const { data } = await userService.updateUser(userId, user);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const changePassword = createAsyncThunk(
    'userSlice/changePassword',
    async ({ userId, currentPassword, newPassword }, { rejectWithValue }) => {
        try {
            const { data } = await userService.changePassword(userId, currentPassword, newPassword);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setCurrentPageUsers: (state, action) => {
            state.currentPageUser = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.users
                state.countUser = action.payload.count
                state.currentPageUser = action.payload.currentPage;
                state.totalPagesUser = action.payload.totalPages;

                state.loading = false
                state.error = null

            })
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

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


            .addCase(updateUser.fulfilled, (state, action) => {
                Object.assign(state.user, action.payload)
                state.dataLoading = false
                state.error = null
            })
            .addCase(updateUser.pending, (state) => {
                state.dataLoading = true
                state.error = null
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload
                state.dataLoading = false
            })


            .addCase(changePassword.fulfilled, (state, action) => {
                Object.assign(state.user, action.payload)
                state.pswrdLoading = false
                state.pswrdError = null
            })
            .addCase(changePassword.pending, (state) => {
                state.pswrdLoading = true
                state.pswrdError = null
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.pswrdError = action.payload
                state.pswrdLoading = false
            })

})

const { reducer: userReducer, actions: { setCurrentPageUsers } } = userSlice;

const userActions = {
    getAllUsers, getUserById, updateUser, changePassword, setCurrentPageUsers
}

export {
    userReducer, userActions
}
