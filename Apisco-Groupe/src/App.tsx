import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import Navbar from './components/Navabar.jsx';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import Footer from './components/Footer.jsx';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import Home from './components/pages/Home.jsx';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import Services from './components/pages/Services';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import Login from './components/pages/Login';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import Register from './components/pages/Register';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import Dashboard from './components/pages/Dashboard';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import Quotes from './components/pages/Quotes';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import Orders from './components/pages/Orders';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import AdminDashboard from './components/pages/Admin/AdminDashboard';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import AdminOrders from './components/pages/Admin/AdminOrders';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import AdminServices from './components/pages/Admin/AdminServices';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import ProtectedRoute from './components/ProtectedRoute.jsx';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import api from './api/api.js';
import './style/custom.css';

// Types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
  company?: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('apisco_token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (): Promise<void> => {
    try {
      const response = await api.get('/user');
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('apisco_token');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData: User): void => {
    setUser(userData);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('apisco_token');
      setUser(null);
    }
  };

  // Protected Admin Route component
  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (user.role !== 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/quotes" element={<Quotes user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />

          {/* Protected User Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute user={user}>
              <Orders user={user} />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard user={user} />
            </AdminRoute>
          } />
          <Route path="/admin/orders" element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          } />
          <Route path="/admin/services" element={
            <AdminRoute>
              <AdminServices />
            </AdminRoute>
          } />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;