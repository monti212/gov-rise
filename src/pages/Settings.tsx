import React, { useState, useEffect } from 'react';
import { UserCircle, Bell, Globe, Shield, Moon, LogOut, Save, ChevronDown, CheckCircle, Mail, Smartphone, Lock, Eye, EyeOff, ToggleLeft as Toggle, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface UserProfile {
  fullName: string;
  email: string;
  jobTitle: string;
  phone: string;
  timeZone: string;
  language: string;
}

interface User {
  username: string;
  isAuthenticated: boolean;
  profile: UserProfile;
}

interface SettingsProps {
  user: User;
  onUpdateProfile: (profile: UserProfile) => void;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export const Settings = ({ user, onUpdateProfile }: SettingsProps) => {
  // Profile settings state - initialize with user's current profile
  const [fullName, setFullName] = useState(user.profile.fullName);
  const [email, setEmail] = useState(user.profile.email);
  const [jobTitle, setJobTitle] = useState(user.profile.jobTitle);
  const [phone, setPhone] = useState(user.profile.phone);
  const [timeZone, setTimeZone] = useState(user.profile.timeZone);
  const [language, setLanguage] = useState(user.profile.language);
  
  // Login credentials state
  const [currentCredentials, setCurrentCredentials] = useState<LoginCredentials>({ username: '', password: '' });
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [caseUpdates, setCaseUpdates] = useState(true);
  const [documentReminders, setDocumentReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [systemAnnouncements, setSystemAnnouncements] = useState(true);
  
  // Privacy and security settings state
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [activityLogging, setActivityLogging] = useState(true);
  
  // Display settings state
  const [darkMode, setDarkMode] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  
  // Session state
  const [selectedTab, setSelectedTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState<null | 'saving' | 'saved' | 'error'>(null);
  const [credentialUpdateStatus, setCredentialUpdateStatus] = useState<null | 'saving' | 'saved' | 'error'>(null);

  // No localStorage credentials needed — Supabase handles auth
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (u) setNewUsername(u.email || '');
    });
  }, []);

  // Update local state when user profile changes
  useEffect(() => {
    setFullName(user.profile.fullName);
    setEmail(user.profile.email);
    setJobTitle(user.profile.jobTitle);
    setPhone(user.profile.phone);
    setTimeZone(user.profile.timeZone);
    setLanguage(user.profile.language);
  }, [user.profile]);
  
  const handleSaveSettings = async () => {
    setSaveStatus('saving');
    try {
      const { data: { user: u } } = await supabase.auth.getUser();
      if (!u) throw new Error('Not authenticated');

      const { error } = await supabase.from('profiles').update({
        full_name: fullName,
        phone,
        job_title: jobTitle,
        time_zone: timeZone,
        language,
        updated_at: new Date().toISOString(),
      }).eq('id', u.id);

      if (error) throw error;

      onUpdateProfile({ fullName, email, jobTitle, phone, timeZone, language });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleUpdateCredentials = async () => {
    if (!newPassword) { setCredentialUpdateStatus('error'); return; }
    if (newPassword !== confirmPassword) { setCredentialUpdateStatus('error'); return; }
    if (newPassword.length < 6) { setCredentialUpdateStatus('error'); return; }

    setCredentialUpdateStatus('saving');
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setNewPassword('');
      setConfirmPassword('');
      setCredentialUpdateStatus('saved');
      setTimeout(() => setCredentialUpdateStatus(null), 3000);
    } catch (err) {
      console.error('Error updating password:', err);
      setCredentialUpdateStatus('error');
      setTimeout(() => setCredentialUpdateStatus(null), 3000);
    }
  };

  // Get display name for user
  const getDisplayName = () => {
    return user.profile.fullName || user.username;
  };

  // Get display role for user
  const getDisplayRole = () => {
    return user.profile.jobTitle || 'Australian Visa User';
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences.</p>
      </div>
      
      {/* Settings Navigation */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="md:w-64 border-r border-gray-200 bg-gray-50">
            <nav className="py-4">
              <div className="px-4 mb-4">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <UserCircle size={52} />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-gray-900">{getDisplayName()}</h3>
                  <p className="text-sm text-gray-600">{getDisplayRole()}</p>
                </div>
              </div>
              
              <ul className="space-y-1">
                <li>
                  <button
                    className={`w-full flex items-center px-4 py-2.5 text-sm font-medium ${
                      selectedTab === 'profile'
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedTab('profile')}
                  >
                    <UserCircle size={18} className="mr-2" />
                    Profile Settings
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center px-4 py-2.5 text-sm font-medium ${
                      selectedTab === 'credentials'
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedTab('credentials')}
                  >
                    <Lock size={18} className="mr-2" />
                    Login Credentials
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center px-4 py-2.5 text-sm font-medium ${
                      selectedTab === 'notifications'
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedTab('notifications')}
                  >
                    <Bell size={18} className="mr-2" />
                    Notification Preferences
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center px-4 py-2.5 text-sm font-medium ${
                      selectedTab === 'security'
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedTab('security')}
                  >
                    <Shield size={18} className="mr-2" />
                    Privacy & Security
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center px-4 py-2.5 text-sm font-medium ${
                      selectedTab === 'display'
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedTab('display')}
                  >
                    <Moon size={18} className="mr-2" />
                    Display Settings
                  </button>
                </li>
              </ul>
              
              <div className="px-4 mt-8">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors">
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 p-6">
            {/* Profile Settings */}
            {selectedTab === 'profile' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h2>
                
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                          Job Title
                        </label>
                        <input
                          type="text"
                          id="jobTitle"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          placeholder="Enter your job title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Preferences */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                          Language
                        </label>
                        <div className="relative">
                          <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="ar">Arabic</option>
                            <option value="zh">Chinese (Simplified)</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700 mb-1">
                          Time Zone
                        </label>
                        <div className="relative">
                          <select
                            id="timeZone"
                            value={timeZone}
                            onChange={(e) => setTimeZone(e.target.value)}
                            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Australia/Sydney">Sydney (AEDT)</option>
                            <option value="Australia/Melbourne">Melbourne (AEDT)</option>
                            <option value="Australia/Brisbane">Brisbane (AEST)</option>
                            <option value="Australia/Perth">Perth (AWST)</option>
                            <option value="Australia/Adelaide">Adelaide (ACDT)</option>
                            <option value="Australia/Darwin">Darwin (ACST)</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Status */}
                  {saveStatus && (
                    <div className={`flex items-center p-3 rounded-lg ${
                      saveStatus === 'saved' ? 'bg-green-50 border border-green-200' :
                      saveStatus === 'error' ? 'bg-red-50 border border-red-200' :
                      'bg-blue-50 border border-blue-200'
                    }`}>
                      {saveStatus === 'saved' && <CheckCircle size={20} className="text-green-600 mr-2" />}
                      {saveStatus === 'error' && <AlertCircle size={20} className="text-red-600 mr-2" />}
                      {saveStatus === 'saving' && <RefreshCw size={20} className="text-blue-600 mr-2 animate-spin" />}
                      <span className={`text-sm ${
                        saveStatus === 'saved' ? 'text-green-700' :
                        saveStatus === 'error' ? 'text-red-700' :
                        'text-blue-700'
                      }`}>
                        {saveStatus === 'saved' ? 'Profile updated successfully!' :
                         saveStatus === 'error' ? 'Error saving profile. Please try again.' :
                         'Saving profile...'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Login Credentials */}
            {selectedTab === 'credentials' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Login Credentials</h2>
                
                <div className="space-y-6">
                  {/* Current Credentials Display */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-3">Current Login Credentials</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-blue-700 font-medium">Username: </span>
                        <span className="text-sm text-blue-800">{currentCredentials.username}</span>
                      </div>
                      <div>
                        <span className="text-sm text-blue-700 font-medium">Password: </span>
                        <span className="text-sm text-blue-800 font-mono">
                          {showCurrentPassword ? currentCredentials.password : '••••••••••••'}
                        </span>
                        <button
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Update Credentials */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Update Credentials</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700 mb-1">
                          New Username
                        </label>
                        <input
                          type="text"
                          id="newUsername"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          placeholder="Enter new username"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-500"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      {/* Credential update status */}
                      {credentialUpdateStatus && (
                        <div className={`flex items-center p-3 rounded-lg ${
                          credentialUpdateStatus === 'saved' ? 'bg-green-50 border border-green-200' :
                          credentialUpdateStatus === 'error' ? 'bg-red-50 border border-red-200' :
                          'bg-blue-50 border border-blue-200'
                        }`}>
                          {credentialUpdateStatus === 'saved' && <CheckCircle size={20} className="text-green-600 mr-2" />}
                          {credentialUpdateStatus === 'error' && <AlertCircle size={20} className="text-red-600 mr-2" />}
                          {credentialUpdateStatus === 'saving' && <RefreshCw size={20} className="text-blue-600 mr-2 animate-spin" />}
                          <span className={`text-sm ${
                            credentialUpdateStatus === 'saved' ? 'text-green-700' :
                            credentialUpdateStatus === 'error' ? 'text-red-700' :
                            'text-blue-700'
                          }`}>
                            {credentialUpdateStatus === 'saved' ? 'Credentials updated successfully! Changes will take effect on next login.' :
                             credentialUpdateStatus === 'error' ? 'Error updating credentials. Please check your input and try again.' :
                             'Updating credentials...'}
                          </span>
                        </div>
                      )}

                      <button 
                        onClick={handleUpdateCredentials}
                        disabled={credentialUpdateStatus === 'saving' || !newPassword || newPassword !== confirmPassword || !newUsername.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center"
                      >
                        {credentialUpdateStatus === 'saving' && <RefreshCw size={18} className="animate-spin mr-2" />}
                        <Lock size={18} className="mr-2" />
                        Update Credentials
                      </button>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle size={20} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-900 mb-1">Security Notice</h4>
                        <p className="text-yellow-700 text-sm">
                          After updating your credentials, you will be automatically signed out and will need to log in again with your new credentials. Make sure to remember your new username and password.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notification Preferences */}
            {selectedTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h2>
                
                <div className="space-y-6">
                  {/* Delivery Methods */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Notification Delivery</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <Mail size={20} className="text-gray-500 mr-3" />
                          <div>
                            <h4 className="font-medium text-gray-900">Email Notifications</h4>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <Smartphone size={20} className="text-gray-500 mr-3" />
                          <div>
                            <h4 className="font-medium text-gray-900">Push Notifications</h4>
                            <p className="text-sm text-gray-600">Receive notifications on your device</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={pushNotifications}
                            onChange={() => setPushNotifications(!pushNotifications)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notification Types */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Notification Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                        <div>
                          <h4 className="font-medium text-gray-900">Australian Visa Updates</h4>
                          <p className="text-sm text-gray-600">Notifications about visa status changes and updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={caseUpdates}
                            onChange={() => setCaseUpdates(!caseUpdates)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                        <div>
                          <h4 className="font-medium text-gray-900">Document Reminders</h4>
                          <p className="text-sm text-gray-600">Reminders for document submissions and deadlines</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={documentReminders}
                            onChange={() => setDocumentReminders(!documentReminders)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                        <div>
                          <h4 className="font-medium text-gray-900">Weekly Reports</h4>
                          <p className="text-sm text-gray-600">Weekly summary of case progress and activities</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={weeklyReports}
                            onChange={() => setWeeklyReports(!weeklyReports)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                        <div>
                          <h4 className="font-medium text-gray-900">System Announcements</h4>
                          <p className="text-sm text-gray-600">Important announcements and system updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={systemAnnouncements}
                            onChange={() => setSystemAnnouncements(!systemAnnouncements)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Privacy & Security */}
            {selectedTab === 'security' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Privacy & Security</h2>
                
                <div className="space-y-6">
                  {/* Privacy Options */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Privacy Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                        <div>
                          <h4 className="font-medium text-gray-900">Data Sharing</h4>
                          <p className="text-sm text-gray-600">Share anonymized data to improve services</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={dataSharing}
                            onChange={() => setDataSharing(!dataSharing)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                        <div>
                          <h4 className="font-medium text-gray-900">Activity Logging</h4>
                          <p className="text-sm text-gray-600">Log your activity for better service and troubleshooting</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={activityLogging}
                            onChange={() => setActivityLogging(!activityLogging)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after-border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button className="text-blue-600 text-sm font-medium hover:underline">
                        Download Your Data
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        Request a copy of all your personal data stored in our system
                      </p>
                    </div>
                  </div>
                  
                  {/* Sessions */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Active Sessions</h3>
                    <div className="border border-gray-200 rounded-md overflow-hidden">
                      <div className="p-3 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="p-1.5 bg-green-100 rounded-full">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 ml-2">Current Session</span>
                          </div>
                          <span className="text-xs text-gray-500">Active</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Current Device • {user.username}</div>
                      </div>
                    </div>
                    <button className="mt-3 text-red-600 text-sm font-medium hover:underline flex items-center">
                      <RefreshCw size={14} className="mr-1" />
                      Sign Out of All Other Sessions
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Display Settings */}
            {selectedTab === 'display' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Display Settings</h2>
                
                <div className="space-y-6">
                  {/* Theme Options */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Theme Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <Moon size={20} className="text-gray-500 mr-3" />
                          <div>
                            <h4 className="font-medium text-gray-900">Dark Mode</h4>
                            <p className="text-sm text-gray-600">Switch to dark theme for reduced eye strain</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <Toggle size={20} className="text-gray-500 mr-3" />
                          <div>
                            <h4 className="font-medium text-gray-900">High Contrast</h4>
                            <p className="text-sm text-gray-600">Increase contrast for better visibility</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={highContrast}
                            onChange={() => setHighContrast(!highContrast)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Layout Options */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Layout Options</h3>
                    <div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <div>
                            <h4 className="font-medium text-gray-900">Compact View</h4>
                            <p className="text-sm text-gray-600">Display more content with reduced spacing</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={compactView}
                            onChange={() => setCompactView(!compactView)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Size */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Text Size</h3>
                    <div className="space-y-2">
                      <div>
                        <label htmlFor="fontSize" className="block text-sm text-gray-600 mb-1">
                          Font Size
                        </label>
                        <div className="relative">
                          <select
                            id="fontSize"
                            value={fontSize}
                            onChange={(e) => setFontSize(e.target.value)}
                            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="x-large">Extra Large</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      
                      <div className="p-3 mt-2 bg-blue-50 border border-blue-100 rounded-md text-blue-700 text-sm">
                        Font size changes will apply across the entire application.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Save Button - Only for profile and other tabs, not credentials */}
            {(selectedTab === 'profile' || selectedTab === 'notifications' || selectedTab === 'security' || selectedTab === 'display') && selectedTab !== 'credentials' && (
              <div className="mt-8 border-t border-gray-200 pt-4 flex items-center justify-between">
                <button 
                  onClick={handleSaveSettings} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center"
                  disabled={saveStatus === 'saving'}
                >
                  {saveStatus === 'saving' && <RefreshCw size={18} className="animate-spin mr-2" />}
                  {saveStatus === 'saved' && <CheckCircle size={18} className="mr-2" />}
                  {saveStatus === null && <Save size={18} className="mr-2" />}
                  {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save Settings'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Account Options */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Options</h2>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-1">Export Your Data</h3>
            <p className="text-gray-600 text-sm mb-3">Download a copy of all your data from the platform</p>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-50 transition-colors">
              Request Data Export
            </button>
          </div>
          
          <div className="p-4 border border-red-100 rounded-lg bg-red-50">
            <h3 className="font-medium text-red-900 mb-1">Delete Account</h3>
            <p className="text-red-600 text-sm mb-3">Permanently delete your account and all associated data</p>
            <button className="bg-white border border-red-300 text-red-600 px-4 py-2 rounded font-medium hover:bg-red-50 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};