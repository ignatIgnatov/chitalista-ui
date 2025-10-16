import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import PrivateRoute from './components/common/PrivateRoute';
import SeoHead from './components/seo/SeoHead';
import ArticlePage from './pages/ArticlePage';
import ChitalishtePage from './pages/ChitalishtePage';
import HomePage from './pages/HomePage';
import { store } from './store';
import AdminPanel from './components/admin/AdminPanel';

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
            <Route path="/admin" element={<AdminPanel />} />
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