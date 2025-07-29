import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  FiHome,
  FiSearch,
  FiBell,
  FiLogOut,
  FiUser,
  FiMessageCircle,
  FiCompass,
  FiSettings,
  FiHelpCircle,
  FiSun,
  FiMoon,
  FiX,
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'https://backend-api-b0q2.onrender.com/api';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return setSearchResults([]);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/users/search/${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchResults(res.data.users || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    handleSearch(val);
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const navigateToProfile = (id) => {
    navigate(`/profile/${id}`);
    closeSearch();
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showSearch && !e.target.closest('.search-box')) closeSearch();
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showSearch]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900 border-b shadow-sm backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* Search Button */}
          <div className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400 p-2"
              title="Search"
            >
              <FiSearch size={24} />
            </button>

            {showSearch && (
              <div className="absolute top-12 left-0 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 z-50 border search-box">
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Search users..."
                    autoFocus
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 outline-none dark:bg-gray-700 dark:text-white"
                  />
                  <button onClick={closeSearch} className="text-gray-600 dark:text-gray-300">
                    <FiX size={18} />
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {searchResults.map((u) => (
                    <div
                      key={u._id}
                      onClick={() => navigateToProfile(u._id)}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                    >
                      {u.avatar ? (
                        <img
                          src={`https://backend-api-b0q2.onrender.com${u.avatar}`}
                          alt={u.username}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
                          {u.username[0].toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="font-medium dark:text-white">{u.username}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{u.bio || 'No bio'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Centered Nav Icons */}
          <div className="flex space-x-6 text-gray-700 dark:text-gray-300 text-xl">
            <button onClick={() => setDarkMode(!darkMode)} title="Toggle Theme">
              {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
            </button>
            <Link to="/" className={isActive('/') ? 'text-purple-600 dark:text-teal-400 scale-110' : ''}>
              <FiHome />
            </Link>
            <Link to="/explore" className={isActive('/explore') ? 'text-purple-600 dark:text-teal-400 scale-110' : ''}>
              <FiCompass />
            </Link>
            <Link to="/chat" className={isActive('/chat') ? 'text-purple-600 dark:text-teal-400 scale-110' : ''}>
              <FiMessageCircle />
            </Link>
            <Link to="/notifications" className={isActive('/notifications') ? 'text-purple-600 dark:text-teal-400 scale-110' : ''}>
              <FiBell />
            </Link>
            <Link to="/settingspage" className={isActive('/settingspage') ? 'text-purple-600 dark:text-teal-400 scale-110' : ''}>
              <FiSettings />
            </Link>
            <Link to="/help" className={isActive('/help') ? 'text-purple-600 dark:text-teal-400 scale-110' : ''}>
              <FiHelpCircle />
            </Link>
          </div>

          {/* User & Logout */}
          <div className="flex items-center space-x-4">
            <Link to={`/profile/${user?._id}`}>
              {user?.avatar ? (
                <img
                  src={`https://backend-api-b0q2.onrender.com${user.avatar}`}
                  alt="avatar"
                  className="w-9 h-9 rounded-full border border-blue-500"
                />
              ) : (
                <FiUser size={24} />
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
              title="Logout"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
