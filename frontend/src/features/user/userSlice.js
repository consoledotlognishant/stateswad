import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../utils/api";

// ========================
// REGISTER
// ========================
export const register = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await API.post(
                '/api/v1/register',
                userData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Registration failed' }
            );
        }
    }
);

// ========================
// LOGIN
// ========================
export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post(
                '/api/v1/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Login failed' }
            );
        }
    }
);

// ========================
// LOAD USER
// ========================
export const loadUser = createAsyncThunk(
    'user/loadUser',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get('/api/v1/profile');
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Failed to load profile' }
            );
        }
    }
);

// ========================
// LOGOUT
// ========================
export const logout = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/api/v1/logout');
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Logout failed' }
            );
        }
    }
);

// ========================
// UPDATE PROFILE
// ========================
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await API.put(
                '/api/v1/profile/update',
                userData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Profile update failed' }
            );
        }
    }
);

// ========================
// UPDATE PASSWORD
// ========================
export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await API.put(
                '/api/v1/password/update',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Password update failed' }
            );
        }
    }
);

// ========================
// FORGOT PASSWORD
// ========================
export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async (email, { rejectWithValue }) => {
        try {
            const { data } = await API.post(
                '/api/v1/password/forgot',
                email,
                { headers: { 'Content-Type': 'application/json' } }
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Email sending failed' }
            );
        }
    }
);

// ========================
// RESET PASSWORD
// ========================
export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async ({ token, userData }, { rejectWithValue }) => {
        try {
            const { data } = await API.post(
                `/api/v1/reset/${token}`,
                userData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Reset failed' }
            );
        }
    }
);

// ========================
// SLICE
// ========================
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user'))
            : null,
        loading: false,
        error: null,
        success: false,
        isAuthenticated:
            localStorage.getItem('isAuthenticated') === 'true',
        message: null,
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder

            // REGISTER
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.user = action.payload.user;
                state.isAuthenticated = true;

                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('isAuthenticated', 'true');
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            // LOGIN
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.user = action.payload.user;
                state.isAuthenticated = true;

                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('isAuthenticated', 'true');
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            // LOAD USER
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;

                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('isAuthenticated', 'true');
            })
            .addCase(loadUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;

                localStorage.removeItem('user');
                localStorage.removeItem('isAuthenticated');
            })

            // LOGOUT
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;

                localStorage.removeItem('user');
                localStorage.removeItem('isAuthenticated');
            })

            // UPDATE PROFILE
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.success = true;

                localStorage.setItem('user', JSON.stringify(state.user));
            })

            // UPDATE PASSWORD
            .addCase(updatePassword.fulfilled, (state) => {
                state.success = true;
            })

            // FORGOT PASSWORD
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.success = true;
                state.message = action.payload.message;
            })

            // RESET PASSWORD
            .addCase(resetPassword.fulfilled, (state) => {
                state.success = true;
            });
    },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;