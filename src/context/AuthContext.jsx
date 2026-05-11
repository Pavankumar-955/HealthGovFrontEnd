import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Helper function to normalize user data from token
  const getUserFromToken = (tokenData) => {
    try {
      const decoded = jwtDecode(tokenData);
      // Backend might send 'id', 'userId', or 'sub'. 
      // We map it to 'userId' so frontend code remains consistent.
      return {
        ...decoded,
        userId: decoded.userId || decoded.id || decoded.sub,
        name: decoded.name || decoded.fullName,
        role: decoded.role
      };
    } catch (err) {
      console.error('Token decoding failed:', err);
      return null;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const userData = getUserFromToken(storedToken);
      if (userData) {
        setUser(userData);
        setToken(storedToken);
      } else {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (tokenData) => {
    localStorage.setItem('token', tokenData);
    setToken(tokenData);
    const userData = getUserFromToken(tokenData);
    if (userData) {
      setUser(userData);
      console.log("Logged in User ID:", userData.userId); // Debugging
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, token, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};