import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slices/articlesSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer
  }
});