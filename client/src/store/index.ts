import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bandReducer from './slices/bandSlice';
import rehearsalReducer from './slices/rehearsalSlice';
import setlistReducer from './slices/setlistSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bands: bandReducer,
    rehearsals: rehearsalReducer,
    setlists: setlistReducer,
    users: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
