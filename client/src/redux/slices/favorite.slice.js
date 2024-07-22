import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { favoriteService } from "../../services";

const initialState = {
    favorite: [],

    loading: false,
    error: null
}

const getFavorite = createAsyncThunk(
    'favoriteSlice/getFavorite',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await favoriteService.getFavorite(userId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const addToFavorite = createAsyncThunk(
    'favoriteSlice/addToFavorite',
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            const { data } = await favoriteService.addToFavorite(userId, productId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteFromFavorite = createAsyncThunk(
    'favoriteSlice/deleteFromFavorite',
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            await favoriteService.deleteFromFavorite(userId, productId);
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);




const favoriteSlice = createSlice({
    name: 'favoriteSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getFavorite.fulfilled, (state, action) => {
                state.favorite = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getFavorite.pending, (state) => {
                state.loading = true
            })
            .addCase(getFavorite.rejected, (state, action) => {
                state.error = action.payload
            })


            .addCase(addToFavorite.fulfilled, (state, action) => {
                state.favorite.push(action.payload)
                state.loading = false
                state.error = null;
            })
            .addCase(addToFavorite.pending, (state) => {
                state.loading = true
            })
            .addCase(addToFavorite.rejected, (state, action) => {
                state.error = action.payload
            })


            .addCase(deleteFromFavorite.fulfilled, (state) => {
                state.loading = false
                state.error = null;
            })
            .addCase(deleteFromFavorite.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteFromFavorite.rejected, (state, action) => {
                state.error = action.payload
            })
});


const { reducer: favoriteReducer } = favoriteSlice;

const favoriteActions = {
    getFavorite, addToFavorite, deleteFromFavorite
}

export {
    favoriteReducer, favoriteActions
}