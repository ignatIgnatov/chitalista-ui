import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
} from "@mui/material";
import { Menu, Close, Facebook, Instagram, Twitter } from "@mui/icons-material";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { title: "НАЧАЛО", href: "#home" },
    { title: "КАРТА", href: "#map" },
    { title: "ЗА ПРОЕКТА", href: "#about_project" },
    { title: "ДАННИ И МЕТОДОЛОГИЯ", href: "#data_methodology" },
    { title: "АНАЛИЗИ И СТАТИСТИКИ", href: "#data_analysis" },
    { title: "КОНТАКТИ", href: "#contact" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        className="bg-gradient-to-r from-gray-200 to-gray-400 backdrop-blur-md shadow-lg"
        sx={{ zIndex: 1300 }}
      >
        <Container maxWidth="xl">
          <Toolbar className="flex justify-between py-3 border-b border-gray-300">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <a
                href="#home"
                className="flex items-center space-x-3 no-underline"
              >
                <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={logo}
                    alt="Народни Читалища Лого"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <Typography
                    variant="h4"
                    className="font-bold text-gray-800 hidden md:block sm:block"
                  >
                    ФОНДАЦИЯ "НАРОДНИ ЧИТАЛИЩА"
                  </Typography>
                  <Typography
                    variant="h9"
                    className="font-semibold text-gray-600 hidden md:block sm:block"
                  >
                    Подкрепяме възраждането на българските читалища
                  </Typography>
                </div>
              </a>
            </motion.div>

            {/* Mobile Menu Button - ONLY visible on mobile */}
            <IconButton
              className="mobile-only"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ color: "gray.800" }}
            >
              <Menu />
            </IconButton>
          </Toolbar>

          <Toolbar className="flex justify-between py-3">
            {/* Desktop Navigation - ALWAYS visible on desktop */}
            <Box className="hidden md:flex items-center space-x-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* <Button
                    href={item.href}
                    className="text-white hover:text-blue-800 font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
                  >
                    {item.title}
                  </Button> */}
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-blue-800 font-medium transition-colors duration-200 px-4 py-2 hover:border-b-2 border-blue-600"
                  >
                    {item.title}
                  </a>
                </motion.div>
              ))}

              <Button color="inherit" component={Link} to="/chitalishta">
                Читалища
              </Button>
            </Box>

            {/* Social Icons - Always visible on desktop */}
            <Box className="hidden md:flex items-center space-x-2">
              <IconButton
                size="small"
                className="text-white hover:text-blue-600 hover:bg-white/10 transition-all duration-200"
              >
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                className="text-white hover:text-pink-600 hover:bg-white/10 transition-all duration-200"
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                className="text-white hover:text-blue-200 hover:bg-white/10 transition-all duration-200"
              >
                <Twitter fontSize="small" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            PaperProps={{
              className: "w-80 bg-gradient-to-b from-gray-600 to-gray-200",
            }}
          >
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="h-full flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20">
                    <img
                      src={logo}
                      alt="Народни Читалища Лого"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Typography variant="h6" className="font-bold text-white">
                    Меню
                  </Typography>
                </div>
                <IconButton
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <Close />
                </IconButton>
              </div>

              {/* Mobile Menu Items */}
              <List className="flex-1 p-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ListItem
                      button
                      component="a"
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-lg mb-2 hover:bg-white/10 transition-colors duration-200"
                    >
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          className: "font-medium text-white",
                        }}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>

              {/* Social Icons in Mobile Menu */}
              <div className="p-4">
                <Typography variant="body2" className="text-gray-800 mb-3">
                  Последвайте ни
                </Typography>
                <div className="flex space-x-3">
                  <IconButton
                    size="small"
                    className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Facebook fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    className="bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-200"
                  >
                    <Instagram fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    className="bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200"
                  >
                    <Twitter fontSize="small" />
                  </IconButton>
                </div>
              </div>
            </motion.div>
          </Drawer>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      {/* <div className="h-24"></div> */}
    </>
  );
};

export default Header;
