import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchAllChitalishta = createAsyncThunk(
  'chitalishta/fetchAll',
  async ({ page = 0, size = 12, sortBy = 'name', sortDirection = 'asc' } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/chitalishta', {
        params: { page, size, sortBy, sortDirection }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при зареждане на читалищата'
      );
    }
  }
);

export const fetchChitalishteById = createAsyncThunk(
  'chitalishta/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/chitalishta/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при зареждане на читалището'
      );
    }
  }
);

export const searchChitalishta = createAsyncThunk(
  'chitalishta/search',
  async ({ name, region, municipality, town, page = 0, size = 12, sortBy = 'name', sortDirection = 'asc' }, { rejectWithValue }) => {
    try {
      const response = await api.get('/chitalishta/search', {
        params: { 
          name, 
          region, 
          municipality, 
          town,
          page, 
          size, 
          sortBy, 
          sortDirection 
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при търсене на читалища'
      );
    }
  }
);

export const fetchTotalCount = createAsyncThunk(
  'chitalishta/fetchTotalCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/chitalishta/count');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при зареждане на броя'
      );
    }
  }
);

export const fetchInformationCardsByChitalishte = createAsyncThunk(
  'chitalishta/fetchInformationCardsByChitalishte',
  async (chitalishteId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/chitalishta/${chitalishteId}/information-cards`);
      return { chitalishteId, informationCards: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при зареждане на информационните карти'
      );
    }
  }
);

// CRUD Async Thunks for Chitalishta
export const createChitalishte = createAsyncThunk(
  'chitalishta/create',
  async (chitalishteData, { rejectWithValue }) => {
    try {
      const response = await api.post('/chitalishta', chitalishteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при създаване на читалището'
      );
    }
  }
);

export const updateChitalishte = createAsyncThunk(
  'chitalishta/update',
  async ({ id, ...chitalishteData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/chitalishta/${id}`, chitalishteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при обновяване на читалището'
      );
    }
  }
);

export const deleteChitalishte = createAsyncThunk(
  'chitalishta/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/chitalishta/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при изтриване на читалището'
      );
    }
  }
);

// CRUD Async Thunks for Information Cards
export const createInformationCard = createAsyncThunk(
  'chitalishta/createInformationCard',
  async (cardData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/chitalishta/${cardData.chitalishteId}/information-cards`, cardData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при създаване на информационната карта'
      );
    }
  }
);

export const updateInformationCard = createAsyncThunk(
  'chitalishta/updateInformationCard',
  async ({ id, ...cardData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/chitalishta/information-cards/${id}`, cardData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при обновяване на информационната карта'
      );
    }
  }
);

export const deleteInformationCard = createAsyncThunk(
  'chitalishta/deleteInformationCard',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/chitalishta/information-cards/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при изтриване на информационната карта'
      );
    }
  }
);

export const fetchAllInformationCards = createAsyncThunk(
  'chitalishta/fetchAllInformationCards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/chitalishta/information-cards/all');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при зареждане на информационните карти'
      );
    }
  }
);

export const fetchInformationCardById = createAsyncThunk(
  'chitalishta/fetchInformationCardById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/chitalishta/information-cards/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Грешка при зареждане на информационната карта'
      );
    }
  }
);

