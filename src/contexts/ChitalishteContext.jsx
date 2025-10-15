import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { processChitalishteData, mockChitalishta, municipalities, regions, fieldLabels } from '../data/chitalishteData';

const ChitalishteContext = createContext();

const initialState = {
  chitalishta: [],
  selectedChitalishte: null,
  filters: {
    search: '',
    location: '',
    municipality: '',
    region: ''
  },
  loading: false,
  error: null,
  municipalities: [],
  regions: [],
  fieldLabels: fieldLabels
};

function chitalishteReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CHITALISHTA':
      const chitalishta = processChitalishteData(action.payload);
      const municipalities = [...new Set(action.payload.map(c => c.municipality).filter(Boolean))];
      const regions = [...new Set(action.payload.map(c => c.region).filter(Boolean))];
      return { 
        ...state, 
        chitalishta, 
        municipalities, 
        regions,
        loading: false 
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'SELECT_CHITALISHTE':
      return {
        ...state,
        selectedChitalishte: action.payload
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: initialState.filters
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function ChitalishteProvider({ children }) {
  const [state, dispatch] = useReducer(chitalishteReducer, initialState);

  // Функция за зареждане на данните
  const fetchChitalishtaData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // За момента използваме mock данни
      // В бъдеще ще заменим с реално API извикване
      setTimeout(() => {
        dispatch({ type: 'SET_CHITALISHTA', payload: mockChitalishta });
      }, 1000);
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    fetchChitalishtaData();
  }, []);

  const filteredChitalishta = state.chitalishta.filter(chitalishte => {
    const matchesSearch = !state.filters.search || 
      chitalishte.name?.toLowerCase().includes(state.filters.search.toLowerCase()) ||
      chitalishte.location?.toLowerCase().includes(state.filters.search.toLowerCase());
    
    const matchesLocation = !state.filters.location || 
      chitalishte.location === state.filters.location;
    
    const matchesMunicipality = !state.filters.municipality || 
      chitalishte.municipality === state.filters.municipality;
    
    const matchesRegion = !state.filters.region || 
      chitalishte.region === state.filters.region;

    return matchesSearch && matchesLocation && matchesMunicipality && matchesRegion;
  });

  const value = {
    ...state,
    filteredChitalishta,
    dispatch,
    fetchChitalishtaData
  };

  return (
    <ChitalishteContext.Provider value={value}>
      {children}
    </ChitalishteContext.Provider>
  );
}

export function useChitalishte() {
  const context = useContext(ChitalishteContext);
  if (!context) {
    throw new Error('useChitalishte must be used within a ChitalishteProvider');
  }
  return context;
}