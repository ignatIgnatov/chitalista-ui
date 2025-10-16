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
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Pagination,
    Stack,
    InputAdornment,
    Chip
} from '@mui/material';
import {
    Add,
    Edit,
    Delete,
    Refresh,
    Assignment,
    Search,
    FilterList
} from '@mui/icons-material';
import {
    fetchAllChitalishta,
    fetchAllInformationCards,
    createInformationCard,
    updateInformationCard,
    deleteInformationCard,
    clearError,
    selectAllChitalishta,
    selectChitalishtaLoading,
    selectInformationCardsForAdmin,
    selectInformationCardsLoading,
    selectInformationCardsError
} from '../../store/slices/chitalishtaSlice';

const InformationCardForm = ({ open, onClose, card, onSubmit }) => {
    const chitalishta = useSelector(selectAllChitalishta);
    const [formData, setFormData] = useState({
        chitalishteId: '',
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
                chitalishteId: card.chitalishte?.id || card.chitalishteId || '',
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
                chitalishteId: '',
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

        if (!formData.chitalishteId) newErrors.chitalishteId = 'Избор на читалище е задължителен';
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
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={!!errors.chitalishteId}>
                            <InputLabel>Читалище *</InputLabel>
                            <Select
                                value={formData.chitalishteId}
                                onChange={handleChange('chitalishteId')}
                                label="Читалище *"
                            >
                                {chitalishta.map((chitalishte) => (
                                    <MenuItem key={chitalishte.id} value={chitalishte.id}>
                                        {chitalishte.name} - {chitalishte.town}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.chitalishteId && (
                                <Typography variant="caption" color="error">
                                    {errors.chitalishteId}
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>

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

const InformationCardAdmin = () => {
    const dispatch = useDispatch();
    const chitalishta = useSelector(selectAllChitalishta);
    const { items: allInformationCards } = useSelector(selectInformationCardsForAdmin);
    const cardsLoading = useSelector(selectInformationCardsLoading);
    const cardsError = useSelector(selectInformationCardsError);
    const chitalishtaLoading = useSelector(selectChitalishtaLoading);

    const [formOpen, setFormOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);

    // Пагинация и филтриране
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [chitalishteFilter, setChitalishteFilter] = useState('');

    useEffect(() => {
        dispatch(fetchAllChitalishta({ page: 0, size: 1000 }));
        loadInformationCards();
    }, [dispatch]);

    const loadInformationCards = async () => {
        try {
            await dispatch(fetchAllInformationCards());
        } catch (error) {
            console.error('Error loading information cards:', error);
        }
    };

    // Филтриране на карти
    const filteredCards = allInformationCards.filter(card => {
        const matchesSearch = searchTerm === '' || 
            getChitalishteName(card.chitalishteId || card.chitalishte?.id)
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        
        const matchesYear = yearFilter === '' || card.year.toString() === yearFilter;
        
        const matchesChitalishte = chitalishteFilter === '' || 
            (card.chitalishteId || card.chitalishte?.id).toString() === chitalishteFilter;

        return matchesSearch && matchesYear && matchesChitalishte;
    });

    // Пагинация
    const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCards = filteredCards.slice(startIndex, startIndex + itemsPerPage);

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
        if (selectedCard) {
            dispatch(updateInformationCard({ id: selectedCard.id, ...formData }))
                .then(() => {
                    setFormOpen(false);
                    loadInformationCards();
                });
        } else {
            dispatch(createInformationCard(formData))
                .then(() => {
                    setFormOpen(false);
                    loadInformationCards();
                });
        }
    };

    const confirmDelete = () => {
        if (cardToDelete) {
            dispatch(deleteInformationCard(cardToDelete.id))
                .then(() => {
                    setDeleteDialogOpen(false);
                    loadInformationCards();
                });
        }
    };

    const handleRefresh = () => {
        loadInformationCards();
        // Ресет на филтрите
        setSearchTerm('');
        setYearFilter('');
        setChitalishteFilter('');
        setCurrentPage(1);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const getChitalishteName = (chitalishteId) => {
        const chitalishte = chitalishta.find(c => c.id === chitalishteId);
        return chitalishte ? `${chitalishte.name} - ${chitalishte.town}` : 'Няма данни';
    };

    const getAvailableYears = () => {
        const years = [...new Set(allInformationCards.map(card => card.year))].sort((a, b) => b - a);
        return years;
    };

    // Копиране на ID на картата
    const handleCopyId = (cardId) => {
        navigator.clipboard.writeText(cardId.toString());
        // Можеш да добавиш toast notification тук
        console.log('Card ID copied:', cardId);
    };

    if (chitalishtaLoading && chitalishta.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
                    Управление на Информационни Карти
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

            {/* Statistics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                            {allInformationCards.length}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Общ брой карти
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h3" color="success.main" sx={{ fontWeight: 700 }}>
                            {new Set(allInformationCards.map(card => card.chitalishteId || card.chitalishte?.id)).size}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Обхванати читалища
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h3" color="warning.main" sx={{ fontWeight: 700 }}>
                            {getAvailableYears().length}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Години покритие
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h3" color="info.main" sx={{ fontWeight: 700 }}>
                            {filteredCards.length}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Филтрирани карти
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Филтри и търсене */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Търсене по читалище"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            placeholder="Име на читалище или населено място..."
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Филтър по година</InputLabel>
                            <Select
                                value={yearFilter}
                                onChange={(e) => {
                                    setYearFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                label="Филтър по година"
                            >
                                <MenuItem value="">Всички години</MenuItem>
                                {getAvailableYears().map(year => (
                                    <MenuItem key={year} value={year.toString()}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Филтър по читалище</InputLabel>
                            <Select
                                value={chitalishteFilter}
                                onChange={(e) => {
                                    setChitalishteFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                label="Филтър по читалище"
                            >
                                <MenuItem value="">Всички читалища</MenuItem>
                                {chitalishta.map(chitalishte => (
                                    <MenuItem key={chitalishte.id} value={chitalishte.id.toString()}>
                                        {chitalishte.name} - {chitalishte.town}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <InputLabel>Брой на страница</InputLabel>
                            <Select
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                label="Брой на страница"
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Информация за филтрите */}
                {(searchTerm || yearFilter || chitalishteFilter) && (
                    <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="body2" color="text.secondary">
                            Активни филтри:
                        </Typography>
                        {searchTerm && (
                            <Chip 
                                label={`Търсене: "${searchTerm}"`} 
                                size="small"
                                onDelete={() => {
                                    setSearchTerm('');
                                    setCurrentPage(1);
                                }}
                            />
                        )}
                        {yearFilter && (
                            <Chip 
                                label={`Година: ${yearFilter}`} 
                                size="small"
                                onDelete={() => {
                                    setYearFilter('');
                                    setCurrentPage(1);
                                }}
                            />
                        )}
                        {chitalishteFilter && (
                            <Chip 
                                label={`Читалище: ${getChitalishteName(parseInt(chitalishteFilter))}`} 
                                size="small"
                                onDelete={() => {
                                    setChitalishteFilter('');
                                    setCurrentPage(1);
                                }}
                            />
                        )}
                        <Button 
                            size="small" 
                            onClick={() => {
                                setSearchTerm('');
                                setYearFilter('');
                                setChitalishteFilter('');
                                setCurrentPage(1);
                            }}
                        >
                            Изчисти всички
                        </Button>
                    </Box>
                )}
            </Paper>

            {/* Информация за резултатите */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Показване {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCards.length)} от {filteredCards.length} карти
                    {filteredCards.length !== allInformationCards.length && ` (от общо ${allInformationCards.length})`}
                </Typography>
                {cardsLoading && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={16} />
                        <Typography variant="body2" color="text.secondary">
                            Зареждане...
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Information Cards Table */}
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '50px' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Читалище</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '100px' }}>Година</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '100px' }}>Членове</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '100px' }}>Служители</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '120px' }}>Формации</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '100px' }}>Проекти</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '150px', textAlign: 'center' }}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCards.map((card) => (
                            <Fade in={true} key={card.id}>
                                <TableRow hover>
                                    <TableCell>
                                        <Tooltip title="Копирай ID">
                                            <Chip 
                                                label={`#${card.id}`} 
                                                size="small" 
                                                variant="outlined"
                                                onClick={() => handleCopyId(card.id)}
                                                sx={{ cursor: 'pointer' }}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {getChitalishteName(card.chitalishteId || card.chitalishte?.id)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={card.year} 
                                            variant="outlined" 
                                            size="small" 
                                            color="primary"
                                        />
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
                                                label={`Ф: ${card.folkloreFormations || 0}`} 
                                                size="small" 
                                                variant="outlined"
                                            />
                                            <Chip 
                                                label={`Т: ${card.theatreFormations || 0}`} 
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
            {filteredCards.length === 0 && !cardsLoading && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Assignment sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        {allInformationCards.length === 0 
                            ? 'Няма намерени информационни карти' 
                            : 'Няма резултати за текущите филтри'
                        }
                    </Typography>
                    <Button
                        startIcon={<Add />}
                        onClick={handleCreate}
                        variant="contained"
                        sx={{ mr: 2 }}
                    >
                        Добави първата карта
                    </Button>
                    {(searchTerm || yearFilter || chitalishteFilter) && (
                        <Button
                            onClick={() => {
                                setSearchTerm('');
                                setYearFilter('');
                                setChitalishteFilter('');
                                setCurrentPage(1);
                            }}
                            variant="outlined"
                        >
                            Изчисти филтри
                        </Button>
                    )}
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
                        Сигурни ли сте, че искате да изтриете информационната карта за {cardToDelete?.year} година на читалище "{getChitalishteName(cardToDelete?.chitalishteId || cardToDelete?.chitalishte?.id)}"?
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

export default InformationCardAdmin;