// Slice
const chitalishtaSlice = createSlice({
  name: 'chitalishta',
  initialState: {
    items: [],
    currentChitalishte: null,
    loading: false,
    error: null,
    // Пагинация данни
    pagination: {
      currentPage: 0,
      totalPages: 0,
      totalItems: 0,
      pageSize: 12
    },
    // Филтри
    filters: {
      name: '',
      region: '',
      municipality: '',
      town: ''
    },
    // Сортиране
    sort: {
      sortBy: 'name',
      sortDirection: 'asc'
    },
    // Общ брой за статистика
    totalCount: 0,
    // Информационни карти по читалище
    informationCardsByChitalishte: {},
    // Всички информационни карти за административния панел
    allInformationCards: [],
    // Зареждане на информационни карти
    informationCardsLoading: false,
    informationCardsError: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.informationCardsError = null;
    },
    clearCurrentChitalishte: (state) => {
      state.currentChitalishte = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort: (state, action) => {
      state.sort = { ...state.sort, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearAll: (state) => {
      state.items = [];
      state.currentChitalishte = null;
      state.filters = {
        name: '',
        region: '',
        municipality: '',
        town: ''
      };
      state.pagination = {
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
        pageSize: 12
      };
    },
    clearInformationCards: (state) => {
      state.informationCardsByChitalishte = {};
      state.allInformationCards = [];
    },
    clearInformationCardsError: (state) => {
      state.informationCardsError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all chitalishta
      .addCase(fetchAllChitalishta.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllChitalishta.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content;
        state.pagination = {
          currentPage: action.payload.number,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalElements,
          pageSize: action.payload.size
        };
        state.error = null;
      })
      .addCase(fetchAllChitalishta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch chitalishte by ID
      .addCase(fetchChitalishteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChitalishteById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChitalishte = action.payload;
        state.error = null;
      })
      .addCase(fetchChitalishteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Search chitalishta
      .addCase(searchChitalishta.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchChitalishta.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content;
        state.pagination = {
          currentPage: action.payload.number,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalElements,
          pageSize: action.payload.size
        };
        state.error = null;
      })
      .addCase(searchChitalishta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch total count
      .addCase(fetchTotalCount.fulfilled, (state, action) => {
        state.totalCount = action.payload;
      })
      
      // Fetch information cards by chitalishte
      .addCase(fetchInformationCardsByChitalishte.fulfilled, (state, action) => {
        state.informationCardsByChitalishte[action.payload.chitalishteId] = action.payload.informationCards;
      })
      
      // Create chitalishte
      .addCase(createChitalishte.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChitalishte.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.totalCount += 1;
        state.error = null;
      })
      .addCase(createChitalishte.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update chitalishte
      .addCase(updateChitalishte.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateChitalishte.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentChitalishte?.id === action.payload.id) {
          state.currentChitalishte = action.payload;
        }
        state.error = null;
      })
      .addCase(updateChitalishte.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete chitalishte
      .addCase(deleteChitalishte.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteChitalishte.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.currentChitalishte?.id === action.payload) {
          state.currentChitalishte = null;
        }
        state.totalCount = Math.max(0, state.totalCount - 1);
        state.error = null;
      })
      .addCase(deleteChitalishte.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch all information cards
      .addCase(fetchAllInformationCards.pending, (state) => {
        state.informationCardsLoading = true;
        state.informationCardsError = null;
      })
      .addCase(fetchAllInformationCards.fulfilled, (state, action) => {
        state.informationCardsLoading = false;
        state.allInformationCards = action.payload;
        state.informationCardsError = null;
      })
      .addCase(fetchAllInformationCards.rejected, (state, action) => {
        state.informationCardsLoading = false;
        state.informationCardsError = action.payload;
      })
      
      // Fetch information card by ID
      .addCase(fetchInformationCardById.fulfilled, (state, action) => {
        // Може да се използва за единична карта ако е необходимо
      })
      
      // Create information card
      .addCase(createInformationCard.pending, (state) => {
        state.informationCardsLoading = true;
        state.informationCardsError = null;
      })
      .addCase(createInformationCard.fulfilled, (state, action) => {
        state.informationCardsLoading = false;
        const chitalishteId = action.payload.chitalishteId;
        
        // Добави към всички карти
        state.allInformationCards.push(action.payload);
        
        // Добави към картите по читалище
        if (!state.informationCardsByChitalishte[chitalishteId]) {
          state.informationCardsByChitalishte[chitalishteId] = [];
        }
        state.informationCardsByChitalishte[chitalishteId].push(action.payload);
        
        state.informationCardsError = null;
      })
      .addCase(createInformationCard.rejected, (state, action) => {
        state.informationCardsLoading = false;
        state.informationCardsError = action.payload;
      })
      
      // Update information card
      .addCase(updateInformationCard.pending, (state) => {
        state.informationCardsLoading = true;
        state.informationCardsError = null;
      })
      .addCase(updateInformationCard.fulfilled, (state, action) => {
        state.informationCardsLoading = false;
        const updatedCard = action.payload;
        const chitalishteId = updatedCard.chitalishteId;
        
        // Обнови във всички карти
        const allCardsIndex = state.allInformationCards.findIndex(card => card.id === updatedCard.id);
        if (allCardsIndex !== -1) {
          state.allInformationCards[allCardsIndex] = updatedCard;
        }
        
        // Обнови в картите по читалище
        if (state.informationCardsByChitalishte[chitalishteId]) {
          const chitalishteCardsIndex = state.informationCardsByChitalishte[chitalishteId]
            .findIndex(card => card.id === updatedCard.id);
          if (chitalishteCardsIndex !== -1) {
            state.informationCardsByChitalishte[chitalishteId][chitalishteCardsIndex] = updatedCard;
          }
        }
        
        state.informationCardsError = null;
      })
      .addCase(updateInformationCard.rejected, (state, action) => {
        state.informationCardsLoading = false;
        state.informationCardsError = action.payload;
      })
      
      // Delete information card
      .addCase(deleteInformationCard.pending, (state) => {
        state.informationCardsLoading = true;
        state.informationCardsError = null;
      })
      .addCase(deleteInformationCard.fulfilled, (state, action) => {
        state.informationCardsLoading = false;
        const deletedCardId = action.payload;
        
        // Премахни от всички карти
        state.allInformationCards = state.allInformationCards.filter(card => card.id !== deletedCardId);
        
        // Премахни от всички читалища
        Object.keys(state.informationCardsByChitalishte).forEach(chitalishteId => {
          state.informationCardsByChitalishte[chitalishteId] = 
            state.informationCardsByChitalishte[chitalishteId].filter(card => card.id !== deletedCardId);
        });
        
        state.informationCardsError = null;
      })
      .addCase(deleteInformationCard.rejected, (state, action) => {
        state.informationCardsLoading = false;
        state.informationCardsError = action.payload;
      });
  }
});

export const { 
  clearError, 
  clearCurrentChitalishte, 
  setFilters,
  setSort,
  setPagination,
  clearAll,
  clearInformationCards,
  clearInformationCardsError
} = chitalishtaSlice.actions;

export default chitalishtaSlice.reducer;

// Селектори
export const selectAllChitalishta = (state) => state.chitalishta.items;
export const selectCurrentChitalishte = (state) => state.chitalishta.currentChitalishte;
export const selectChitalishtaLoading = (state) => state.chitalishta.loading;
export const selectChitalishtaError = (state) => state.chitalishta.error;
export const selectPagination = (state) => state.chitalishta.pagination;
export const selectFilters = (state) => state.chitalishta.filters;
export const selectSort = (state) => state.chitalishta.sort;
export const selectTotalCount = (state) => state.chitalishta.totalCount;

// Information Cards Selectors
export const selectInformationCardsByChitalishteId = (state, chitalishteId) => 
  state.chitalishta.informationCardsByChitalishte[chitalishteId] || [];

export const selectAllInformationCards = (state) => state.chitalishta.allInformationCards;
export const selectInformationCardsLoading = (state) => state.chitalishta.informationCardsLoading;
export const selectInformationCardsError = (state) => state.chitalishta.informationCardsError;

// Admin Selectors
export const selectChitalishtaForAdmin = (state) => ({
  items: state.chitalishta.items,
  loading: state.chitalishta.loading,
  error: state.chitalishta.error,
  totalCount: state.chitalishta.totalCount
});

export const selectInformationCardsForAdmin = (state) => ({
  items: state.chitalishta.allInformationCards,
  loading: state.chitalishta.informationCardsLoading,
  error: state.chitalishta.informationCardsError,
  totalCount: state.chitalishta.allInformationCards.length
});