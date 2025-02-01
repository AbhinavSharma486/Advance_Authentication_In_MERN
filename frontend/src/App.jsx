import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

import FloatingShape from './components/FloatingShape.jsx';
import SignUpPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EmailVerificationPage from './pages/EmailVerificationPage.jsx';
import { useAuthStore } from './store/authStore.js';
import DashboardPage from './pages/DashboardPage.jsx';

// protect route that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};


// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};

function App() {

  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);


  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape color='bg-green-500' size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color='bg-emerald-500' size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color='bg-lime-500' size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path='/forgot-password' />
        <Route path='/reset-password' />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;;;;
