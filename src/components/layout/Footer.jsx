import React from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  IconButton
} from '@mui/material';
import { Facebook, Instagram, Twitter, Email, LocationOn, Phone } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <Container maxWidth="lg">
        <Grid container spacing={8} className="mb-12">
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Box className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Ч</span>
                </div>
                <Typography variant="h5" className="font-bold">
                  Народни Читалища
                </Typography>
              </Box>
              <Typography variant="body1" className="text-gray-400 mb-6 leading-relaxed">
                Обединяваме общностите чрез култура, образование и традиции. 
                Работим за запазване и развитие на българското културно наследство.
              </Typography>
              <Box className="flex gap-3">
                {[Facebook, Instagram, Twitter].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton className="bg-gray-800 hover:bg-blue-600 text-white transition-colors duration-200">
                      <Icon />
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Typography variant="h6" className="font-bold mb-6">
                Бързи Връзки
              </Typography>
              <Box className="space-y-3">
                {['Начало', 'Статии', 'Събития', 'Галерия', 'Контакти'].map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Typography variant="h6" className="font-bold mb-6">
                Контакти
              </Typography>
              <Box className="space-y-4">
                <Box className="flex items-center gap-3">
                  <LocationOn className="text-blue-400" />
                  <Typography variant="body2" className="text-gray-400">
                    ул. "Примерна" №1, София, България
                  </Typography>
                </Box>
                <Box className="flex items-center gap-3">
                  <Phone className="text-blue-400" />
                  <Typography variant="body2" className="text-gray-400">
                    +359 2 123 456
                  </Typography>
                </Box>
                <Box className="flex items-center gap-3">
                  <Email className="text-blue-400" />
                  <Typography variant="body2" className="text-gray-400">
                    info@narodnichitalishta.bg
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Typography variant="h6" className="font-bold mb-6">
                Абонирай се
              </Typography>
              <Typography variant="body2" className="text-gray-400 mb-4">
                Получавайте най-новите новини и събития
              </Typography>
              <Box className="flex gap-2">
                <input
                  type="email"
                  placeholder="Вашият email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  →
                </motion.button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-gray-800"
        >
          <Box className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Typography variant="body2" className="text-gray-400">
              © {currentYear} Народни Читалища. Всички права запазени.
            </Typography>
            <Box className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Политика за поверителност
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Условия за ползване
              </Link>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;