import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderService } from "../../services/order.service";

const initialState = {
    orders: [],
    userOrders: [],
    selectedOrder: null,

    count: null,
    loading: false,
    loadingOrder: false,
    errorOrder: null,
    error: null
}

const createOrderAuth = createAsyncThunk(
    'orderSlice/createOrderAuth',
    async ({ userId, order }, { rejectWithValue }) => {
        try {
            const { data } = await orderService.createOrderAuth(userId, order);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const createOrder = createAsyncThunk(
    'orderSlice/createOrder',
    async ({ productsInBasket, order }, { rejectWithValue }) => {
        try {
            const { data } = await orderService.createOrder(productsInBasket, order);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getAllOrders = createAsyncThunk(
    'orderSlice/getAllOrders',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await orderService.getAllOrders();
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


const deleteById = createAsyncThunk(
    'orderSlice/deleteById',
    async (orderId, { rejectWithValue }) => {
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
        updateOrderStatus: (state, action) => {
            const { orderId, paymentStatus } = action.payload;

            const index = state.orders.findIndex(order => order._id === orderId);
            if (index !== -1) {
                state.orders[index].paymentStatus = paymentStatus;
            }
        }
    },
    extraReducers: builder =>
        builder
            .addCase(createOrderAuth.fulfilled, (state, action) => {
                state.orders.push(action.payload)
                state.loadingOrder = false
                state.errorOrder = null
            })
            .addCase(createOrderAuth.pending, (state) => {
                state.loadingOrder = true
            })
            .addCase(createOrderAuth.rejected, (state, action) => {
                state.errorOrder = action.payload
                state.loadingOrder = false
            })

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
                state.orders = action.payload.updatedOrders
                state.count = action.payload.count

                state.loading = false
                state.errorOrder = null
            })
            .addCase(getAllOrders.pending, (state) => {
                state.loading= true
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.errorOrder = action.payload
                state.loading = false
            })


            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.userOrders = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getUserOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.errorOrder = action.payload
                state.loading = false
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

const { reducer: orderReducer, actions: { setSelectedOrder, updateOrderStatus } } = orderSlice;

const orderActions = {
    createOrder, createOrderAuth, getAllOrders, setSelectedOrder, getUserOrders, deleteById, updateOrderStatus
}

export { orderReducer, orderActions }