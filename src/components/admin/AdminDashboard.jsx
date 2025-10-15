import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { logout } from '../../store/slices/authSlice';
import ArticleForm from './ArticleForm';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <Container>
          <Box className="flex justify-between items-center py-4">
            <Typography variant="h4" className="font-bold text-gray-800">
              Административен панел
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Logout />}
              onClick={handleLogout}
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              Изход
            </Button>
          </Box>
        </Container>
      </motion.header>

      {/* Main Content */}
      <Container className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-xl rounded-2xl mb-8">
            <CardContent className="p-6">
              <Typography variant="h5" className="font-bold mb-4 text-gray-800">
                Създаване на нова статия
              </Typography>
              <ArticleForm />
            </CardContent>
          </Card>

          {/* Статистика или други административни функции могат да се добавят тук */}
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <Typography variant="h5" className="font-bold mb-4 text-gray-800">
                Бързи действия
              </Typography>
              <Box className="flex gap-4">
                <Button variant="contained" className="bg-blue-600">
                  Преглед на всички статии
                </Button>
                <Button variant="outlined">
                  Управление на потребители
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default AdminDashboard;