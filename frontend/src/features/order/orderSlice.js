import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../utils/api";

// ========================
// CREATE ORDER
// ========================
export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (order, { rejectWithValue }) => {
        try {
            const { data } = await API.post(
                '/api/v1/new/order',
                order,
                { headers: { 'Content-Type': 'application/json' } }
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Order Creating Failed' }
            );
        }
    }
);

// ========================
// GET USER ORDERS
// ========================
export const getAllMyOrders = createAsyncThunk(
    'order/getAllMyOrders',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get('/api/v1/orders/user');
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Failed to fetch orders' }
            );
        }
    }
);

// ========================
// GET ORDER DETAILS
// ========================
export const getOrderDetails = createAsyncThunk(
    'order/getOrderDetails',
    async (orderID, { rejectWithValue }) => {
        try {
            const { data } = await API.get(`/api/v1/order/${orderID}`);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Failed to fetch order details' }
            );
        }
    }
);

// ========================
// SLICE
// ========================
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        success: false,
        loading: false,
        error: null,
        orders: [],
        order: {}
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder

            // CREATE ORDER
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload.order;
                state.success = action.payload.success;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            // GET USER ORDERS
            .addCase(getAllMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.success = action.payload.success;
            })
            .addCase(getAllMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            // GET ORDER DETAILS
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload.order;
                state.success = action.payload.success;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            });
    }
});

export const { removeErrors, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;