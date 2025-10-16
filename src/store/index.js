import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slices/articlesSlice';
import authReducer from './slices/authSlice';
import chitalishtaReducer from "./slices/chitalishtaSlice"

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer,
    chitalishta: chitalishtaReducer
  }
});