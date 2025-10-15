import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Grid
} from '@mui/material';
import {
  Search,
  Clear
} from '@mui/icons-material';
import { useChitalishte } from '../../contexts/ChitalishteContext';
import { mockChitalishta } from '../../data/chitalishteData';

const ChitalishteFilters = () => {
  const { filters, municipalities, regions, dispatch } = useChitalishte();

  const handleFilterChange = (filterType, value) => {
    dispatch({ 
      type: 'SET_FILTERS', 
      payload: { [filterType]: value } 
    });
  };

  const handleClearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const locations = [...new Set(mockChitalishta.map(c => c.location))];

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Търсене по име или населено място"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            select
            label="Населено място"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <MenuItem value="">Всички</MenuItem>
            {locations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            select
            label="Община"
            value={filters.municipality}
            onChange={(e) => handleFilterChange('municipality', e.target.value)}
          >
            <MenuItem value="">Всички</MenuItem>
            {municipalities.map((municipality) => (
              <MenuItem key={municipality} value={municipality}>
                {municipality}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            select
            label="Област"
            value={filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
          >
            <MenuItem value="">Всички</MenuItem>
            {regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Clear />}
              onClick={handleClearFilters}
              sx={{ flex: 1 }}
            >
              Изчисти
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChitalishteFilters;