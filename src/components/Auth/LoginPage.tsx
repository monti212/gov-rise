import React, { useState } from 'react';
import { Eye, EyeOff, Globe, AlertCircle, CheckCircle, User, Mail, Phone, Lock } from 'lucide-react';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginPageProps {
  onLogin: (credentials: LoginCredentials) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regRole, setRegRole] = useState('refugee');
  const [regSuccess, setRegSuccess] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (regPassword !== regConfirm) { setError('Passwords do not match.'); return; }
    if (!agreedTerms) { setError('You must agree to the Terms of Service.'); return; }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    // Store new account in localStorage
    localStorage.setItem('govrise-credentials', JSON.stringify({ username: regUsername, password: regPassword }));
    localStorage.setItem(`govrise-profile-${regUsername}`, JSON.stringify({
      fullName: regFullName, email: regEmail, phone: regPhone,
      jobTitle: regRole === 'caseworker' ? 'Caseworker' : regRole === 'ngo' ? 'NGO Worker' : 'GovRise User',
      timeZone: 'UTC', language: 'en',
    }));
    setIsLoading(false);
    setRegSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-blue-600 text-white flex items-center justify-center rounded-xl shadow-lg">
              <Globe className="h-7 w-7" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">GovRise</h1>
          <p className="text-gray-500 text-sm">Family Reunification & Refugee Support Platform</p>
        </div>

        {/* Tab Toggle */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === 'login' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}>
              Sign In
            </button>
            <button onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === 'register' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}>
              Create Account
            </button>
          </div>

          <div className="p-6">
            {/* LOGIN */}
            {mode === 'login' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter your username" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                      className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter your password" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle size={16} className="text-red-600 mr-2 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}
                <button type="submit" disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center justify-center">
                  {isLoading ? <><div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full mr-2" />Signing In...</> : 'Sign In'}
                </button>
              </form>
            )}

            {/* REGISTER */}
            {mode === 'register' && !regSuccess && (
              <form onSubmit={handleRegister} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                    <div className="relative">
                      <User size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                      <input value={regFullName} onChange={e => setRegFullName(e.target.value)} required
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Full name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Role *</label>
                    <select value={regRole} onChange={e => setRegRole(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                      <option value="refugee">Refugee / Asylum Seeker</option>
                      <option value="family">Family Member</option>
                      <option value="caseworker">Caseworker</option>
                      <option value="ngo">NGO / Organisation</option>
                      <option value="sponsor">Sponsor</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                    <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} required
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="email@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                    <input value={regPhone} onChange={e => setRegPhone(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="+XX XXXXXXXXXX" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Username *</label>
                  <div className="relative">
                    <User size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                    <input value={regUsername} onChange={e => setRegUsername(e.target.value)} required
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Choose a username" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Password *</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                      <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} required
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Password" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Confirm *</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                      <input type="password" value={regConfirm} onChange={e => setRegConfirm(e.target.value)} required
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Confirm" />
                    </div>
                  </div>
                </div>
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input type="checkbox" checked={agreedTerms} onChange={e => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-blue-600 rounded flex-shrink-0" />
                  <span className="text-xs text-gray-600">
                    I agree to the <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a> and <a href="/terms" className="text-blue-600 underline">Terms of Service</a>
                  </span>
                </label>
                {error && (
                  <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle size={16} className="text-red-600 mr-2 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}
                <button type="submit" disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center justify-center">
                  {isLoading ? <><div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full mr-2" />Creating Account...</> : 'Create Account'}
                </button>
              </form>
            )}

            {/* REGISTER SUCCESS */}
            {mode === 'register' && regSuccess && (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={28} className="text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Account Created!</h3>
                <p className="text-sm text-gray-500 mb-4">Your account has been created. Sign in with your new credentials.</p>
                <button onClick={() => { setMode('login'); setUsername(regUsername); setRegSuccess(false); }}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Sign In Now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Demo credentials (login mode only) */}
        {mode === 'login' && (
          <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
            <div className="flex items-start space-x-2">
              <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-0.5">Demo Access</p>
                <p>Username: <strong>{currentCredentials.username}</strong> · Password: <strong>{currentCredentials.password}</strong></p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center text-gray-400 text-xs">
          © 2025 GovRise · Secure family reunification platform
        </div>
      </div>
    </div>
  );
};