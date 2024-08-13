import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productsService } from "../../services";

const initialState = {
    products: [],
    selectedProduct: {},
    product: {},
    count: null,
    currentPageProducts: 1,
    totalPagesProducts: null,
    loading: false,
    error: null
};

const getAll = createAsyncThunk(
    'productSlice/getAll',
    async ({ _category, _type, page, isGettingAll }, { rejectWithValue }) => {
        try {
            const { data } = await productsService.getAll(_category, _type, page, isGettingAll);
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

const uploadPhoto = createAsyncThunk(
    'productSlice/uploadPhoto',
    async ({ productId, images }, { rejectWithValue }) => {
        try {
            const { data } = await productsService.uploadPhoto(productId, images);
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
            return productId;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteImage = createAsyncThunk(
    'productsSlice/deleteImage',
    async ({ productId, imageUrl }, { rejectWithValue }) => {
        try {
            await productsService.deleteImage(productId, imageUrl);
            return { productId, imageUrl };
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

            localStorage.setItem('selectedProduct', JSON.stringify(action.payload));
        },
        setCurrentPageProducts: (state, action) => {
            state.currentPageProducts = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.products = action.payload.products
                state.totalPagesProducts = action.payload.totalPages
                state.count = action.payload.count

                state.loading = false
                state.error = null
            })
            .addCase(getAll.pending, (state) => {
                state.loading = true
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
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                const findProduct = state.products.find(value => value._id === action.payload._id);
                Object.assign(findProduct, action.payload)
                state.selectedProduct = {}

                state.loading = false
                state.error = null
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(uploadPhoto.fulfilled, (state, action) => {
                const findProduct = state.products.find(value => value._id === action.payload._id);
                Object.assign(findProduct, action.payload)
                state.selectedProduct = {}

                state.loading = false
                state.error = null
            })
            .addCase(uploadPhoto.pending, (state) => {
                state.loading = true
            })
            .addCase(uploadPhoto.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(deleteById.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.products = state.products.filter(item => item._id !== deletedId);

                state.loading = false
                state.error = null;

            })
            .addCase(deleteById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(deleteImage.fulfilled, (state, action) => {
                const { productId, imageUrl } = action.payload;
                const product = state.products.find(p => p._id === productId);
                if (product) {
                    product.images = product.images.filter(img => img !== imageUrl);
                    state.selectedProduct = { ...product };
                }

                state.loading = false
                state.error = null
            })
            .addCase(deleteImage.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteImage.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

})

const { reducer: productReducer, actions: { setSelectedProduct, setCurrentPageProducts } } = productSlice;

const productActions = {
    getAll, getById, setSelectedProduct, setCurrentPageProducts, createProduct, updateProduct, deleteById, uploadPhoto, deleteImage
}

export {
    productReducer, productActions
}
