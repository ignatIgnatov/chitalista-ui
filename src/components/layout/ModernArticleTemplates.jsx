import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton
} from '@mui/material';
import { CalendarToday, Person, ArrowOutward } from '@mui/icons-material';

// Glassmorphic Modern Template
export const ModernTemplate = ({ article }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mb-12"
  >
    <Card className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 group">
      <div className="relative overflow-hidden">
        {article.images && article.images[0] && (
          <img
            src={article.images[0].imageUrl}
            alt={article.images[0].altText}
            className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-4 left-4">
          <Chip
            label={article.template}
            className="bg-white/90 backdrop-blur-sm text-blue-600 font-semibold"
            size="small"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-8">
        <Box className="flex items-center gap-4 mb-4 text-gray-600">
          <Box className="flex items-center gap-1">
            <CalendarToday sx={{ fontSize: 18 }} />
            <Typography variant="body2">
              {new Date(article.createdAt).toLocaleDateString('bg-BG')}
            </Typography>
          </Box>
          <Box className="flex items-center gap-1">
            <Person sx={{ fontSize: 18 }} />
            <Typography variant="body2">Администратор</Typography>
          </Box>
        </Box>

        <Typography 
          variant="h3" 
          className="font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight"
        >
          {article.title}
        </Typography>

        <Typography 
          variant="body1" 
          className="text-gray-600 leading-relaxed mb-6 line-clamp-3"
        >
          {article.content}
        </Typography>

        <Box className="flex justify-between items-center">
          <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
            <button className="flex items-center gap-2 text-blue-600 font-semibold group/btn">
              Прочети повече
              <ArrowOutward className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-200" />
            </button>
          </motion.div>
          
          <div className="flex gap-2">
            {article.images && article.images.slice(0, 3).map((img, index) => (
              <div key={index} className="w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden">
                <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </Box>
      </CardContent>
    </Card>
  </motion.div>
);

// Minimal Template
export const MinimalTemplate = ({ article }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mb-8"
  >
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300 group">
      <Box className="flex flex-col md:flex-row gap-8 items-start">
        {article.images && article.images[0] && (
          <div className="flex-shrink-0 w-full md:w-64 h-48 rounded-xl overflow-hidden">
            <img
              src={article.images[0].imageUrl}
              alt={article.images[0].altText}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        
        <Box className="flex-1">
          <Chip
            label={article.template}
            className="bg-gray-100 text-gray-700 mb-4"
            size="small"
          />
          
          <Typography 
            variant="h4" 
            className="font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300"
          >
            {article.title}
          </Typography>

          <Typography 
            variant="body1" 
            className="text-gray-600 leading-relaxed mb-4"
          >
            {article.content.substring(0, 200)}...
          </Typography>

          <Box className="flex items-center justify-between">
            <Typography variant="body2" className="text-gray-500">
              {new Date(article.createdAt).toLocaleDateString('bg-BG')}
            </Typography>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Прочети
            </motion.button>
          </Box>
        </Box>
      </Box>
    </div>
  </motion.div>
);

// Interactive Card Template
export const CardTemplate = ({ article }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.4 }}
    className="mb-6"
  >
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
      {article.images && article.images[0] && (
        <div className="relative mb-4 rounded-xl overflow-hidden">
          <img
            src={article.images[0].imageUrl}
            alt={article.images[0].altText}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <Chip
              label={article.template}
              className="bg-black/70 text-white backdrop-blur-sm"
              size="small"
            />
          </div>
        </div>
      )}

      <Typography 
        variant="h5" 
        className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300"
      >
        {article.title}
      </Typography>

      <Typography 
        variant="body2" 
        className="text-gray-600 mb-4 line-clamp-3"
      >
        {article.content}
      </Typography>

      <Box className="flex items-center justify-between">
        <Typography variant="caption" className="text-gray-500">
          {new Date(article.createdAt).toLocaleDateString('bg-BG')}
        </Typography>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white"
        >
          →
        </motion.div>
      </Box>
    </div>
  </motion.div>
);

// Template Selector
export const ArticleTemplate = ({ article, variant = 'modern' }) => {
  const templates = {
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    card: CardTemplate
  };

  const TemplateComponent = templates[variant] || ModernTemplate;
  
  return <TemplateComponent article={article} />;
};