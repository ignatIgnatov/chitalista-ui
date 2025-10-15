import React from 'react';
import { Box, CircularProgress, Alert, Container } from '@mui/material';
import { ChitalishteProvider, useChitalishte } from '../contexts/ChitalishteContext';
import ChitalishteFilters from '../components/chitalishte/ChitalishteFilters';
import ChitalishteList from '../components/chitalishte/ChitalishteList';
import ChitalishteDetail from '../components/chitalishte/ChitalishteDetail';

const ChitalishteContent = () => {
  const { selectedChitalishte, loading, error } = useChitalishte();

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Грешка при зареждане на данните: {error}
        </Alert>
        <Alert severity="info">
          В момента данните се зареждат от статичен файл. Моля, свържете се с администратор за актуална информация.
        </Alert>
      </Container>
    );
  }

  return (
    <Box>
      {!selectedChitalishte ? (
        <>
          <ChitalishteFilters />
          <ChitalishteList />
        </>
      ) : (
        <ChitalishteDetail />
      )}
    </Box>
  );
};

const ChitalishtePage = () => {
  return (
    <ChitalishteProvider>
      <ChitalishteContent />
    </ChitalishteProvider>
  );
};

export default ChitalishtePage;