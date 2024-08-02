import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productsService } from "../../services";

const initialState = {
    products: [],
    selectedProduct: {},
    product: {},

    loading: false,
    error: null
};

const getAll = createAsyncThunk(
    'productSlice/getAll',
    async ({ _category, _type }, { rejectWithValue }) => {
        try {
            const { data } = await productsService.getAll(_category, _type);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getById = createAsyncThunk(
    'productSlice/getById',
    async ({ productId }, { rejectWithValue }) => {
        try {
            const { data } = await productsService.getById(productId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const createProduct = createAsyncThunk(
    'productSlice/createProduct',
    async ({ product }, { rejectWithValue }) => {
        try {
            const { data } = await productsService.createProduct(product);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateProduct = createAsyncThunk(
    'productSlice/updateProduct',
    async ({ productId, product }, { rejectWithValue }) => {
        try {
            const { data } = await productsService.updateProduct(productId, product);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'productsSlice/deleteById',
    async ({ productId }, { rejectWithValue }) => {
        try {
            await productsService.deleteById(productId);
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        }
    },
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

            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload)
                state.loading = false
                state.error = null
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                const findProduct = state.products.find(value => value._id === action.payload._id);
                console.log(action.payload)
                Object.assign(findProduct, action.payload)
                state.selectedProduct = {}
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.payload
            })

            .addCase(deleteById.fulfilled, (state) => {
                state.loading = false
                state.error = null;
            })
            .addCase(deleteById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

})

const { reducer: productReducer, actions: { setSelectedProduct } } = productSlice;

const productActions = {
    getAll, getById, setSelectedProduct, createProduct, updateProduct, deleteById
}

export {
    productReducer, productActions
}
