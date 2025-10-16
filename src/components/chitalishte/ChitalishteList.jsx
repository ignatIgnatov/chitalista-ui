import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllChitalishta,
  searchChitalishta,
  setFilters,
  setSort,
  setPagination,
  fetchChitalishteById,
  fetchInformationCardsByChitalishte
} from '../../store/slices/chitalishtaSlice';
import {
  selectPagination,
  selectFilters,
  selectSort
} from '../../store/slices/chitalishtaSlice';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Pagination,
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
  Fade,
  Zoom,
  Paper,
  Button,
  CircularProgress
} from '@mui/material';
import {
  Phone,
  Email,
  Language,
  LocationOn,
  Groups,
  Search,
  Sort,
  Clear
} from '@mui/icons-material';

const ChitalishteCard = ({ chitalishte, onSelect, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          background: isHovered
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          color: isHovered ? 'white' : 'inherit',
          border: isHovered ? 'none' : '1px solid #e9ecef',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.3s ease'
          }
        }}
        onClick={() => onSelect(chitalishte)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        elevation={isHovered ? 8 : 2}
      >
        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <Box
              sx={{
                width: 70,
                height: 70,
                background: isHovered
                  ? 'rgba(255,255,255,0.2)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                flexShrink: 0,
                transition: 'all 0.3s ease',
                transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)'
              }}
            >
              <Groups sx={{
                color: 'white',
                fontSize: 36,
                transition: 'all 0.3s ease'
              }} />
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  background: isHovered ? 'linear-gradient(45deg, #fff, #e3f2fd)' : 'none',
                  backgroundClip: isHovered ? 'text' : 'none',
                  WebkitBackgroundClip: isHovered ? 'text' : 'none',
                  WebkitTextFillColor: isHovered ? 'transparent' : 'inherit',
                  transition: 'all 0.3s ease'
                }}
              >
                {chitalishte.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{
                  fontSize: 18,
                  mr: 1,
                  color: isHovered ? 'rgba(255,255,255,0.8)' : 'primary.main'
                }} />
                <Typography variant="body2" sx={{
                  fontWeight: 600,
                  opacity: isHovered ? 0.9 : 1
                }}>
                  {chitalishte.town}, {chitalishte.municipality}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{
                fontSize: '0.8rem',
                opacity: isHovered ? 0.8 : 0.7
              }}>
                {chitalishte.region}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3, flexGrow: 1 }}>
            {chitalishte.phone && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1.5,
                transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                transition: 'transform 0.3s ease'
              }}>
                <Phone sx={{
                  fontSize: 18,
                  mr: 1.5,
                  color: isHovered ? 'rgba(255,255,255,0.8)' : 'primary.main'
                }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {chitalishte.phone}
                </Typography>
              </Box>
            )}
            {/* {chitalishte.email && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 1.5,
                transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                transition: 'transform 0.3s ease 0.1s'
              }}>
                <Email sx={{ 
                  fontSize: 18, 
                  mr: 1.5, 
                  color: isHovered ? 'rgba(255,255,255,0.8)' : 'primary.main' 
                }} />
                <Typography variant="body2" sx={{ 
                  wordBreak: 'break-all', 
                  fontWeight: 500 
                }}>
                  {chitalishte.email}
                </Typography>
              </Box>
            )} */}
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: isHovered ? 1 : 0.9,
            transition: 'opacity 0.3s ease'
          }}>
            <Chip
              label={chitalishte.status || 'Действащо'}
              color={chitalishte.status === 'Закрито' ? 'error' : 'success'}
              size="small"
              sx={{
                fontWeight: 700,
                backdropFilter: isHovered ? 'blur(10px)' : 'none',
                background: isHovered ? 'rgba(255,255,255,0.2)' : 'inherit'
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                background: isHovered ? 'linear-gradient(45deg, #fff, #e3f2fd)' : 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              Виж детайли →
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Zoom>
  );
};

