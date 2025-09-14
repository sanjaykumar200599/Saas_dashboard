import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook to access authentication context
 * This hook provides access to the current user, login, logout functions
 * and loading state from the AuthContext
 * 
 * @returns {Object} Authentication context value
 * @returns {Object|null} user - Current authenticated user object
 * @returns {Function} login - Function to authenticate user
 * @returns {Function} logout - Function to log out user
 * @returns {boolean} loading - Authentication loading state
 * 
 * @throws {Error} If used outside of AuthProvider
 * 
 * @example
 * const { user, login, logout, loading } = useAuth();
 * 
 * // Check if user is authenticated
 * if (user) {
 *   console.log('User is logged in:', user.username);
 * }
 * 
 * // Login user
 * const handleLogin = async () => {
 *   try {
 *     await login(username, password);
 *   } catch (error) {
 *     console.error('Login failed:', error.message);
 *   }
 * };
 * 
 * // Logout user
 * const handleLogout = () => {
 *   logout();
 * };
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

/**
 * Hook to check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export const useIsAuthenticated = () => {
  const { user } = useAuth();
  return !!user;
};

/**
 * Hook to get current user information
 * @returns {Object|null} Current user object or null if not authenticated
 */
export const useCurrentUser = () => {
  const { user } = useAuth();
  return user;
};

/**
 * Hook for authentication status with loading state
 * @returns {Object} Authentication status object
 */
export const useAuthStatus = () => {
  const { user, loading } = useAuth();
  
  return {
    isAuthenticated: !!user,
    isLoading: loading,
    user: user
  };
};