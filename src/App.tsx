import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { InformationHub } from './pages/InformationHub';
import { TrainingPortal } from './pages/TrainingPortal';
import { Collaboration } from './pages/Collaboration';
import { SupportSystem } from './pages/SupportSystem';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { HelpCenter } from './pages/HelpCenter';
import { Pathways } from './pages/Pathways';
import { FindSupport } from './pages/FindSupport';
import { UASC } from './pages/UASC';
import { Registration } from './pages/Registration';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { NoData } from './pages/NoData';
import { CountryDetail } from './pages/CountryDetail';
import { ResourceDetail } from './pages/ResourceDetail';
import { CourseDetail } from './pages/CourseDetail';
import { ArticleDetail } from './pages/ArticleDetail';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { LoginPage } from './components/Auth/LoginPage';
import { RealtimeProvider } from './context/RealtimeContext';

interface LoginCredentials {
  username: string;
  password: string;
}

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

function MainLayout({ user, onLogout, onUpdateProfile }: { 
  user: User; 
  onLogout: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
}) {
  const location = useLocation();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath={location.pathname} user={user} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/information-hub" element={<InformationHub />} />
            <Route path="/training" element={<TrainingPortal />} />
            <Route path="/pathways" element={<Pathways />} />
            <Route path="/find-support" element={<FindSupport />} />
            <Route path="/uasc" element={<UASC />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/support" element={<SupportSystem />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings user={user} onUpdateProfile={onUpdateProfile} />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/no-data" element={<NoData />} />
            <Route path="/country-detail/:country" element={<CountryDetail />} />
            <Route path="/resource-detail" element={<ResourceDetail />} />
            <Route path="/course-detail" element={<CourseDetail />} />
            <Route path="/article-detail" element={<ArticleDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user profile from localStorage
  const loadUserProfile = (username: string): UserProfile => {
    try {
      const savedProfile = localStorage.getItem(`govrise-profile-${username}`);
      if (savedProfile) {
        return JSON.parse(savedProfile);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
    
    // Default profile
    return {
      fullName: '',
      email: '',
      jobTitle: '',
      phone: '',
      timeZone: 'Australia/Sydney',
      language: 'en'
    };
  };

  // Save user profile to localStorage
  const saveUserProfile = (username: string, profile: UserProfile) => {
    try {
      localStorage.setItem(`govrise-profile-${username}`, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = () => {
      try {
        const savedSession = localStorage.getItem('govrise-session');
        if (savedSession) {
          const session = JSON.parse(savedSession);
          // Check if session is still valid (not expired)
          if (session.expiresAt > Date.now()) {
            const profile = loadUserProfile(session.username);
            setUser({
              username: session.username,
              isAuthenticated: true,
              profile
            });
          } else {
            // Session expired, clear it
            localStorage.removeItem('govrise-session');
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
        localStorage.removeItem('govrise-session');
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const handleLogin = (credentials: LoginCredentials) => {
    const profile = loadUserProfile(credentials.username);
    const userData = {
      username: credentials.username,
      isAuthenticated: true,
      profile
    };
    
    setUser(userData);

    // Save session to localStorage (expires in 24 hours)
    const session = {
      username: credentials.username,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    localStorage.setItem('govrise-session', JSON.stringify(session));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('govrise-session');
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    if (user) {
      const updatedUser = {
        ...user,
        profile: updatedProfile
      };
      setUser(updatedUser);
      saveUserProfile(user.username, updatedProfile);
    }
  };

  // Show loading spinner while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!user?.isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show main application if authenticated
  return (
    <RealtimeProvider>
      <BrowserRouter>
        <MainLayout user={user} onLogout={handleLogout} onUpdateProfile={handleUpdateProfile} />
      </BrowserRouter>
    </RealtimeProvider>
  );
}

export default App;