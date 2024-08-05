import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryService } from "../../services";

const initialState = {
    categories: [],
    selectedCategory: {},

    loading: false,
    error: null
}

const getAll = createAsyncThunk(
    'categorySlice/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await categoryService.getAll();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const createCategory = createAsyncThunk(
    'categorySlice/createCategory',
    async ({ category }, { rejectWithValue }) => {
        try {
            const { data } = await categoryService.createCategory(category);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateCategory = createAsyncThunk(
    'categorySlice/updateCategory',
    async ({ categoryId, category }, { rejectWithValue }) => {
        try {
            const { data } = await categoryService.updateCategory(categoryId, category);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const uploadPhoto = createAsyncThunk(
    'categoriesSlice/uploadPhoto',
    async ({ categoryId, formData }, { rejectWithValue }) => {
        try {
            const { data } = await categoryService.uploadPhoto(categoryId, formData);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'categorySlice/deleteById',
    async ({ categoryId, imageUrl }, { rejectWithValue }) => {
        try {
            await categoryService.deleteById(categoryId, imageUrl);
            return categoryId;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const categorySlice = createSlice(
    {
        name: 'categorySlice',
        initialState,
        reducers: {
            setSelectedCategory: (state, action) => {
                state.selectedCategory = action.payload
            },
        },
        extraReducers: builder =>
            builder
                .addCase(getAll.fulfilled, (state, action) => {
                    state.categories = action.payload
                    state.loading = false
                    state.error = null
                })
                .addCase(getAll.pending, (state) => {
                    state.loading = true
                })
                .addCase(getAll.rejected, (state, action) => {
                    state.error = action.payload
                })

                .addCase(createCategory.fulfilled, (state, action) => {
                    state.categories.push(action.payload)
                    state.loading = false
                    state.error = null
                })
                .addCase(createCategory.pending, (state) => {
                    state.loading = true
                })
                .addCase(createCategory.rejected, (state, action) => {
                    state.error = action.payload
                })

                .addCase(updateCategory.fulfilled, (state, action) => {
                    const findCategory = state.categories.find(value => value._id === action.payload._id);
                    Object.assign(findCategory, action.payload)
                    state.selectedCategory = {}
                    state.loading = false
                    state.error = null
                })
                .addCase(updateCategory.pending, (state) => {
                    state.loading = true
                    state.error = null
                })
                .addCase(updateCategory.rejected, (state, action) => {
                    state.error = action.payload
                    state.loading = null
                })

                .addCase(uploadPhoto.fulfilled, (state, action) => {
                    const findCategory = state.categories.find(value => value._id === action.payload._id);
                    Object.assign(findCategory, action.payload)
                    state.selectedCategory = {}
                    state.loading = false
                    state.error = false
                })
                .addCase(uploadPhoto.pending, (state) => {
                    state.loading = true
                })
                .addCase(uploadPhoto.rejected, (state, action) => {
                    state.error = action.payload
                })

                .addCase(deleteById.fulfilled, (state, action) => {
                    const deletedId = action.payload;
                    state.categories = state.categories.filter(item => item._id !== deletedId);
                    state.loading = false
                })
                .addCase(deleteById.pending, (state) => {
                    state.loading = true
                    state.error = null
                })
                .addCase(deleteById.rejected, (state, action) => {
                    state.error = action.payload
                    state.loading = false
                })
    }
);

const { reducer: categoryReducer, actions: { setSelectedCategory } } = categorySlice;

const categoryActions = {
    getAll, setSelectedCategory, createCategory, updateCategory, deleteById, uploadPhoto
}

export {
    categoryReducer, categoryActions
}
