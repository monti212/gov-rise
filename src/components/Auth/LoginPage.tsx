import React, { useState } from 'react';
import { Eye, EyeOff, Globe, AlertCircle, CheckCircle, User, Mail, Phone, Lock } from 'lucide-react';
import { supabase } from '../../utils/supabase';

export const LoginPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Register state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regRole, setRegRole] = useState('refugee');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) setError(error.message);
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (regPassword !== regConfirm) { setError('Passwords do not match.'); return; }
    if (regPassword.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (!agreedTerms) { setError('You must agree to the Terms of Service.'); return; }
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email: regEmail,
      password: regPassword,
      options: {
        data: {
          full_name: regFullName,
          phone: regPhone,
          role: regRole,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setRegSuccess(true);
    }
    setIsLoading(false);
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

        {/* Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Tab Toggle */}
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
            {/* ── LOGIN ── */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input type={showPassword ? 'text' : 'password'} value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required
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
                  {isLoading
                    ? <><div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full mr-2" />Signing In...</>
                    : 'Sign In'}
                </button>
              </form>
            )}

            {/* ── REGISTER ── */}
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
                    <label className="block text-xs font-medium text-gray-700 mb-1">I am a *</label>
                    <select value={regRole} onChange={e => setRegRole(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                      <option value="refugee">Refugee / Asylum Seeker</option>
                      <option value="family">Family Member</option>
                      <option value="caseworker">Caseworker</option>
                      <option value="ngo">NGO / Organisation</option>
                      <option value="government">Government Official</option>
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Password *</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                      <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} required
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Min 6 chars" />
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
                  {isLoading
                    ? <><div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full mr-2" />Creating Account...</>
                    : 'Create Account'}
                </button>
              </form>
            )}

            {/* ── REGISTER SUCCESS ── */}
            {mode === 'register' && regSuccess && (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={28} className="text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Account Created!</h3>
                <p className="text-sm text-gray-500 mb-1">Check your email to confirm your account.</p>
                <p className="text-xs text-gray-400 mb-4">If email confirmation is disabled in your Supabase project, you can sign in immediately.</p>
                <button onClick={() => { setMode('login'); setLoginEmail(regEmail); setRegSuccess(false); }}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Go to Sign In
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-gray-400 text-xs">
          © 2025 GovRise · Secure family reunification platform
        </div>
      </div>
    </div>
  );
};
