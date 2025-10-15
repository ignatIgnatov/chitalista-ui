import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Phone,
  Email,
  Language,
  LocationOn,
  Groups
} from '@mui/icons-material';
import { useChitalishte } from '../../contexts/ChitalishteContext';

const ChitalishteCard = ({ chitalishte, onSelect }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
      onClick={() => onSelect(chitalishte)}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              bgcolor: 'primary.light',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              flexShrink: 0
            }}
          >
            <Groups sx={{ color: 'white', fontSize: 32 }} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              {chitalishte.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 1 }}>
              <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="body2">
                {chitalishte.location}, {chitalishte.municipality}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Contact Info */}
        <Box sx={{ mb: 2 }}>
          {chitalishte.phones && chitalishte.phones.slice(0, 1).map((phone, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Phone sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">{phone}</Typography>
            </Box>
          ))}
          {chitalishte.emails && chitalishte.emails.slice(0, 1).map((email, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Email sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
              <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                {email}
              </Typography>
            </Box>
          ))}
          {chitalishte.website && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Language sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">{chitalishte.website}</Typography>
            </Box>
          )}
        </Box>

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {chitalishte.total_members_count && (
            <Chip 
              label={`${chitalishte.total_members_count}+ членове`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          {chitalishte.library_activity && (
            <Chip 
              label={chitalishte.library_activity + ' книги'}
              size="small"
              color="secondary"
              variant="outlined"
            />
          )}
          {chitalishte.subsidiary_count > 0 && (
            <Chip 
              label={`${chitalishte.subsidiary_count} субсидии`}
              size="small"
              color="success"
              variant="outlined"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const ChitalishteList = () => {
  const { filteredChitalishta, dispatch, loading, error } = useChitalishte();

  const handleSelectChitalishte = (chitalishte) => {
    dispatch({ type: 'SELECT_CHITALISHTE', payload: chitalishte });
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">
          Грешка при зареждане на данните: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 300 }}>
        Народни Читалища
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Открийте богатството на българската култура чрез мрежата от читалища
      </Typography>

      {filteredChitalishta.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Няма намерени читалища, отговарящи на критериите за търсене
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredChitalishta.map((chitalishte) => (
            <Grid item xs={12} sm={6} md={4} key={chitalishte.id}>
              <ChitalishteCard 
                chitalishte={chitalishte}
                onSelect={handleSelectChitalishte}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ChitalishteList;