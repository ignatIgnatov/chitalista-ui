import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchChitalishta, fetchAllChitalishta } from '../../store/slices/chitalishtaSlice';
import { selectAllChitalishta } from '../../store/slices/chitalishtaSlice';
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

const ChitalishteFilters = () => {
  const dispatch = useDispatch();
  const chitalishta = useSelector(selectAllChitalishta);
  const [filters, setFilters] = useState({
    name: '',
    region: '',
    municipality: '',
    town: ''
  });

  // Извличане на уникални стойности за филтрите
  const regions = [...new Set(chitalishta.map(c => c.region).filter(Boolean))];
  const municipalities = [...new Set(chitalishta.map(c => c.municipality).filter(Boolean))];
  const towns = [...new Set(chitalishta.map(c => c.town).filter(Boolean))];

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!filters.name && !filters.region && !filters.municipality && !filters.town) {
      dispatch(fetchAllChitalishta());
    } else {
      dispatch(searchChitalishta(filters));
    }
  };

  const handleClearFilters = () => {
    setFilters({
      name: '',
      region: '',
      municipality: '',
      town: ''
    });
    dispatch(fetchAllChitalishta());
  };

  return (
    <Paper sx={{ 
      p: 4, 
      mb: 4,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      borderRadius: 3,
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <Box component="form" onSubmit={handleSearch}>
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Търсене по име"
              value={filters.name}
              onChange={(e) => setFilters({...filters, name: e.target.value})}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'primary.main' }} />
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'white'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              select
              label="Населено място"
              value={filters.town}
              onChange={(e) => setFilters({...filters, town: e.target.value})}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'white'
                }
              }}
            >
              <MenuItem value="">Всички</MenuItem>
              {towns.map((town) => (
                <MenuItem key={town} value={town}>
                  {town}
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
              onChange={(e) => setFilters({...filters, municipality: e.target.value})}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'white'
                }
              }}
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
              onChange={(e) => setFilters({...filters, region: e.target.value})}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'white'
                }
              }}
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
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ 
                  flex: 1,
                  borderRadius: 2,
                  py: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                Търси
              </Button>
              <Button
                variant="outlined"
                startIcon={<Clear />}
                onClick={handleClearFilters}
                sx={{ 
                  flex: 1,
                  borderRadius: 2,
                  py: 1
                }}
              >
                Изчисти
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ChitalishteFilters;