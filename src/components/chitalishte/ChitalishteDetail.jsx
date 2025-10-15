import React from 'react';
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
  Divider,
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
  People
} from '@mui/icons-material';
import { useChitalishte } from '../../contexts/ChitalishteContext';

// Импортираме fieldLabels директно от data файла
import { fieldLabels } from '../../data/chitalishteData';

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

const YearlyDataTable = ({ data, year }) => {
  if (!data) return null;

  const significantFields = [
    'total_members_count',
    'membership_applications',
    'new_members',
    'rejected_members',
    'employees_count',
    'subsidiary_count',
    'projects_participation_leading',
    'projects_participation_partner',
    'participation_in_trainings',
    'library_activity'
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Данни за {year} година</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Показател</TableCell>
              <TableCell align="right">Стойност</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {significantFields.map(field => (
              <TableRow key={field}>
                <TableCell component="th" scope="row">
                  {fieldLabels[field]}
                </TableCell>
                <TableCell align="right">
                  {data[field] || data[field] === 0 ? data[field] : 'Няма данни'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const CulturalActivitiesSection = ({ data, year }) => {
  const culturalFields = [
    'folklore_formations',
    'theatre_formations',
    'dancing_groups',
    'modern_ballet',
    'vocal_groups',
    'workshops_clubs_arts',
    'language_courses',
    'kraeznanie_clubs',
    'museum_collections'
  ];

  const hasCulturalData = culturalFields.some(field => data[field]);

  if (!hasCulturalData) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Културни дейности ({year})</Typography>
      <Grid container spacing={1}>
        {culturalFields.map(field => {
          if (!data[field] && data[field] !== 0) return null;
          
          return (
            <Grid item xs={12} sm={6} md={4} key={field}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {data[field]}
                </Typography>
                <Typography variant="body2">
                  {fieldLabels[field]}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

const ChitalishteDetail = () => {
  const { selectedChitalishte, dispatch } = useChitalishte();
  const [tabValue, setTabValue] = React.useState(0);

  if (!selectedChitalishte) {
    return null;
  }

  const handleBack = () => {
    dispatch({ type: 'SELECT_CHITALISHTE', payload: null });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const {
    name,
    location,
    municipality,
    region,
    address,
    phones = [],
    emails = [],
    website,
    social_media,
    chairman,
    secretary,
    eik,
    is_registered,
    building_ownership,
    population,
    yearlyData = {}
  } = selectedChitalishte;

  const ownershipLabels = {
    unknown: 'Не е известно',
    chitalishte: 'На читалището',
    municipal: 'Общинска',
    state: 'Държавна'
  };

  const registeredLabels = {
    yes: 'Да',
    no: 'Не',
    unknown: 'Няма данни'
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Назад към списъка
        </Button>
        
        <Paper sx={{ p: 4, background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)', color: 'white' }}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Groups sx={{ fontSize: 48, color: 'white' }} />
              </Box>
            </Grid>
            <Grid item xs>
              <Typography variant="h3" component="h1" sx={{ mb: 1, fontWeight: 300 }}>
                {name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {address}, {municipality}, {region}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Contact Actions */}
          <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
            {phones.map((phone, index) => (
              <Button
                key={index}
                variant="contained"
                startIcon={<Phone />}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
              >
                {phone}
              </Button>
            ))}
            {emails.map((email, index) => (
              <Button
                key={index}
                variant="contained"
                startIcon={<Email />}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
              >
                {email}
              </Button>
            ))}
            {website && (
              <Button
                variant="contained"
                startIcon={<Language />}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
                href={website.startsWith('http') ? website : `https://${website}`}
                target="_blank"
              >
                Уебсайт
              </Button>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Tabs */}
      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Основна информация" />
          <Tab label="Статистика по години" />
          <Tab label="Културни дейности" />
          <Tab label="Проекти и персонал" />
        </Tabs>

        {/* Basic Info Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>Контактна информация</Typography>
              <Box sx={{ space: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography><strong>Адрес:</strong> {address || 'Няма данни'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Business sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography><strong>Община:</strong> {municipality || 'Няма данни'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Business sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography><strong>Област:</strong> {region || 'Няма данни'}</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>Ръководство и регистрация</Typography>
              <Box sx={{ space: 1 }}>
                {chairman && (
                  <Typography sx={{ mb: 1 }}><strong>Председател:</strong> {chairman}</Typography>
                )}
                {secretary && (
                  <Typography sx={{ mb: 1 }}><strong>Секретар:</strong> {secretary}</Typography>
                )}
                {eik && (
                  <Typography sx={{ mb: 1 }}><strong>ЕИК:</strong> {eik}</Typography>
                )}
                <Typography sx={{ mb: 1 }}>
                  <strong>Регистрация:</strong> {registeredLabels[is_registered] || 'Няма данни'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>Допълнителна информация</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  icon={<Home />}
                  label={`Собственост: ${ownershipLabels[building_ownership] || 'Няма данни'}`}
                  variant="outlined"
                />
                <Chip 
                  icon={<People />}
                  label={`Жители: ${population ? population.toLocaleString() : 'Няма данни'}`}
                  variant="outlined"
                />
                {social_media && (
                  <Chip 
                    icon={<Language />}
                    label={`Социални мрежи: ${social_media}`}
                    variant="outlined"
                    clickable
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Yearly Statistics Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" sx={{ mb: 3 }}>Статистика по години</Typography>
          
          {[2023, 2022, 2021].map(year => (
            yearlyData[year] && (
              <YearlyDataTable 
                key={year}
                data={yearlyData[year]}
                year={year}
              />
            )
          ))}
        </TabPanel>

        {/* Cultural Activities Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" sx={{ mb: 3 }}>Културни дейности</Typography>
          
          {[2023, 2022, 2021].map(year => (
            yearlyData[year] && (
              <CulturalActivitiesSection 
                key={year}
                data={yearlyData[year]}
                year={year}
              />
            )
          ))}
        </TabPanel>

        {/* Projects and Staff Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h5" sx={{ mb: 3 }}>Проекти и персонал</Typography>
          
          {[2023, 2022, 2021].map(year => (
            yearlyData[year] && (
              <Box key={year} sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>{year} година</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2 }} color="primary">Проекти</Typography>
                      <Box sx={{ space: 1 }}>
                        <Typography>
                          <strong>Самостоятелни проекти:</strong> {yearlyData[year].projects_participation_leading || 0}
                        </Typography>
                        <Typography>
                          <strong>Проекти в сътрудничество:</strong> {yearlyData[year].projects_participation_partner || 0}
                        </Typography>
                        <Typography>
                          <strong>Участия в обучения:</strong> {yearlyData[year].participation_in_trainings || 0}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2 }} color="secondary">Персонал</Typography>
                      <Box sx={{ space: 1 }}>
                        <Typography>
                          <strong>Общ персонал:</strong> {yearlyData[year].employees_count || 0}
                        </Typography>
                        <Typography>
                          <strong>Субсидирани бройки:</strong> {yearlyData[year].subsidiary_count || 0}
                        </Typography>
                        <Typography>
                          <strong>Специалисти с висше:</strong> {yearlyData[year].employees_with_higher_education || 0}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )
          ))}
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default ChitalishteDetail;