import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { favouriteService } from "../../services";

const initialState = {
    favourite: [],

    loading: false,
    error: null
}

const getFavourite = createAsyncThunk(
    'favouriteSlice/getFavourite',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await favouriteService.getFavourite(userId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const addToFavourite = createAsyncThunk(
    'favouriteSlice/addToFavourite',
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            const { data } = await favouriteService.addToFavourite(userId, productId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteFromFavourite = createAsyncThunk(
    'favouriteSlice/deleteFromFavourite',
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            await favouriteService.deleteFromFavourite(userId, productId);
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);




const favouriteSlice = createSlice({
    name: 'favouriteSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getFavourite.fulfilled, (state, action) => {
                state.favourite = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getFavourite.pending, (state) => {
                state.loading = true
            })
            .addCase(getFavourite.rejected, (state, action) => {
                state.error = action.payload
            })


            .addCase(addToFavourite.fulfilled, (state, action) => {
                state.favourite.push(action.payload)
                state.loading = false
                state.error = null;
            })
            .addCase(addToFavourite.pending, (state) => {
                state.loading = true
            })
            .addCase(addToFavourite.rejected, (state, action) => {
                state.error = action.payload
            })


            .addCase(deleteFromFavourite.fulfilled, (state) => {
                state.loading = false
                state.error = null;
            })
            .addCase(deleteFromFavourite.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteFromFavourite.rejected, (state, action) => {
                state.error = action.payload
            })
});


const { reducer: favouriteReducer } = favouriteSlice;

const favouriteActions = {
    getFavourite, addToFavourite, deleteFromFavourite
}

export {
    favouriteReducer, favouriteActions
}