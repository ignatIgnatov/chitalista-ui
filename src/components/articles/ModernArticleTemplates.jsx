import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  IconButton
} from '@mui/material';
import { CalendarToday, Person, ArrowOutward, Favorite, Share, Bookmark, Comment, Visibility } from '@mui/icons-material';

// 1. ENHANCED CLASSIC TEMPLATE - Модернизиран класически дизайн
export const ClassicTemplate = ({ article }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/article/${article.id}`);
  };

  const handleExplore = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <Card className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-gray-100">
        <div className="md:flex">
          {/* Image Section */}
          {article.images && article.images[0] && (
            <motion.div 
              className="md:w-2/5 relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={article.images[0].imageUrl}
                alt={article.images[0].altText}
                className="w-full h-64 md:h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Chip
                  label="Класически"
                  className="bg-white/95 backdrop-blur-sm text-blue-600 font-semibold shadow-md"
                  size="small"
                />
              </div>
              
              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <IconButton size="small" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                  <Bookmark fontSize="small" />
                </IconButton>
                <IconButton size="small" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                  <Share fontSize="small" />
                </IconButton>
              </div>
            </motion.div>
          )}

          {/* Content Section */}
          <motion.div 
            className="md:w-3/5 p-6 md:p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Meta Information */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-3">
                <Avatar 
                  sx={{ width: 32, height: 32 }} 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm"
                >
                  Ч
                </Avatar>
                <div>
                  <Typography variant="body2" className="font-semibold text-gray-900">
                    Народни Читалища
                  </Typography>
                  <div className="flex items-center gap-3 text-gray-500 text-xs">
                    <div className="flex items-center gap-1">
                      <CalendarToday fontSize="small" />
                      <span>{new Date(article.createdAt).toLocaleDateString('bg-BG')}</span>
                    </div>
                    <span>•</span>
                    <span>5 мин четене</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              {article.title}
            </motion.h2>

            {/* Content Excerpt */}
            <Typography 
              className="text-gray-600 leading-relaxed mb-6 line-clamp-3 text-lg"
            >
              {article.content}
            </Typography>

            {/* Additional Images Gallery */}
            {article.images && article.images.length > 1 && (
              <motion.div 
                className="flex gap-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {article.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="relative group/image">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 border-white shadow-md">
                      <img
                        src={image.imageUrl}
                        alt={image.altText}
                        className="w-full h-full object-cover transform group-hover/image:scale-110 transition-transform duration-300"
                      />
                    </div>
                    {index === 2 && article.images.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">+{article.images.length - 4}</span>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* Engagement Stats and Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200">
                    <Favorite fontSize="small" />
                    <span className="text-sm">42</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 hover:text-blue-500 transition-colors duration-200">
                    <Comment fontSize="small" />
                    <span className="text-sm">8</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 hover:text-green-500 transition-colors duration-200">
                    <Bookmark fontSize="small" />
                    <span className="text-sm">12</span>
                  </button>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReadMore}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Прочети статията
                <ArrowOutward fontSize="small" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </Card>
    </motion.div>
  );
};

// 2. MINIMAL DARK TEMPLATE - Минималистичен тъмен дизайн
export const MinimalDarkTemplate = ({ article }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="mb-8"
    >
      <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-500 group">
        <div className="p-8">
          {/* Meta Information */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm font-medium">Модерен</span>
            </div>
            <div className="text-gray-500 text-sm">
              {new Date(article.createdAt).toLocaleDateString('bg-BG')}
            </div>
          </div>

          {/* Title */}
          <motion.h2 
            className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-green-400 transition-colors duration-300"
            whileHover={{ x: 10 }}
          >
            {article.title}
          </motion.h2>

          {/* Content */}
          <Typography 
            className="text-gray-400 leading-relaxed mb-6 line-clamp-4"
          >
            {article.content}
          </Typography>

          {/* Single Hero Image */}
          {article.images && article.images[0] && (
            <motion.div 
              className="mb-6 rounded-lg overflow-hidden cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={handleExplore}
            >
              <img
                src={article.images[0].imageUrl}
                alt={article.images[0].altText}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          )}

          {/* Stats and Actions */}
          <div className="flex justify-between items-center">
            <div className="flex gap-6 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <Favorite fontSize="small" />
                <span>256</span>
              </div>
              <div className="flex items-center gap-1">
                <Comment fontSize="small" />
                <span>32</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#10B981" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExplore}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-200"
            >
              Разгледай
            </motion.button>
          </div>
        </div>

        {/* Accent Border */}
        <div className="h-1 bg-gradient-to-r from-green-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </div>
    </motion.div>
  );
};

// 3. MAGAZINE TEMPLATE - Стил на модерно списание
export const MagazineTemplate = ({ article }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-10"
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
        <div className="md:flex">
          {/* Image Section */}
          {article.images && article.images[0] && (
            <motion.div 
              className="md:w-2/5 relative overflow-hidden cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={handleReadMore}
            >
              <img
                src={article.images[0].imageUrl}
                alt={article.images[0].altText}
                className="w-full h-80 md:h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <Chip
                  label="Фокус"
                  className="bg-white/90 backdrop-blur-sm text-gray-800 font-semibold"
                  size="small"
                />
              </div>
            </motion.div>
          )}

          {/* Content Section */}
          <motion.div 
            className="md:w-3/5 p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-4 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <CalendarToday fontSize="small" />
                <span>{new Date(article.createdAt).toLocaleDateString('bg-BG')}</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <Person fontSize="small" />
                <span>Екип Читалища</span>
              </div>
            </div>

            {/* Title */}
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
              onClick={handleReadMore}
            >
              {article.title}
            </motion.h2>

            {/* Excerpt */}
            <Typography 
              className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-4 cursor-pointer"
              onClick={handleReadMore}
            >
              {article.content}
            </Typography>

            {/* Additional Images */}
            {article.images && article.images.length > 1 && (
              <div className="flex gap-3 mb-6">
                {article.images.slice(1, 4).map((image, index) => (
                  <div 
                    key={index} 
                    className="w-20 h-20 rounded-lg overflow-hidden border-2 border-white shadow-lg cursor-pointer"
                    onClick={handleReadMore}
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.altText}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReadMore}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
              >
                Прочети статията
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
              >
                <Share fontSize="small" className="mr-2" />
                Сподели
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Template Selector
export const ArticleTemplate = ({ article }) => {
  const templates = {
    CLASSIC: ClassicTemplate,      // Подобрен класически
    MODERN: MinimalDarkTemplate,   // Минималистичен тъмен
    FOCUS: MagazineTemplate        // Списание
  };

  const TemplateComponent = templates[article.template] || ClassicTemplate;
  
  return <TemplateComponent article={article} />;
};

// ArticleGrid Component
export const ArticleGrid = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <Typography variant="h6" className="text-gray-500">
          Няма намерени статии
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {articles.map((article, index) => (
        <ArticleTemplate key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleTemplate;