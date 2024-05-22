import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {categoryService} from "../../services";

const initialState = {
    categories: [],
    selectedCategory: {},

    loading: false,
    error: null
}

const getAll = createAsyncThunk(
    'categoriesSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await categoryService.getAll();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

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
    }
);

const {reducer: categoryReducer, actions: {setSelectedCategory}} = categorySlice;

const categoryActions = {
    getAll, setSelectedCategory
}

export {
    categoryReducer, categoryActions
}
