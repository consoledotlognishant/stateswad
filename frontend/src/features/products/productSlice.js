import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../utils/api";

// Get Products
export const getProduct = createAsyncThunk(
    'product/getProduct',
    async ({ keyword, page = 1, category }, { rejectWithValue }) => {
        try {
            let link = `/api/v1/products?page=${page}`;

            if (category) link += `&category=${category}`;
            if (keyword) link += `&keyword=${keyword}`;

            const { data } = await API.get(link); // ✅ FIXED
            return data;

        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

// Product Details
export const getProductDetails = createAsyncThunk(
    'product/getProductDetails',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await API.get(`/api/v1/product/${id}`); // ✅ FIXED
            return data;

        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

// Submit Review
export const createReview = createAsyncThunk(
    'product/createReview',
    async ({ rating, comment, productId }, { rejectWithValue }) => {
        try {
            const { data } = await API.put(
                '/api/v1/review',
                { rating, comment, productId },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            ); // ✅ FIXED

            return data;

        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);