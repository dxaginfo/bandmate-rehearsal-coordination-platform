import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/utils/api';
import { setAuthToken, removeAuthToken } from '@/utils/auth';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

// Async thunks
export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Store token in localStorage
      setAuthToken(token);
      
      return { token, user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk<AuthResponse, RegisterCredentials>(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/register', credentials);
      const { token, user } = response.data;
      
      // Store token in localStorage
      setAuthToken(token);
      
      return { token, user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const checkAuthStatus = createAsyncThunk<User | null>(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_NAME || 'bandmate_token');
      
      if (!token) {
        return null;
      }
      
      // Set token in axios headers
      setAuthToken(token);
      
      // Fetch current user
      const response = await axios.get('/auth/me');
      return response.data;
    } catch (error) {
      // Clear token on error
      removeAuthToken();
      return null;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      removeAuthToken();
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    
    // Register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    
    // Check Auth Status
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuthStatus.fulfilled, (state, action: PayloadAction<User | null>) => {
      state.isLoading = false;
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload;
      } else {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      }
    });
    builder.addCase(checkAuthStatus.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
