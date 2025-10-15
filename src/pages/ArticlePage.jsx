import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Avatar,
  IconButton,
  Breadcrumbs,
  Link
} from '@mui/material';
import { ArrowBack, CalendarToday, Person, Favorite, Share, Bookmark } from '@mui/icons-material';
import { articlesService } from '../services/articlesService';
import SeoHead from '../components/seo/SeoHead';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await articlesService.getById(id);
        setArticle(response.data);
      } catch (err) {
        setError('Статията не беше намерена');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.substring(0, 200),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Линкът е копиран в клипборда!');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container className="py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <Typography variant="h6">Зареждане на статията...</Typography>
          </div>
        </Container>
        <Footer />
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Header />
        <Container className="py-20">
          <div className="text-center">
            <Typography variant="h4" className="text-gray-900 mb-4">
              Статията не беше намерена
            </Typography>
            <Button variant="contained" onClick={handleBack}>
              Назад към статиите
            </Button>
          </div>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SeoHead 
        title={article.title}
        description={article.content.substring(0, 160)}
        image={article.images && article.images[0] ? article.images[0].imageUrl : null}
        type="article"
      />
      
      <Header />
      
      <Container maxWidth="lg" className="py-8 mt-[180px]">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6">
          <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Начало
          </Link>
          <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Статии
          </Link>
          <Typography color="text.primary">{article.title}</Typography>
        </Breadcrumbs>

        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          className="mb-6"
        >
          Назад към статиите
        </Button>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Hero Image */}
          {article.images && article.images[0] && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={article.images[0].imageUrl}
                alt={article.images[0].altText}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <Chip
                  label={article.template}
                  className="bg-white/90 backdrop-blur-sm text-gray-800 font-semibold"
                />
              </div>
            </div>
          )}

          {/* Article Header */}
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Avatar 
                sx={{ width: 48, height: 48 }} 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                Ч
              </Avatar>
              <div>
                <Typography variant="h6" className="font-semibold">
                  Народни Читалища
                </Typography>
                <div className="flex items-center gap-4 text-gray-600 text-sm">
                  <div className="flex items-center gap-1">
                    <CalendarToday fontSize="small" />
                    <span>{new Date(article.createdAt).toLocaleDateString('bg-BG')}</span>
                  </div>
                  <span>•</span>
                  <span>5 мин четене</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <Typography variant="h2" className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </Typography>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <IconButton className="bg-gray-100 hover:bg-gray-200">
                <Favorite />
              </IconButton>
              <IconButton className="bg-gray-100 hover:bg-gray-200" onClick={handleShare}>
                <Share />
              </IconButton>
              <IconButton className="bg-gray-100 hover:bg-gray-200">
                <Bookmark />
              </IconButton>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <Typography 
                variant="body1" 
                className="text-gray-700 leading-relaxed text-lg whitespace-pre-line"
              >
                {article.content}
              </Typography>
            </div>

            {/* Additional Images */}
            {article.images && article.images.length > 1 && (
              <div className="mt-8">
                <Typography variant="h5" className="font-semibold mb-4">
                  Галерия
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {article.images.slice(1).map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md">
                      <img
                        src={image.imageUrl}
                        alt={image.altText}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.article>

        {/* Related Articles Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Typography variant="h4" className="font-bold mb-6">
            Свързани Статии
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Тук можеш да добавиш свързани статии */}
            <div className="text-center py-8 text-gray-500">
              <Typography>Няма свързани статии в момента</Typography>
            </div>
          </div>
        </motion.section>
      </Container>

      <Footer />
    </>
  );
};

export default ArticlePage;