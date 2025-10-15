import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Typography,
  Alert
} from '@mui/material';
import { login, clearError } from '../../store/slices/authSlice';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (result.type === 'auth/login/fulfilled') {
      navigate('/admin/dashboard');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-2xl rounded-2xl max-w-md w-full">
          <CardContent className="p-8">
            <Typography 
              variant="h4" 
              className="font-bold text-center mb-8 text-gray-800"
            >
              Административен вход
            </Typography>

            {error && (
              <Alert severity="error" className="mb-4">
                Грешно потребителско име или парола
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box className="space-y-4">
                <TextField
                  fullWidth
                  label="Потребителско име"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
                
                <TextField
                  fullWidth
                  type="password"
                  label="Парола"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold"
                >
                  {loading ? 'Вход...' : 'Вход'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;