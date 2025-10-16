import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Alert, Container, Typography } from '@mui/material';
import { 
  fetchAllChitalishta, 
  clearCurrentChitalishte,
  clearError,
  fetchTotalCount
} from '../store/slices/chitalishtaSlice';
import { 
  selectAllChitalishta,
  selectCurrentChitalishte,
  selectChitalishtaLoading,
  selectChitalishtaError,
  selectTotalCount
} from '../store/slices/chitalishtaSlice';
import ChitalishteFilters from '../components/chitalishte/ChitalishteFilters';
import ChitalishteList from '../components/chitalishte/ChitalishteList';
import ChitalishteDetail from '../components/chitalishte/ChitalishteDetail';

const ChitalishteContent = () => {
  const dispatch = useDispatch();
  const chitalishta = useSelector(selectAllChitalishta);
  const selectedChitalishte = useSelector(selectCurrentChitalishte);
  const loading = useSelector(selectChitalishtaLoading);
  const error = useSelector(selectChitalishtaError);
  const totalCount = useSelector(selectTotalCount);

  useEffect(() => {
    dispatch(fetchAllChitalishta({ page: 0, size: 12 }));
    dispatch(fetchTotalCount());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentChitalishte());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  if (loading && chitalishta.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <CircularProgress 
          size={60} 
          sx={{ color: 'white', mb: 2 }}
        />
        <Typography variant="h5" sx={{ fontWeight: 300 }}>
          Зареждане на читалищата...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Грешка при зареждане на данните: {error}
        </Alert>
        <Alert severity="info">
          В момента данните се зареждат от сървъра. Моля, опитайте отново или се свържете с администратор.
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {!selectedChitalishte ? (
        <>
          <ChitalishteFilters />
          <ChitalishteList 
            chitalishta={chitalishta} 
            totalCount={totalCount}
            loading={loading}
          />
        </>
      ) : (
        <ChitalishteDetail chitalishte={selectedChitalishte} />
      )}
    </Box>
  );
};

const ChitalishtePage = () => {
  return <ChitalishteContent />;
};

export default ChitalishtePage;