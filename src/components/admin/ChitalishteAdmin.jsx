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
    Stack,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {
    Add,
    Edit,
    Delete,
    Refresh,
    Groups,
    Search,
    LocationOn,
    Phone,
    Email,
    Language,
    Assignment,
    ArrowBack
} from '@mui/icons-material';
import {
    fetchAllChitalishta,
    createChitalishte,
    updateChitalishte,
    deleteChitalishte,
    fetchInformationCardsByChitalishte,
    createInformationCard,
    updateInformationCard,
    deleteInformationCard,
    clearError,
    selectAllChitalishta,
    selectChitalishtaLoading,
    selectChitalishtaError,
    selectInformationCardsByChitalishteId,
    selectInformationCardsLoading,
    selectInformationCardsError
} from '../../store/slices/chitalishtaSlice';

// Information Card Form Component
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

// Information Cards Manager Component
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

// Chitalishte Form Component
const ChitalishteForm = ({ open, onClose, chitalishte, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        town: '',
        municipality: '',
        region: '',
        address: '',
        phone: '',
        email: '',
        chitalishtaUrl: '',
        chairman: '',
        secretary: '',
        bulstat: '',
        status: 'ACTIVE',
        registrationNumber: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (chitalishte) {
            setFormData({
                name: chitalishte.name || '',
                town: chitalishte.town || '',
                municipality: chitalishte.municipality || '',
                region: chitalishte.region || '',
                address: chitalishte.address || '',
                phone: chitalishte.phone || '',
                email: chitalishte.email || '',
                chitalishtaUrl: chitalishte.chitalishtaUrl || '',
                chairman: chitalishte.chairman || '',
                secretary: chitalishte.secretary || '',
                bulstat: chitalishte.bulstat || '',
                status: chitalishte.status || 'ACTIVE',
                registrationNumber: chitalishte.registrationNumber || ''
            });
        } else {
            setFormData({
                name: '',
                town: '',
                municipality: '',
                region: '',
                address: '',
                phone: '',
                email: '',
                chitalishtaUrl: '',
                chairman: '',
                secretary: '',
                bulstat: '',
                status: 'ACTIVE',
                registrationNumber: ''
            });
        }
        setErrors({});
    }, [chitalishte, open]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Името е задължително';
        if (!formData.town.trim()) newErrors.town = 'Населеното място е задължително';
        if (!formData.municipality.trim()) newErrors.municipality = 'Общината е задължителна';
        if (!formData.region.trim()) newErrors.region = 'Областта е задължителна';

        // if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        //     newErrors.email = 'Невалиден имейл адрес';
        // }

        if (formData.chitalishtaUrl && !/^https?:\/\/.+/.test(formData.chitalishtaUrl)) {
            newErrors.chitalishtaUrl = 'Невалиден URL адрес';
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
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
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
        >
            <DialogTitle>
                {chitalishte ? 'Редактиране на читалище' : 'Добавяне на ново читалище'}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Име на читалището *"
                            value={formData.name}
                            onChange={handleChange('name')}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Населено място *"
                            value={formData.town}
                            onChange={handleChange('town')}
                            error={!!errors.town}
                            helperText={errors.town}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Община *"
                            value={formData.municipality}
                            onChange={handleChange('municipality')}
                            error={!!errors.municipality}
                            helperText={errors.municipality}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Област *"
                            value={formData.region}
                            onChange={handleChange('region')}
                            error={!!errors.region}
                            helperText={errors.region}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Адрес"
                            value={formData.address}
                            onChange={handleChange('address')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Телефон"
                            value={formData.phone}
                            onChange={handleChange('phone')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Имейл"
                            value={formData.email}
                            onChange={handleChange('email')}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Уебсайт"
                            value={formData.chitalishtaUrl}
                            onChange={handleChange('chitalishtaUrl')}
                            error={!!errors.chitalishtaUrl}
                            helperText={errors.chitalishtaUrl}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Булстат"
                            value={formData.bulstat}
                            onChange={handleChange('bulstat')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Председател"
                            value={formData.chairman}
                            onChange={handleChange('chairman')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Секретар"
                            value={formData.secretary}
                            onChange={handleChange('secretary')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Регистрационен номер"
                            value={formData.registrationNumber}
                            onChange={handleChange('registrationNumber')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Статус</InputLabel>
                            <Select
                                value={formData.status}
                                onChange={handleChange('status')}
                                label="Статус"
                            >
                                <MenuItem value="ACTIVE">Действащо</MenuItem>
                                <MenuItem value="INACTIVE">Неактивно</MenuItem>
                                <MenuItem value="CLOSED">Закрито</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отказ</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    startIcon={chitalishte ? <Edit /> : <Add />}
                >
                    {chitalishte ? 'Запази' : 'Добави'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// Main ChitalishteAdmin Component
const ChitalishteAdmin = () => {
    const dispatch = useDispatch();
    const allChitalishta = useSelector(selectAllChitalishta);
    const loading = useSelector(selectChitalishtaLoading);
    const error = useSelector(selectChitalishtaError);

    const [formOpen, setFormOpen] = useState(false);
    const [selectedChitalishte, setSelectedChitalishte] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [chitalishteToDelete, setChitalishteToDelete] = useState(null);
    const [selectedChitalishteForCards, setSelectedChitalishteForCards] = useState(null);

    // Пагинация и филтриране
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [regionFilter, setRegionFilter] = useState('');
    const [municipalityFilter, setMunicipalityFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        dispatch(fetchAllChitalishta({ page: 0, size: 1000 }));
    }, [dispatch]);

    // Филтриране на читалища
    const filteredChitalishta = allChitalishta.filter(chitalishte => {
        const matchesSearch = searchTerm === '' ||
            chitalishte.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chitalishte.town.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (chitalishte.municipality && chitalishte.municipality.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesRegion = regionFilter === '' || chitalishte.region === regionFilter;
        const matchesMunicipality = municipalityFilter === '' || chitalishte.municipality === municipalityFilter;
        const matchesStatus = statusFilter === '' || chitalishte.status === statusFilter;

        return matchesSearch && matchesRegion && matchesMunicipality && matchesStatus;
    });

    // Пагинация
    const totalPages = Math.ceil(filteredChitalishta.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedChitalishta = filteredChitalishta.slice(startIndex, startIndex + itemsPerPage);

    const handleCreate = () => {
        setSelectedChitalishte(null);
        setFormOpen(true);
    };

    const handleEdit = (chitalishte) => {
        setSelectedChitalishte(chitalishte);
        setFormOpen(true);
    };

    const handleDelete = (chitalishte) => {
        setChitalishteToDelete(chitalishte);
        setDeleteDialogOpen(true);
    };

    const handleInformationCards = (chitalishte) => {
        setSelectedChitalishteForCards(chitalishte);
    };

    const handleBackFromCards = () => {
        setSelectedChitalishteForCards(null);
    };

    const handleSubmit = (formData) => {
        if (selectedChitalishte) {
            dispatch(updateChitalishte({ id: selectedChitalishte.id, ...formData }))
                .then(() => {
                    setFormOpen(false);
                    dispatch(fetchAllChitalishta({ page: 0, size: 1000 }));
                });
        } else {
            dispatch(createChitalishte(formData))
                .then(() => {
                    setFormOpen(false);
                    dispatch(fetchAllChitalishta({ page: 0, size: 1000 }));
                });
        }
    };

    const confirmDelete = () => {
        if (chitalishteToDelete) {
            dispatch(deleteChitalishte(chitalishteToDelete.id))
                .then(() => {
                    setDeleteDialogOpen(false);
                    dispatch(fetchAllChitalishta({ page: 0, size: 1000 }));
                });
        }
    };

    const handleRefresh = () => {
        dispatch(fetchAllChitalishta({ page: 0, size: 1000 }));
        // Ресет на филтрите
        setSearchTerm('');
        setRegionFilter('');
        setMunicipalityFilter('');
        setStatusFilter('');
        setCurrentPage(1);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE': return 'success';
            case 'INACTIVE': return 'warning';
            case 'CLOSED': return 'error';
            default: return 'default';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'ACTIVE': return 'Действащо';
            case 'INACTIVE': return 'Неактивно';
            case 'CLOSED': return 'Закрито';
            default: return status;
        }
    };

    const getAvailableRegions = () => {
        const regions = [...new Set(allChitalishta.map(ch => ch.region))].filter(Boolean).sort();
        return regions;
    };

    const getAvailableMunicipalities = () => {
        const municipalities = [...new Set(allChitalishta.map(ch => ch.municipality))].filter(Boolean).sort();
        return municipalities;
    };

    // Копиране на ID на читалището
    const handleCopyId = (chitalishteId) => {
        navigator.clipboard.writeText(chitalishteId.toString());
        console.log('Chitalishte ID copied:', chitalishteId);
    };

    // Ако сме в режим на управление на информационни карти, показваме този компонент
    if (selectedChitalishteForCards) {
        return (
            <InformationCardsManager
                chitalishte={selectedChitalishteForCards}
                onBack={handleBackFromCards}
            />
        );
    }

    return (
        <Box sx={{ px: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, px: 3 }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
                    Управление на Читалища
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
                        Добави Читалище
                    </Button>
                </Box>
            </Box>

            {/* Error Alert */}
            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                    onClose={() => dispatch(clearError())}
                >
                    {error}
                </Alert>
            )}

            {/* Statistics */}
            {/* <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
              {allChitalishta.length}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Общ брой читалища
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h3" color="success.main" sx={{ fontWeight: 700 }}>
              {allChitalishta.filter(c => c.status === 'ACTIVE').length}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Действащи
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h3" color="warning.main" sx={{ fontWeight: 700 }}>
              {allChitalishta.filter(c => c.status === 'INACTIVE').length}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Неактивни
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h3" color="info.main" sx={{ fontWeight: 700 }}>
              {filteredChitalishta.length}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Филтрирани
            </Typography>
          </Paper>
        </Grid>
      </Grid> */}

            {/* Филтри и търсене */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Търсене по име, населено място или община"
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
                            placeholder="Име, населено място, община..."
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={2}>
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
                {(searchTerm || regionFilter || municipalityFilter || statusFilter) && (
                    <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
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
                        {regionFilter && (
                            <Chip
                                label={`Област: ${regionFilter}`}
                                size="small"
                                onDelete={() => {
                                    setRegionFilter('');
                                    setCurrentPage(1);
                                }}
                            />
                        )}
                        {municipalityFilter && (
                            <Chip
                                label={`Община: ${municipalityFilter}`}
                                size="small"
                                onDelete={() => {
                                    setMunicipalityFilter('');
                                    setCurrentPage(1);
                                }}
                            />
                        )}
                        {statusFilter && (
                            <Chip
                                label={`Статус: ${getStatusText(statusFilter)}`}
                                size="small"
                                onDelete={() => {
                                    setStatusFilter('');
                                    setCurrentPage(1);
                                }}
                            />
                        )}
                        <Button
                            size="small"
                            onClick={() => {
                                setSearchTerm('');
                                setRegionFilter('');
                                setMunicipalityFilter('');
                                setStatusFilter('');
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
                    Показване {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredChitalishta.length)} от {filteredChitalishta.length} читалища
                    {filteredChitalishta.length !== allChitalishta.length && ` (от общо ${allChitalishta.length})`}
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

            {/* Chitalishta Table */}
            <Box>
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '60px' }}>ID</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Име</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '120px' }}>Населено място</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '120px' }}>Община</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '120px' }}>Област</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '100px' }}>Статус</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '180px', textAlign: 'center' }}>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedChitalishta.map((chitalishte) => (
                                <Fade in={true} key={chitalishte.id}>
                                    <TableRow hover>
                                        <TableCell>
                                            <Tooltip title="Копирай ID">
                                                <Chip
                                                    label={`#${chitalishte.id}`}
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => handleCopyId(chitalishte.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                />
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Box>
                                                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                    {chitalishte.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                                                    {chitalishte.phone && (
                                                        <Tooltip title="Телефон">
                                                            <Chip
                                                                icon={<Phone sx={{ fontSize: 14 }} />}
                                                                label={chitalishte.phone}
                                                                size="small"
                                                                variant="outlined"
                                                                color="primary"
                                                            />
                                                        </Tooltip>
                                                    )}
                                                    {chitalishte.email && (
                                                        <Tooltip title="Имейл">
                                                            <Chip
                                                                icon={<Email sx={{ fontSize: 14 }} />}
                                                                label={chitalishte.email}
                                                                size="small"
                                                                variant="outlined"
                                                                color="secondary"
                                                            />
                                                        </Tooltip>
                                                    )}
                                                    {chitalishte.chitalishtaUrl && (
                                                        <Tooltip title="Уебсайт">
                                                            <Chip
                                                                icon={<Language sx={{ fontSize: 14 }} />}
                                                                label="Website"
                                                                size="small"
                                                                variant="outlined"
                                                                color="info"
                                                                onClick={() => window.open(chitalishte.chitalishtaUrl, '_blank')}
                                                                sx={{ cursor: 'pointer' }}
                                                            />
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                                <Typography variant="body2">
                                                    {chitalishte.town}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {chitalishte.municipality}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={chitalishte.region}
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={getStatusText(chitalishte.status)}
                                                color={getStatusColor(chitalishte.status)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                                <Tooltip title="Информационни карти">
                                                    <IconButton
                                                        color="info"
                                                        onClick={() => handleInformationCards(chitalishte)}
                                                        size="small"
                                                    >
                                                        <Assignment />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Редактирай">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleEdit(chitalishte)}
                                                        size="small"
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Изтрий">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDelete(chitalishte)}
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
            </Box>

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
            {filteredChitalishta.length === 0 && !loading && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Groups sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        {allChitalishta.length === 0
                            ? 'Няма намерени читалища'
                            : 'Няма резултати за текущите филтри'
                        }
                    </Typography>
                    <Button
                        startIcon={<Add />}
                        onClick={handleCreate}
                        variant="contained"
                        sx={{ mr: 2 }}
                    >
                        Добави първото читалище
                    </Button>
                    {(searchTerm || regionFilter || municipalityFilter || statusFilter) && (
                        <Button
                            onClick={() => {
                                setSearchTerm('');
                                setRegionFilter('');
                                setMunicipalityFilter('');
                                setStatusFilter('');
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
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Forms and Dialogs */}
            <ChitalishteForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                chitalishte={selectedChitalishte}
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
                        Сигурни ли сте, че искате да изтриете читалището "{chitalishteToDelete?.name}"?
                        Това действие е необратимо.
                    </Typography>
                    {chitalishteToDelete && (
                        <Box sx={{ mt: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Детайли:</strong><br />
                                Населено място: {chitalishteToDelete.town}<br />
                                Община: {chitalishteToDelete.municipality}<br />
                                Област: {chitalishteToDelete.region}
                            </Typography>
                        </Box>
                    )}
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

export default ChitalishteAdmin;