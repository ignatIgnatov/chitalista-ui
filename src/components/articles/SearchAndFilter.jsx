import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Paper,
  IconButton
} from '@mui/material';
import { Search, Clear, FilterList } from '@mui/icons-material';
import { searchArticles, setSearchTerm, setCurrentTemplate, clearFilters } from '../../store/slices/articlesSlice';

const SearchAndFilter = () => {
  const dispatch = useDispatch();
  const { searchTerm, currentTemplate, loading } = useSelector(state => state.articles);
  
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        dispatch(setSearchTerm(localSearchTerm));
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localSearchTerm, dispatch]);

  const handleSearch = () => {
    dispatch(searchArticles({
      search: localSearchTerm || null,
      template: currentTemplate,
      page: 0,
      size: 10
    }));
  };

  const handleTemplateChange = (event) => {
    const template = event.target.value;
    dispatch(setCurrentTemplate(template));
    dispatch(searchArticles({
      search: localSearchTerm || null,
      template: template || null,
      page: 0,
      size: 10
    }));
  };

  const handleClearFilters = () => {
    setLocalSearchTerm('');
    dispatch(clearFilters());
    dispatch(searchArticles({ page: 0, size: 10 }));
  };

  return (
    <Paper className="p-6 mb-8 rounded-2xl shadow-lg">
      <Box className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Field */}
        <div className="flex-1 w-full">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Търсете статии..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search className="text-gray-400 mr-2" />
            }}
            className="rounded-lg"
          />
        </div>

        {/* Filter Toggle Button */}
        <IconButton
          onClick={() => setShowFilters(!showFilters)}
          className={`${showFilters ? 'bg-indigo-100 text-indigo-600' : ''}`}
        >
          <FilterList />
        </IconButton>

        {/* Clear Filters Button */}
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          startIcon={<Clear />}
        >
          Изчисти
        </Button>
      </Box>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <FormControl fullWidth variant="outlined">
              <InputLabel>Шаблон</InputLabel>
              <Select
                value={currentTemplate || ''}
                onChange={handleTemplateChange}
                label="Шаблон"
              >
                <MenuItem value="">Всички шаблони</MenuItem>
                <MenuItem value="CLASSIC">Класически</MenuItem>
                <MenuItem value="MODERN">Модерен</MenuItem>
                <MenuItem value="FOCUS">Фокус</MenuItem>
              </Select>
            </FormControl>
          </motion.div>
        )}
      </AnimatePresence>
    </Paper>
  );
};

export default SearchAndFilter;