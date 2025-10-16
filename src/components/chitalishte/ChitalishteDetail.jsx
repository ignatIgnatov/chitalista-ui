import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentChitalishte } from '../../store/slices/chitalishtaSlice';
import { selectInformationCardsByChitalishteId } from '../../store/slices/chitalishtaSlice';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Tabs,
  Tab,
  Grid,
  Chip,
  Card,
  CardContent,
  Fade,
  Slide,
  Grow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Phone,
  Email,
  Language,
  LocationOn,
  Groups,
  School,
  Business,
  LibraryBooks,
  Home,
  ArrowBack,
  Event,
  Work,
  People,
  Star,
  Public,
  History,
  TrendingUp,
  Group,
  Book,
  Museum,
  TheaterComedy,
  MusicNote,
  Sports
} from '@mui/icons-material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`chitalishte-tabpanel-${index}`}
      aria-labelledby={`chitalishte-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const YearlyDataTable = ({ informationCards }) => {
  if (!informationCards || informationCards.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" color="text.secondary">
          Няма налични данни за информационни карти
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {informationCards.map((card, index) => (
        <Box key={card.id || index} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Информационна карта {card.year ? `за ${card.year} година` : ''}
          </Typography>
          <TableContainer component={Paper} elevation={2}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Показател</TableCell>
                  <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Стойност</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {card.totalMembersCount !== undefined && (
                  <TableRow hover>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                      Общ брой членове
                    </TableCell>
                    <TableCell align="right">{card.totalMembersCount}</TableCell>
                  </TableRow>
                )}
                {card.newMembers !== undefined && (
                  <TableRow hover>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                      Нови членове
                    </TableCell>
                    <TableCell align="right">{card.newMembers}</TableCell>
                  </TableRow>
                )}
                {card.employeesCount !== undefined && (
                  <TableRow hover>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                      Брой служители
                    </TableCell>
                    <TableCell align="right">{card.employeesCount}</TableCell>
                  </TableRow>
                )}
                {card.folkloreFormations !== undefined && (
                  <TableRow hover>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                      Фолклорни формации
                    </TableCell>
                    <TableCell align="right">{card.folkloreFormations}</TableCell>
                  </TableRow>
                )}
                {card.theatreFormations !== undefined && (
                  <TableRow hover>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                      Театрални формации
                    </TableCell>
                    <TableCell align="right">{card.theatreFormations}</TableCell>
                  </TableRow>
                )}
                {card.dancingGroups !== undefined && (
                  <TableRow hover>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                      Танцови групи
                    </TableCell>
                    <TableCell align="right">{card.dancingGroups}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
};

const CulturalActivitiesSection = ({ informationCards }) => {
  if (!informationCards || informationCards.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" color="text.secondary">
          Няма данни за културни дейности
        </Typography>
      </Box>
    );
  }

  const culturalFields = [
    { key: 'folkloreFormations', label: 'Фолклорни формации', icon: <MusicNote /> },
    { key: 'theatreFormations', label: 'Театрални формации', icon: <TheaterComedy /> },
    { key: 'dancingGroups', label: 'Танцови групи', icon: <Sports /> },
    { key: 'vocalGroups', label: 'Вокални групи', icon: <MusicNote /> },
    { key: 'workshopsClubsArts', label: 'Клубове по изкуства', icon: <Book /> },
    { key: 'museumCollections', label: 'Музейни колекции', icon: <Museum /> }
  ];

  return (
    <Box>
      {informationCards.map((card, index) => (
        <Box key={card.id || index} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, color: 'secondary.main' }}>
            Културни дейности {card.year ? `(${card.year} година)` : ''}
          </Typography>
          <Grid container spacing={2}>
            {culturalFields.map(field => {
              if (card[field.key] === undefined) return null;

              return (
                <Grid item xs={12} sm={6} md={4} key={field.key}>
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}
                    elevation={3}
                  >
                    <Box sx={{ mb: 1 }}>
                      {field.icon}
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {card[field.key]}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {field.label}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

const ProjectsAndStaffSection = ({ informationCards }) => {
  if (!informationCards || informationCards.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" color="text.secondary">
          Няма данни за проекти и персонал
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {informationCards.map((card, index) => (
        <Box key={card.id || index} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{card.year ? `${card.year} година` : 'Данни'}</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }} color="primary">Проекти</Typography>
                <Box sx={{ space: 1 }}>
                  {card.projectsParticipationLeading !== undefined && (
                    <Typography>
                      <strong>Самостоятелни проекти:</strong> {card.projectsParticipationLeading}
                    </Typography>
                  )}
                  {card.projectsParticipationPartner !== undefined && (
                    <Typography>
                      <strong>Проекти в сътрудничество:</strong> {card.projectsParticipationPartner}
                    </Typography>
                  )}
                  {card.participationInTrainings !== undefined && (
                    <Typography>
                      <strong>Участия в обучения:</strong> {card.participationInTrainings}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }} color="secondary">Персонал</Typography>
                <Box sx={{ space: 1 }}>
                  {card.employeesCount !== undefined && (
                    <Typography>
                      <strong>Общ персонал:</strong> {card.employeesCount}
                    </Typography>
                  )}
                  {card.subsidiaryCount !== undefined && (
                    <Typography>
                      <strong>Субсидирани бройки:</strong> {card.subsidiaryCount}
                    </Typography>
                  )}
                  {card.employeesWithHigherEducation !== undefined && (
                    <Typography>
                      <strong>Специалисти с висше:</strong> {card.employeesWithHigherEducation}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

const ChitalishteDetail = ({ chitalishte }) => {
  const dispatch = useDispatch();
  const informationCards = useSelector((state) =>
    selectInformationCardsByChitalishteId(state, chitalishte?.id)
  );
  const [tabValue, setTabValue] = React.useState(0);

  if (!chitalishte) {
    return null;
  }

  const handleBack = () => {
    dispatch(clearCurrentChitalishte());
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const {
    name,
    town,
    municipality,
    region,
    address,
    phone,
    email,
    chitalishtaUrl,
    chairman,
    secretary,
    bulstat,
    status,
    registrationNumber
  } = chitalishte;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{
            mb: 2,
            borderRadius: 2,
            px: 3
          }}
          variant="outlined"
        >
          Назад
        </Button>

        <Paper sx={{
          p: 4,
          background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
          color: 'white',
          borderRadius: 3,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}
              >
                <Groups sx={{ fontSize: 60, color: 'white' }} />
              </Box>
            </Grid>
            <Grid item xs>
              <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 300, lineHeight: 1.2 }}>
                {name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 1, fontSize: 24 }} />
                  <Typography variant="h6" sx={{ fontWeight: 400 }}>
                    {address}, {town}, {municipality}, {region}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Contact Actions */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap' }}>
            {phone && (
              <Button
                variant="contained"
                startIcon={<Phone />}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                  borderRadius: 2,
                  px: 3,
                  py: 1
                }}
              >
                {phone}
              </Button>
            )}
            {email && (
              <Button
                variant="contained"
                startIcon={<Email />}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                  borderRadius: 2,
                  px: 3,
                  py: 1
                }}
              >
                {email}
              </Button>
            )}
            {chitalishtaUrl && (
              <Button
                variant="contained"
                startIcon={<Language />}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                  borderRadius: 2,
                  px: 3,
                  py: 1
                }}
                href={chitalishtaUrl.startsWith('http') ? chitalishtaUrl : `https://${chitalishtaUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Уебсайт
              </Button>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Information Cards Alert */}
      {informationCards.length === 0 && (
        <Box sx={{ mb: 4 }}>
          <Paper sx={{
            p: 3,
            background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
            borderRadius: 3
          }}>
            <Typography variant="h6" color="warning.dark" sx={{ mb: 1 }}>
              ℹ️ Информационни карти
            </Typography>
            <Typography color="warning.dark">
              За това читалище все още няма качени информационни карти. Данните ще станат достъпни след като бъдат добавени от администратора.
            </Typography>
          </Paper>
        </Box>
      )}

      {/* Tabs */}
      <Paper sx={{
        width: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper'
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: '#3f51b5',
              height: 3
            }
          }}
        >
          <Tab label="Основна информация" sx={{ fontSize: '1rem', py: 2 }} />
          <Tab label="Статистика по години" sx={{ fontSize: '1rem', py: 2 }} />
          <Tab label="Културни дейности" sx={{ fontSize: '1rem', py: 2 }} />
          <Tab label="Проекти и персонал" sx={{ fontSize: '1rem', py: 2 }} />
        </Tabs>

        {/* Basic Info Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                  Контактна информация
                </Typography>
                <Box sx={{ space: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                    <LocationOn sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Адрес</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{address || 'Няма данни'}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                    <Business sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Община</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{municipality || 'Няма данни'}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                    <Business sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Област</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{region || 'Няма данни'}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                  Ръководство и регистрация
                </Typography>
                <Box sx={{ space: 2 }}>
                  {chairman && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                      <People sx={{ mr: 2, color: 'secondary.main', fontSize: 28 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Председател</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{chairman}</Typography>
                      </Box>
                    </Box>
                  )}

                  {secretary && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                      <Work sx={{ mr: 2, color: 'secondary.main', fontSize: 28 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Секретар</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{secretary}</Typography>
                      </Box>
                    </Box>
                  )}

                  {bulstat && (
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                      <LibraryBooks sx={{ mr: 2, color: 'secondary.main', fontSize: 28 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Булстат</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{bulstat}</Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                  Допълнителна информация
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip
                    icon={<Home />}
                    label={`Статус: ${status || 'Действащо'}`}
                    variant="filled"
                    color={status === 'Закрито' ? 'error' : 'success'}
                    sx={{ px: 2, py: 1, fontSize: '0.9rem' }}
                  />
                  <Chip
                    icon={<People />}
                    label={`Рег. номер: ${registrationNumber || 'Няма данни'}`}
                    variant="outlined"
                    sx={{ px: 2, py: 1, fontSize: '0.9rem' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Yearly Statistics Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3 }}>
            <Typography variant="h4" sx={{ mb: 4, color: 'primary.main', fontWeight: 600 }}>
              Статистика по години
            </Typography>
            <YearlyDataTable informationCards={informationCards} />
          </Box>
        </TabPanel>

        {/* Cultural Activities Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 3 }}>
            <Typography variant="h4" sx={{ mb: 4, color: 'primary.main', fontWeight: 600 }}>
              Културни дейности
            </Typography>
            <CulturalActivitiesSection informationCards={informationCards} />
          </Box>
        </TabPanel>

        {/* Projects and Staff Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ px: 3 }}>
            <Typography variant="h4" sx={{ mb: 4, color: 'primary.main', fontWeight: 600 }}>
              Проекти и персонал
            </Typography>
            <ProjectsAndStaffSection informationCards={informationCards} />
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default ChitalishteDetail;