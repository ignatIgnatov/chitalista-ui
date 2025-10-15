import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import PrivateRoute from './components/common/PrivateRoute';
import SeoHead from './components/seo/SeoHead';
import ChitalishtePage from './pages/ChitalishtePage';

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Router>
          <SeoHead />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/chitalishta" element={<ChitalishtePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </HelmetProvider>
    </Provider>
  );
}

export default App;