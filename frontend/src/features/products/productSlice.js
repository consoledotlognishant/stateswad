import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api'; // ✅ IMPORTANT CHANGE

// ================= GET PRODUCTS =================
export const getProduct = createAsyncThunk(
    'product/getProduct',
    async ({ keyword = '', page = 1, category }, { rejectWithValue }) => {
        try {
            let link = `/api/v1/products?page=${page}`;

            if (category) {
                link += `&category=${category}`;
            }

            if (keyword) {
                link += `&keyword=${keyword}`;
            }

            const { data } = await API.get(link); // ✅ USE API INSTANCE

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'An error occurred'
            );
        }
    }
);

// ================= PRODUCT DETAILS =================
export const getProductDetails = createAsyncThunk(
    'product/getProductDetails',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await API.get(`/api/v1/product/${id}`); // ✅ FIXED
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'An error occurred'
            );
        }
    }
);

// ================= CREATE REVIEW =================
export const createReview = createAsyncThunk(
    'product/createReview',
    async ({ rating, comment, productId }, { rejectWithValue }) => {
        try {
            const { data } = await API.put(
                '/api/v1/review',
                { rating, comment, productId },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'An error occurred'
            );
        }
    }
);

// ================= SLICE =================
const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productCount: 0,
        loading: false,
        error: null,
        product: null,
        resultsPerPage: 4,
        totalPages: 0,
        reviewSuccess: false,
        reviewLoading: false,
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.reviewSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // ===== GET PRODUCTS =====
            .addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products || [];
                state.productCount = action.payload.productCount || 0;
                state.resultsPerPage = action.payload.resultsPerPage || 0;
                state.totalPages = action.payload.totalPages || 0;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.products = [];
            })

            // ===== PRODUCT DETAILS =====
            .addCase(getProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.product || null;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ===== CREATE REVIEW =====
            .addCase(createReview.pending, (state) => {
                state.reviewLoading = true;
                state.error = null;
            })
            .addCase(createReview.fulfilled, (state) => {
                state.reviewLoading = false;
                state.reviewSuccess = true;
            })
            .addCase(createReview.rejected, (state, action) => {
                state.reviewLoading = false;
                state.error = action.payload;
            });
    },
});

export const { removeErrors, removeSuccess } = productSlice.actions;
export default productSlice.reducer;