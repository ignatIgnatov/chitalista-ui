import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box
} from '@mui/material';

// Classic Template
export const ClassicTemplate = ({ article }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-8 shadow-lg rounded-xl overflow-hidden">
      {article.images && article.images[0] && (
        <CardMedia
          component="img"
          height="300"
          image={article.images[0].imageUrl}
          alt={article.images[0].altText}
          className="object-cover"
        />
      )}
      <CardContent className="p-6">
        <Typography variant="h4" className="font-bold mb-4 text-gray-800">
          {article.title}
        </Typography>
        <Typography 
          variant="body1" 
          className="text-gray-600 leading-relaxed whitespace-pre-line"
        >
          {article.content}
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
);

// Modern Template
export const ModernTemplate = ({ article }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
      <div className="md:flex">
        {article.images && article.images[0] && (
          <div className="md:flex-shrink-0 md:w-1/3">
            <img
              className="h-64 w-full object-cover md:h-full"
              src={article.images[0].imageUrl}
              alt={article.images[0].altText}
            />
          </div>
        )}
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
            Статия
          </div>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {article.title}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-line">
            {article.content}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

// Focus Template
export const FocusTemplate = ({ article }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.7 }}
    className="relative mb-8"
  >
    <div className="relative h-96 overflow-hidden rounded-2xl">
      {article.images && article.images[0] && (
        <img
          src={article.images[0].imageUrl}
          alt={article.images[0].altText}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h1 className="text-5xl font-bold mb-6">{article.title}</h1>
          <div className="text-xl leading-relaxed max-w-4xl mx-auto">
            {article.content}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// Template selector
export const ArticleTemplate = ({ article }) => {
  const templates = {
    CLASSIC: ClassicTemplate,
    MODERN: ModernTemplate,
    FOCUS: FocusTemplate
  };

  const TemplateComponent = templates[article.template] || ClassicTemplate;
  
  return <TemplateComponent article={article} />;
};