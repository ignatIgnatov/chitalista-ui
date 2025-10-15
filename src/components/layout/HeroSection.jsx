import React from "react";
import { motion } from "framer-motion";
import { Button, Container, Typography, Box } from "@mui/material";
import { ArrowDownward, Explore } from "@mui/icons-material";
import logo from "../../assets/logo.png";

 const scrollToArticles = () => {
    document.getElementById("articles-section").scrollIntoView({
      behavior: "smooth",
    });
  };

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative mt-48 min-h-screen bg-gradient-to-br from-slate-900 via-gray-400 to-slate-900 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            initial={{
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -100],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Container maxWidth="xl" className="relative z-10">
        {/* Hero Content */}
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            className="text-center px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Logo/Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-200 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                <a
                  href="#home"
                  className="flex items-center space-x-3 no-underline"
                >
                  <div className="w-30 h-30 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={logo}
                      alt="Народни Читалища Лого"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-2xl md:text-3xl lg:text-6xl font-thin text-white mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Фондация "Народни{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Читалища"
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl font-thin md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Открийте богатството на българската култура, традиции и иновации
              чрез нашата дигитална платформа. Присъединете се към общността,
              която съхранява и развива културното наследство.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<Explore />}
                onClick={scrollToArticles}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-200"
              >
                Разгледай Статиите
              </Button>

              <Button
                variant="outlined"
                size="large"
                className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm"
              >
                Запознай се с Нас
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                { number: "150+", label: "Активни Читалища" },
                { number: "50K+", label: "Членове" },
                { number: "200+", label: "Години История" },
                { number: "1K+", label: "Културни Събития" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-2xl md:text-3xl font-bold text-white mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-cyan-200 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative mt-12">
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={scrollToArticles}
          >
            <span className="text-white text-sm font-think">
              Разгледай статиите
            </span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
