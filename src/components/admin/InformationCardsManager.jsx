// src/components/admin/InformationCardsManager.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Fade,
  Chip,
  Pagination,
  Stack
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  ArrowBack,
  Assignment,
  Refresh
} from '@mui/icons-material';
import {
  fetchInformationCardsByChitalishte,
  createInformationCard,
  updateInformationCard,
  deleteInformationCard,
  clearError,
  selectInformationCardsByChitalishteId,
  selectInformationCardsLoading,
  selectInformationCardsError
} from '../../store/slices/chitalishtaSlice';

const InformationCardForm = ({ open, onClose, card, chitalishte, onSubmit }) => {
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    totalMembersCount: '',
    newMembers: '',
    employeesCount: '',
    subsidiaryCount: '',
    employeesWithHigherEducation: '',
    folkloreFormations: '',
    theatreFormations: '',
    dancingGroups: '',
    vocalGroups: '',
    workshopsClubsArts: '',
    museumCollections: '',
    projectsParticipationLeading: '',
    projectsParticipationPartner: '',
    participationInTrainings: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (card) {
      setFormData({
        year: card.year || new Date().getFullYear(),
        totalMembersCount: card.totalMembersCount || '',
        newMembers: card.newMembers || '',
        employeesCount: card.employeesCount || '',
        subsidiaryCount: card.subsidiaryCount || '',
        employeesWithHigherEducation: card.employeesWithHigherEducation || '',
        folkloreFormations: card.folkloreFormations || '',
        theatreFormations: card.theatreFormations || '',
        dancingGroups: card.dancingGroups || '',
        vocalGroups: card.vocalGroups || '',
        workshopsClubsArts: card.workshopsClubsArts || '',
        museumCollections: card.museumCollections || '',
        projectsParticipationLeading: card.projectsParticipationLeading || '',
        projectsParticipationPartner: card.projectsParticipationPartner || '',
        participationInTrainings: card.participationInTrainings || ''
      });
    } else {
      setFormData({
        year: new Date().getFullYear(),
        totalMembersCount: '',
        newMembers: '',
        employeesCount: '',
        subsidiaryCount: '',
        employeesWithHigherEducation: '',
        folkloreFormations: '',
        theatreFormations: '',
        dancingGroups: '',
        vocalGroups: '',
        workshopsClubsArts: '',
        museumCollections: '',
        projectsParticipationLeading: '',
        projectsParticipationPartner: '',
        participationInTrainings: ''
      });
    }
    setErrors({});
  }, [card, open]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Невалидна година';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value === '' ? '' : Number(value) || value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle>
        {card ? 'Редактиране на информационна карта' : 'Добавяне на информационна карта'}
        {chitalishte && (
          <Typography variant="subtitle2" color="text.secondary">
            за {chitalishte.name} - {chitalishte.town}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Година *"
              value={formData.year}
              onChange={handleChange('year')}
              error={!!errors.year}
              helperText={errors.year}
              inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
            />
          </Grid>

          {/* Membership Data */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Членство
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Общ брой членове"
              value={formData.totalMembersCount}
              onChange={handleChange('totalMembersCount')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Нови членове"
              value={formData.newMembers}
              onChange={handleChange('newMembers')}
            />
          </Grid>

          {/* Staff Data */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Персонал
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Брой служители"
              value={formData.employeesCount}
              onChange={handleChange('employeesCount')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Субсидирани бройки"
              value={formData.subsidiaryCount}
              onChange={handleChange('subsidiaryCount')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Служители с висше"
              value={formData.employeesWithHigherEducation}
              onChange={handleChange('employeesWithHigherEducation')}
            />
          </Grid>

          {/* Cultural Activities */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Културни формации
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Фолклорни формации"
              value={formData.folkloreFormations}
              onChange={handleChange('folkloreFormations')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Театрални формации"
              value={formData.theatreFormations}
              onChange={handleChange('theatreFormations')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Танцови групи"
              value={formData.dancingGroups}
              onChange={handleChange('dancingGroups')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Вокални групи"
              value={formData.vocalGroups}
              onChange={handleChange('vocalGroups')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Клубове по изкуства"
              value={formData.workshopsClubsArts}
              onChange={handleChange('workshopsClubsArts')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Музейни колекции"
              value={formData.museumCollections}
              onChange={handleChange('museumCollections')}
            />
          </Grid>

          {/* Projects and Training */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Проекти и обучения
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Самостоятелни проекти"
              value={formData.projectsParticipationLeading}
              onChange={handleChange('projectsParticipationLeading')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Проекти в партньорство"
              value={formData.projectsParticipationPartner}
              onChange={handleChange('projectsParticipationPartner')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Участия в обучения"
              value={formData.participationInTrainings}
              onChange={handleChange('participationInTrainings')}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отказ</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={card ? <Edit /> : <Add />}
        >
          {card ? 'Запази' : 'Добави'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const InformationCardsManager = ({ chitalishte, onBack }) => {
  const dispatch = useDispatch();
  const informationCards = useSelector(state => 
    selectInformationCardsByChitalishteId(state, chitalishte?.id)
  );
  const cardsLoading = useSelector(selectInformationCardsLoading);
  const cardsError = useSelector(selectInformationCardsError);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (chitalishte) {
      dispatch(fetchInformationCardsByChitalishte(chitalishte.id));
    }
  }, [dispatch, chitalishte]);

  const handleCreate = () => {
    setSelectedCard(null);
    setFormOpen(true);
  };

  const handleEdit = (card) => {
    setSelectedCard(card);
    setFormOpen(true);
  };

  const handleDelete = (card) => {
    setCardToDelete(card);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = (formData) => {
    const submitData = {
      ...formData,
      chitalishteId: chitalishte.id
    };

    if (selectedCard) {
      dispatch(updateInformationCard({ id: selectedCard.id, ...submitData }))
        .then(() => {
          setFormOpen(false);
          dispatch(fetchInformationCardsByChitalishte(chitalishte.id));
        });
    } else {
      dispatch(createInformationCard(submitData))
        .then(() => {
          setFormOpen(false);
          dispatch(fetchInformationCardsByChitalishte(chitalishte.id));
        });
    }
  };

  const confirmDelete = () => {
    if (cardToDelete) {
      dispatch(deleteInformationCard(cardToDelete.id))
        .then(() => {
          setDeleteDialogOpen(false);
          dispatch(fetchInformationCardsByChitalishte(chitalishte.id));
        });
    }
  };

  const handleRefresh = () => {
    dispatch(fetchInformationCardsByChitalishte(chitalishte.id));
  };

  // Пагинация
  const totalPages = Math.ceil(informationCards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCards = informationCards.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  if (!chitalishte) {
    return null;
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ mb: 2 }}
          variant="outlined"
        >
          Назад към читалищата
        </Button>

        <Paper sx={{
          p: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 3
        }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Информационни карти
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {chitalishte.name} - {chitalishte.town}, {chitalishte.municipality}
          </Typography>
        </Paper>
      </Box>

      {/* Error Alert */}
      {cardsError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => dispatch(clearError())}
        >
          {cardsError.message || cardsError}
        </Alert>
      )}

      {/* Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Управление на информационни карти ({informationCards.length})
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<Refresh />}
            onClick={handleRefresh}
            variant="outlined"
          >
            Обнови
          </Button>
          <Button
            startIcon={<Add />}
            onClick={handleCreate}
            variant="contained"
          >
            Добави Карта
          </Button>
        </Box>
      </Box>

      {/* Information Cards Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '100px' }}>Година</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '100px' }}>Членове</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '100px' }}>Служители</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '120px' }}>Формации</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '100px' }}>Проекти</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '120px', textAlign: 'center' }}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCards.map((card) => (
              <Fade in={true} key={card.id}>
                <TableRow hover>
                  <TableCell>
                    <Chip label={card.year} variant="outlined" size="small" color="primary" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {card.totalMembersCount || 0}
                    </Typography>
                  </TableCell>
                  <TableCell>{card.employeesCount || 0}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Chip 
                        label={`Фолклор: ${card.folkloreFormations || 0}`} 
                        size="small" 
                        variant="outlined"
                      />
                      <Chip 
                        label={`Театър: ${card.theatreFormations || 0}`} 
                        size="small" 
                        variant="outlined"
                      />
                      <Chip 
                        label={`Танц: ${card.dancingGroups || 0}`} 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Chip 
                        label={`Сам: ${card.projectsParticipationLeading || 0}`} 
                        size="small" 
                        variant="outlined"
                      />
                      <Chip 
                        label={`Парт: ${card.projectsParticipationPartner || 0}`} 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="Редактирай">
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(card)}
                          size="small"
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Изтрий">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(card)}
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              </Fade>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Пагинация */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Stack>
        </Box>
      )}

      {/* Empty State */}
      {informationCards.length === 0 && !cardsLoading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Assignment sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Няма информационни карти за това читалище
          </Typography>
          <Button
            startIcon={<Add />}
            onClick={handleCreate}
            variant="contained"
          >
            Добави първата карта
          </Button>
        </Box>
      )}

      {/* Loading State */}
      {cardsLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Forms and Dialogs */}
      <InformationCardForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        card={selectedCard}
        chitalishte={chitalishte}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle color="error">
          Потвърждение за изтриване
        </DialogTitle>
        <DialogContent>
          <Typography>
            Сигурни ли сте, че искате да изтриете информационната карта за {cardToDelete?.year} година?
            Това действие е необратимо.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Отказ
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
          >
            Изтрий
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InformationCardsManager;