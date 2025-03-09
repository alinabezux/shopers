import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { promocodeService } from '../../services'

const initialState = {
    promocodes: [],
    selectedPromocode: {},
    loading: false,
    error: null
}

const getAll = createAsyncThunk(
    'promocodeSlice/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await promocodeService.getAll();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const create = createAsyncThunk(
    'promocodeSlice/createType',
    async ({ promocode }, { rejectWithValue }) => {
        try {
            const { data } = await promocodeService.create(promocode);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const deleteById = createAsyncThunk(
    'promocodeSlice/deleteById',
    async ({ promocodeId }, { rejectWithValue }) => {
        try {
            await promocodeService.deleteById(promocodeId)
            return promocodeId
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const promocodeSlice = createSlice({
    name: 'promocodeSlice',
    initialState,
    reducers: {
        setSelectedPromocode: (state, action) => {
            state.selectedPromocode = action.payload
        },
        // clearSelectedType: (state) => {
        //     state.selectedType = {};
        // }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.promocodes = action.payload
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


            .addCase(create.fulfilled, (state, action) => {
                state.promocodes.push(action.payload)
                state.loading = false
                state.error = null
            })
            .addCase(create.pending, (state) => {
                state.loading = true
            })
            .addCase(create.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })


            .addCase(deleteById.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.promocodes = state.promocodes.filter(item => item._id !== deletedId);
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

const { reducer: promocodeReducer, actions: { setSelectedPromocode } } = promocodeSlice;

const promocodeActions = {
    getAll, create, deleteById, setSelectedPromocode
}

export {
    promocodeReducer, promocodeActions
}