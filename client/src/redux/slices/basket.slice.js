import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { basketService } from "../../services";

const initialState = {
    basket: [],

    loading: false,
    error: null
}

const getBasket = createAsyncThunk(
    'basketSlice/getBasket',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await basketService.getBasket(userId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const addToBasket = createAsyncThunk(
    'basketSlice/addToBasket',
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            const { data } = await basketService.addToBasket(userId, productId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteFromBasket = createAsyncThunk(
    'basketSlice/deleteFromBasket',
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            await basketService.deleteFromBasket(userId, productId);
            return productId
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateProductInBasketQuantity = createAsyncThunk(
    'basketSlice/updateProductInBasketQuantity',
    async ({ userId, productId, quantity }, { rejectWithValue }) => {
        try {
            const { data } = await basketService.updateProductInBasketQuantity(userId, productId, quantity);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const basketSlice = createSlice({
    name: 'basketSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getBasket.fulfilled, (state, action) => {
                state.basket = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getBasket.pending, (state) => {
                state.loading = true
            })
            .addCase(getBasket.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(addToBasket.fulfilled, (state, action) => {
                state.basket.push(...action.payload._product)
                state.loading = false
                state.error = null;
            })
            .addCase(addToBasket.pending, (state) => {
                state.loading = true
            })
            .addCase(addToBasket.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(deleteFromBasket.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.basket = state.basket.filter(item => item._id !== deletedId);

                state.loading = false
                state.error = null;
            })
            .addCase(deleteFromBasket.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteFromBasket.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(updateProductInBasketQuantity.fulfilled, (state, action) => {
                const findIndex = state.basket.findIndex(value => value._id === action.payload._id);
                if (findIndex !== -1) {
                    state.basket[findIndex] = { ...state.basket[findIndex], ...action.payload };
                }
                // const findProduct = state.basket.find(value => value._id === action.payload._id);
                // console.log(findProduct);
                // Object.assign(findProduct, action.payload)
            })
            .addCase(updateProductInBasketQuantity.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProductInBasketQuantity.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

});


const { reducer: basketReducer } = basketSlice;

const basketActions = {
    getBasket,
    addToBasket,
    deleteFromBasket,
    updateProductInBasketQuantity
}

export {
    basketReducer, basketActions
}