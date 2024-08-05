import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { typeService } from '../../services'

const initialState = {
    types: [],
    typesByCategory: [],
    selectedType: {},
    loading: false,
    error: null
}

const getAll = createAsyncThunk(
    'typeSlice/getTypes',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await typeService.getAll();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getTypesByCategoryId = createAsyncThunk(
    'typeSlice/getTypesByCategoryId',
    async ({ categoryId }, { rejectByValue }) => {
        try {
            const { data } = await typeService.getTypesByCategoryId(categoryId);
            return data;
        } catch (e) {
            return rejectByValue(e.response.data)
        }
    }
)


const createType = createAsyncThunk(
    'typeSlice/createType',
    async ({ type }, { rejectWithValue }) => {
        try {
            const { data } = await typeService.createType(type);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateType = createAsyncThunk(
    'typeSlice/updateType',
    async ({ typeId, type }, { rejectWithValue }) => {
        try {
            const { data } = await typeService.updateType(typeId, type);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'typeSlice/deleteById',
    async ({ typeId }, { rejectWithValue }) => {
        try {
            await typeService.deleteById(typeId)
            return typeId
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const typeSlice = createSlice({
    name: 'typeSlice',
    initialState,
    reducers: {
        setSelectedType: (state, action) => {
            state.selectedType = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.types = action.payload
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

            .addCase(getTypesByCategoryId.fulfilled, (state, action) => {
                state.typesByCategory = action.payload
                state.loading = false
                state.error = null

            })
            .addCase(getTypesByCategoryId.pending, (state) => {
                state.loading = true
            })
            .addCase(getTypesByCategoryId.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(createType.fulfilled, (state, action) => {
                state.types.push(action.payload)
                state.loading = false
                state.error = null
            })
            .addCase(createType.pending, (state) => {
                state.loading = true
            })
            .addCase(createType.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(updateType.fulfilled, (state, action) => {
                const findType = state.types.find(value => value._id === action.payload._id);
                Object.assign(findType, action.payload)
                state.selectedType = {}

                state.loading = false
            })
            .addCase(updateType.pending, (state) => {
                state.loading = true
            })
            .addCase(updateType.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(deleteById.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.types = state.types.filter(item => item._id !== deletedId);
                state.loading = false
                state.error = null

            })
            .addCase(deleteById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
});

const { reducer: typeReducer, actions: { setSelectedType } } = typeSlice;

const typeActions = {
    getAll, getTypesByCategoryId, setSelectedType, createType, updateType, deleteById
}

export {
    typeReducer, typeActions
}