import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import { AdminLayout } from './components/AdminLayout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Bookings } from './pages/Bookings';
import { Trains } from './pages/Trains';
import { useAdmin } from './context/AdminContext';

const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdminAuth } = useAdmin();
  if (isAdminAuth) return <Navigate to="/" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AdminProvider>
        <Routes>
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
          
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="trains" element={<Trains />} />
          </Route>
        </Routes>
      </AdminProvider>
    </Router>
  );
}

export default App;
