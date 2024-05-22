import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {productsService} from "../../services";

const initialState = {
    products: [],
    product: {},

    loading: false,
    error: null
};

const getAll = createAsyncThunk(
    'productSlice/getAll',
    async ({_category, _type}, {rejectWithValue}) => {
        try {
            const {data} = await productsService.getAll(_category, _type);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'productSlice/getById',
    async ({productId}, {rejectWithValue}) => {
        try {
            const {data} = await productsService.getById(productId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getAll.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(getById.fulfilled, (state, action) => {
                state.product = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getById.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

})

const {reducer: productReducer} = productSlice;

const productActions = {
    getAll, getById
}

export {
    productReducer, productActions
}
