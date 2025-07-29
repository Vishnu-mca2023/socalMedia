import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Help from './components/Help/Help';
import Chat from './components/Chat/Chat';
import Explore from './components/Explore/Explore';
import Notifications from './components/Notifications/Notifications';
import SettingsPage from './components/Settings/SettingsPage';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white">
          <AppContent />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="loading-spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is NOT logged in
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* 👇 Default route now leads to /register */}
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    );
  }

  // If user IS logged in
  return (
    <SocketProvider>
      <Navbar />
      <main className="main-content px-4 py-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId?" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settingspage" element={<SettingsPage />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </SocketProvider>
  );
}

export default App;
