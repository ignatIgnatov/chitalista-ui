import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Alert
} from '@mui/material';
import { createArticle, clearError } from '../../store/slices/articlesSlice';
import ImageUpload from './ImageUpload';

const ArticleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.articles);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    template: 'CLASSIC',
    images: [],
    published: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(createArticle(formData));
    
    if (result.type === 'articles/createArticle/fulfilled') {
      // Reset формата и navigate към dashboard
      setFormData({
        title: '',
        content: '',
        template: 'CLASSIC',
        images: [],
        published: true
      });
      navigate('/admin/dashboard');
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
    
    // Изчистване на грешките при промяна на полетата
    if (error) {
      dispatch(clearError());
    }
  };

  const handleImagesChange = (images) => {
    setFormData({
      ...formData,
      images: images
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <Box className="space-y-6">
          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Заглавие"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            variant="outlined"
          />
          
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Съдържание"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            variant="outlined"
          />
          
          <FormControl fullWidth variant="outlined">
            <InputLabel>Шаблон</InputLabel>
            <Select
              name="template"
              value={formData.template}
              onChange={handleChange}
              label="Шаблон"
            >
              <MenuItem value="CLASSIC">Класически</MenuItem>
              <MenuItem value="MODERN">Модерен</MenuItem>
              <MenuItem value="FOCUS">Фокус</MenuItem>
            </Select>
          </FormControl>

          <ImageUpload 
            onImagesChange={handleImagesChange}
            existingImages={formData.images}
          />

          <FormControlLabel
            control={
              <Switch
                name="published"
                checked={formData.published}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Публикуване"
          />
          
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-semibold"
          >
            {loading ? 'Публикуване...' : 'Публикувай статия'}
          </Button>
        </Box>
      </form>
    </motion.div>
  );
};

export default ArticleForm;