import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderService } from "../../services/order.service";

const initialState = {
    orders: [],
    userOrders: [],
    selectedOrder: null,

    currentPageOrders: 1,
    totalPagesOrders: null,
    count: null,

    loadingOrder: false,
    errorOrder: null,
    error: null
}

const createOrder = createAsyncThunk(
    'orderSlice/createOrder',
    async ({ userId, order }, { rejectWithValue }) => {
        try {
            const { data } = await orderService.createOrder(userId, order);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getAllOrders = createAsyncThunk(
    'orderSlice/getAllOrders',
    async (page, { rejectWithValue }) => {
        try {
            const { data } = await orderService.getAllOrders(page);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getUserOrders = createAsyncThunk(
    'orderSlice/getUserOrders',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await orderService.getUserOrders(userId);

            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateOrderStatus = createAsyncThunk(
    'orderSlice/updateOrderStatus',
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const { data } = await orderService.updateOrderStatus(orderId, status);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteById = createAsyncThunk(
    'orderSlice/deleteById',
    async (orderId , { rejectWithValue }) => {
        try {
            await orderService.deleteById(orderId);
            return orderId;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload
        },
        setCurrentPageOrders: (state, action) => {
            state.currentPageOrders = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload)
                state.loadingOrder = false
                state.errorOrder = null
            })
            .addCase(createOrder.pending, (state) => {
                state.loadingOrder = true
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.errorOrder = action.payload
                state.loadingOrder = false
            })


            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.orders = action.payload.orders
                state.totalPagesOrders = action.payload.totalPages
                state.count = action.payload.count

                state.loadingOrder = false
                state.errorOrder = null
            })
            .addCase(getAllOrders.pending, (state) => {
                state.loadingOrder = true
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.errorOrder = action.payload
                state.loadingOrder = false
            })


            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.userOrders = action.payload
                state.loadingOrder = false
                state.error = null
            })
            .addCase(getUserOrders.pending, (state) => {
                state.loadingOrder = true
                state.error = null
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.errorOrder = action.payload
                state.error = false
            })


            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const findOrder = state.orders.find(value => value._id === action.payload._id);
                Object.assign(findOrder, action.payload)
                state.selectedOrder = null
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.loadingOrder = true
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.errorOrder = action.payload
                state.loadingOrder = false
            })


            .addCase(deleteById.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.orders = state.orders.filter(item => item._id !== deletedId);

                state.loadingOrder = false
                state.error = null;

            })
            .addCase(deleteById.pending, (state, action) => {
                state.loadingOrder = true
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.error = action.payload
                state.loadingOrder = false
            })
});

const { reducer: orderReducer, actions: { setSelectedOrder, setCurrentPageOrders } } = orderSlice;

const orderActions = {
    createOrder, getAllOrders, setSelectedOrder, updateOrderStatus, setCurrentPageOrders, getUserOrders, deleteById
}

export { orderReducer, orderActions }