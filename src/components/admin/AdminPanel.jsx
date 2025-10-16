import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  AdminPanelSettings,
  Groups
} from '@mui/icons-material';
import { 
  selectUser, 
  selectIsAdmin,
  getCurrentUser 
} from '../../store/slices/authSlice';
import ChitalishteAdmin from '../admin/ChitalishteAdmin';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminPanel = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const [tabValue, setTabValue] = useState(0);
  const [unauthorizedDialog, setUnauthorizedDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await dispatch(getCurrentUser());
      }
      setLoading(false);
    };
    
    checkAuth();
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    if (!isAdmin) {
      setUnauthorizedDialog(true);
      return;
    }
    setTabValue(newValue);
  };

  const handleCloseUnauthorizedDialog = () => {
    setUnauthorizedDialog(false);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAdmin) {
    return (
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <AdminPanelSettings sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant="h4" color="error" sx={{ mb: 2 }}>
            Достъп Отказан
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Нямате ADMIN права за достъп до този панел.
            </Typography>
            {user ? (
              <>
                <Typography variant="body2">
                  Влезли сте като: <strong>{user.username}</strong>
                </Typography>
                <Typography variant="body2">
                  Роли: <strong>{user.roles?.join(', ')}</strong>
                </Typography>
              </>
            ) : (
              <Typography variant="body2">
                Моля, влезте в системата с административен акаунт.
              </Typography>
            )}
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 2
    }}>
      <Container maxWidth="xl">
        {/* Debug Info */}
        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="body2">
            Добре дошлъл, администратор!
          </Typography>
        </Alert>

        {/* Header */}
        <Paper sx={{
          p: 4,
          mb: 3,
          background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
          color: 'white',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AdminPanelSettings sx={{ fontSize: 48, mr: 2 }} />
              <Box>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                  Административен Панел
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 300 }}>
                  Управление на читалища и информационни карти
                </Typography>
              </Box>
            </Box>
           
          </Box>
        </Paper>

        {/* Tabs */}
        <Paper sx={{ width: '100%', borderRadius: 3, overflow: 'hidden' }}>
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
            <Tab 
              icon={<Groups />} 
              iconPosition="start"
              label="Управление на читалища" 
              sx={{ fontSize: '1rem', py: 2, fontWeight: 600 }}
            />
          </Tabs>

          {/* Chitalishta Management Tab */}
          <TabPanel value={tabValue} index={0}>
            <ChitalishteAdmin />
          </TabPanel>
        </Paper>

        {/* Unauthorized Dialog */}
        <Dialog
          open={unauthorizedDialog}
          onClose={handleCloseUnauthorizedDialog}
        >
          <DialogTitle color="error">
            Достъп Отказан
          </DialogTitle>
          <DialogContent>
            <Typography>
              Нямате необходимите права за достъп до тази функционалност.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUnauthorizedDialog}>
              Разбирам
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminPanel;