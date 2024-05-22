import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {typeService} from '../../services'

const initialState = {
    types: [],
    typesByCategory: [],
    // selectedType: {},
    // totalPagesTypes: null,
    // currentPageTypes: 1,
    loading: false,
    error: null
}

const getAll = createAsyncThunk(
    'typeSlice/getTypes',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await typeService.getAll();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getTypesByCategoryId = createAsyncThunk(
    'typeSlice/getTypesByCategoryId',
    async ({categoryId}, {rejectByValue}) => {
        try {
            const {data} = await typeService.getTypesByCategoryId(categoryId);
            return data;
        } catch (e) {
            return rejectByValue(e.response.data)
        }
    }
)


// const createType = createAsyncThunk(
//     'typesSlice/createType',
//     async ({type}, {rejectWithValue}) => {
//         try {
//             const {data} = await typesService.createType(type);
//             return data;
//         } catch (e) {
//             return rejectWithValue(e.response.data)
//         }
//     }
// );
//
// const updateType = createAsyncThunk(
//     'typesSlice/updateType',
//     async ({typeId, type}, {rejectWithValue}) => {
//         try {
//             const {data} = await typesService.updateType(typeId, type);
//             return data
//         } catch (e) {
//             return rejectWithValue(e.response.data)
//         }
//     }
// );
//
// const deleteById = createAsyncThunk(
//     'typesSlice/deleteById',
//     async ({typeId}, {rejectWithValue}) => {
//         try {
//             await typesService.deleteById(typeId)
//         } catch (e) {
//             return rejectWithValue(e.response.data)
//         }
//     }
// );


const typeSlice = createSlice({
    name: 'typeSlice',
    initialState,
    reducers: {
        // setSelectedType: (state, action) => {
        //     state.selectedType = action.payload
        // },
        // setCurrentPageTypes: (state, action) => {
        //     state.currentPageTypes = action.payload
        // },
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.types = action.payload
                // state.totalPagesTypes = action.payload.totalPages
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
    //
    //
    // .addCase(createType.fulfilled, (state, action) => {
    //     state.types.push(action.payload)
    //     state.loading = false
    //     state.error = null
    // })
    // .addCase(createType.pending, (state) => {
    //     state.loading = true
    // })
    // .addCase(createType.rejected, (state, action) => {
    //     state.error = action.payload
    // })
    //
    //
    // .addCase(updateType.fulfilled, (state, action) => {
    //     const findType = state.types.find(value => value._id === action.payload._id);
    //     Object.assign(findType, action.payload)
    //     state.selectedType = {}
    // })
    // .addCase(updateType.pending, (state) => {
    //     state.loading = true
    // })
    // .addCase(updateType.rejected, (state, action) => {
    //     state.error = action.payload
    // })
    //
    //
    // .addCase(deleteById.fulfilled, (state, action) => {
    //     state.loading = false
    //     state.error = null
    // })
    // .addCase(deleteById.pending, (state) => {
    //     state.loading = true
    // })
    // .addCase(deleteById.rejected, (state, action) => {
    //     state.error = action.payload
    // })
});

const {reducer: typeReducer} = typeSlice;

const typeActions = {
    getAll, getTypesByCategoryId
}

export {
    typeReducer, typeActions
}