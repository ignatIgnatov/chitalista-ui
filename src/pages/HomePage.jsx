import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Container, Typography, Box, Button } from "@mui/material";
import { ArrowDownward, Explore } from "@mui/icons-material";
import { fetchArticles } from "../store/slices/articlesSlice";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { ArticleGrid } from "../components/articles/ModernArticleTemplates";
import SearchAndFilter from "../components/articles/SearchAndFilter";
import SeoHead from "../components/seo/SeoHead";
import HeroSection from "../components/layout/HeroSection";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    items: articles,
    filteredItems,
    loading,
    searchTerm,
    currentTemplate,
  } = useSelector((state) => state.articles);

  const displayArticles =
    searchTerm || currentTemplate ? filteredItems : articles;

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <>
      <SeoHead />

      {/* Header */}
      <Header />

      {/* Enhanced Hero Section */}
      <HeroSection />

      {/* Articles Section */}
      <section
        id="articles-section"
        className="py-20 mt-48 bg-gradient-to-b from-gray-50 to-white"
      >
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Typography
              variant="h2"
              className="font-bold text-gray-900 mb-6 text-4xl md:text-5xl"
            >
              Нашите Публикации
            </Typography>
            <Typography
              variant="h6"
              className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl"
            >
              Открийте най-новите новини, истории и събития от света на
              народните читалища. Всяка статия е представена в уникален модерен
              дизайн, съобразен с нейното съдържание.
            </Typography>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-16"
          >
            <SearchAndFilter />
          </motion.div>

          {/* Articles Grid */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <Typography variant="h6" className="text-gray-600">
                  Зареждаме публикациите...
                </Typography>
              </div>
            </motion.div>
          ) : displayArticles && displayArticles.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <ArticleGrid articles={displayArticles} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Explore className="text-gray-400 text-4xl" />
                </div>
                <Typography variant="h5" className="text-gray-900 mb-4">
                  Няма намерени публикации
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-6">
                  Опитайте с различни критерии за търсене или се върнете
                  по-късно за нови публикации.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Презареди Страницата
                </Button>
              </div>
            </motion.div>
          )}

          {/* Load More Button (if needed) */}
          {displayArticles && displayArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button
                variant="outlined"
                size="large"
                className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 px-8 py-3 rounded-xl font-semibold"
              >
                Зареди Още Публикации
              </Button>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-r from-blue-600 to-purple-700"
      >
        <Container maxWidth="lg">
          <div className="text-center text-white">
            <Typography variant="h3" className="font-bold mb-4">
              Абонирай се за Нашите Новини
            </Typography>
            <Typography
              variant="h6"
              className="mb-8 opacity-90 max-w-2xl mx-auto"
            >
              Получавайте най-новите информации за събития, статии и новини от
              света на народните читалища директно във вашата поща.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Вашият email адрес"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Button
                variant="contained"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold"
              >
                Абонирай се
              </Button>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;
