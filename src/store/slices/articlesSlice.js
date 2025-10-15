import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { articlesService } from '../../services/articlesService';

// Fetch всички статии
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const response = await articlesService.getAll();
    return response.data;
  }
);

// Създаване на нова статия
export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (articleData, { rejectWithValue }) => {
    try {
      const response = await articlesService.create(articleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Търсене на статии
export const searchArticles = createAsyncThunk(
  'articles/searchArticles',
  async (filters) => {
    const response = await articlesService.search(filters);
    return response.data;
  }
);

// Филтриране по шаблон
export const filterByTemplate = createAsyncThunk(
  'articles/filterByTemplate',
  async (template) => {
    const response = await articlesService.getByTemplate(template);
    return response.data;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    filteredItems: [],
    loading: false,
    error: null,
    searchTerm: '',
    currentTemplate: null,
    pagination: {
      currentPage: 0,
      totalPages: 0,
      totalItems: 0
    }
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCurrentTemplate: (state, action) => {
      state.currentTemplate = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.currentTemplate = null;
      state.filteredItems = state.items;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Articles
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Article
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.filteredItems.unshift(action.payload);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Грешка при създаване на статия';
      })
      // Search Articles
      .addCase(searchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredItems = action.payload.content;
        state.pagination = {
          currentPage: action.payload.number,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalElements
        };
      })
      // Filter by Template
      .addCase(filterByTemplate.fulfilled, (state, action) => {
        state.filteredItems = action.payload;
        state.currentTemplate = action.meta.arg;
      });
  }
});

export const { setSearchTerm, setCurrentTemplate, clearFilters, clearError } = articlesSlice.actions;
export default articlesSlice.reducer;