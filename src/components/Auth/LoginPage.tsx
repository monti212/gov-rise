import React, { useState } from 'react';
import { Eye, EyeOff, Globe, AlertCircle, CheckCircle } from 'lucide-react';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginPageProps {
  onLogin: (credentials: LoginCredentials) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get current credentials from localStorage or use defaults
  const getStoredCredentials = (): LoginCredentials => {
    try {
      const stored = localStorage.getItem('govrise-credentials');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error reading credentials from localStorage:', error);
    }
    
    // Default credentials
    return {
      username: 'admin',
      password: 'govrise2024'
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    const validCredentials = getStoredCredentials();

    if (username === validCredentials.username && password === validCredentials.password) {
      onLogin({ username, password });
    } else {
      setError('Invalid username or password. Please try again.');
    }

    setIsLoading(false);
  };

  const currentCredentials = getStoredCredentials();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-xl shadow-lg">
              <Globe className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to GovRise</h1>
          <p className="text-gray-600">Australian Family Reunification Platform</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={20} className="text-red-600 mr-2 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <CheckCircle size={20} className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Demo Credentials</h4>
                <div className="text-blue-700 text-sm space-y-1">
                  <p><strong>Username:</strong> {currentCredentials.username}</p>
                  <p><strong>Password:</strong> {currentCredentials.password}</p>
                </div>
                <p className="text-blue-600 text-xs mt-2">
                  You can change these credentials in Settings after logging in.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 GovRise. All rights reserved.</p>
          <p className="mt-1">Secure family reunification platform for Australia</p>
        </div>
      </div>
    </div>
  );
};