const ChitalishteList = ({ chitalishta, totalCount, loading }) => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);
  const filters = useSelector(selectFilters);
  const sort = useSelector(selectSort);

  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    loadChitalishta();
  }, [pagination.currentPage, itemsPerPage, sort.sortBy, sort.sortDirection, filters]);

  const loadChitalishta = () => {
    const params = {
      page: pagination.currentPage,
      size: itemsPerPage,
      sortBy: sort.sortBy,
      sortDirection: sort.sortDirection,
      ...filters
    };

    Object.keys(params).forEach(key => {
      if (params[key] === '') {
        delete params[key];
      }
    });

    if (hasActiveFilters()) {
      dispatch(searchChitalishta(params));
    } else {
      dispatch(fetchAllChitalishta(params));
    }
  };

  const hasActiveFilters = () => {
    return filters.name || filters.region || filters.municipality || filters.town;
  };

  const handleSearch = () => {
    dispatch(setFilters({ name: searchTerm }));
    dispatch(setPagination({ currentPage: 0 }));
  };

  const handleClearFilters = () => {
    dispatch(setFilters({
      name: '',
      region: '',
      municipality: '',
      town: ''
    }));
    setSearchTerm('');
    dispatch(setPagination({ currentPage: 0 }));
  };

  const handleSortChange = (newSortBy) => {
    const newSortDirection = sort.sortBy === newSortBy && sort.sortDirection === 'asc' ? 'desc' : 'asc';
    dispatch(setSort({ sortBy: newSortBy, sortDirection: newSortDirection }));
    dispatch(setPagination({ currentPage: 0 }));
  };

  const handlePageChange = (event, newPage) => {
    dispatch(setPagination({ currentPage: newPage - 1 }));
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    dispatch(setPagination({ currentPage: 0 }));
  };

  const handleSelectChitalishte = async (chitalishte) => {
    // Зареди първо основната информация за читалището
    await dispatch(fetchChitalishteById(chitalishte.id));
    // После зареди информационните карти
    dispatch(fetchInformationCardsByChitalishte(chitalishte.id));
  };

  const displayCount = pagination.totalItems || totalCount || chitalishta.length;
  const startItem = pagination.currentPage * itemsPerPage + 1;
  const endItem = Math.min((pagination.currentPage + 1) * itemsPerPage, displayCount);

  if (chitalishta.length === 0 && !loading) {
    return (
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2, opacity: 0.5 }}>
            📚
          </Typography>
          <Typography variant="h4" color="text.secondary" sx={{ mb: 2, fontWeight: 300 }}>
            Няма намерени читалища
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Променете критериите за търсене или се свържете с администратор
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{
        textAlign: 'center',
        mb: 6,
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        p: 4,
        borderRadius: 4,
        border: '1px solid rgba(102, 126, 234, 0.2)'
      }}>
        <Typography variant="h2" component="h1" sx={{
          mb: 2,
          fontWeight: 800,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '2.5rem', md: '3.5rem' }
        }}>
          Народни Читалища
        </Typography>
        <Typography variant="h5" sx={{
          mb: 3,
          fontWeight: 300,
          color: 'text.secondary',
          maxWidth: '600px',
          mx: 'auto'
        }}>
          Открийте богатството на българската култура чрез мрежата от{' '}
          <Box component="span" sx={{
            fontWeight: 700,
            color: 'primary.main',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {displayCount} читалища
          </Box>
        </Typography>
      </Box>

      {/* Controls */}
      <Paper sx={{
        p: 3,
        mb: 4,
        background: 'transparent',
        // background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
          <Grid item xs={6} md={2}>
            <TextField
              fullWidth
              select
              label="Сортиране"
              value={sort.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              size="small"
              margin="none"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  height: '32px',
                  fontSize: '0.875rem'
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.8rem'
                }
              }}
            >
              <MenuItem value="name">Име</MenuItem>
              <MenuItem value="town">Населено място</MenuItem>
              <MenuItem value="municipality">Община</MenuItem>
              <MenuItem value="region">Област</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6} md={2}>
            <TextField
              fullWidth
              select
              label="Брой"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              size="small"
              margin="none"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  height: '32px',
                  fontSize: '0.875rem'
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.8rem'
                }
              }}
            >
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={48}>48</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Info Bar */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Показване {startItem}-{endItem} от {displayCount} читалища
          {sort.sortDirection === 'asc' ? ' ↑' : ' ↓'} по {getSortLabel(sort.sortBy)}
        </Typography>
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={16} />
            <Typography variant="body2" color="text.secondary">
              Зареждане...
            </Typography>
          </Box>
        )}
      </Box>

      {/* Grid */}
      <Fade in={true} timeout={800}>
        <Grid container spacing={3}>
          {chitalishta.map((chitalishte, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={chitalishte.id}>
              <ChitalishteCard
                chitalishte={chitalishte}
                onSelect={handleSelectChitalishte}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      </Fade>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 6,
          mb: 4
        }}>
          <Stack spacing={2}>
            <Pagination
              count={pagination.totalPages}
              page={pagination.currentPage + 1}
              onChange={handlePageChange}
              size="large"
              color="primary"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2,
                  fontWeight: 600,
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                  }
                }
              }}
            />
          </Stack>
        </Box>
      )}
    </Container>
  );
};

function getSortLabel(sortBy) {
  const labels = {
    name: 'име',
    town: 'населено място',
    municipality: 'община',
    region: 'област'
  };
  return labels[sortBy] || sortBy;
}

export default ChitalishteList;