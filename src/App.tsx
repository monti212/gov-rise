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
import { NoData } from './pages/NoData';
import { CountryDetail } from './pages/CountryDetail';
import { ResourceDetail } from './pages/ResourceDetail';
import { CourseDetail } from './pages/CourseDetail';
import { ArticleDetail } from './pages/ArticleDetail';
import { Pathways } from './pages/Pathways';
import { FindSupport } from './pages/FindSupport';
import { UASC } from './pages/UASC';
import { Registration } from './pages/Registration';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { LoginPage } from './components/Auth/LoginPage';
import { RealtimeProvider } from './context/RealtimeContext';
import { supabase } from './utils/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  fullName: string;
  email: string;
  jobTitle: string;
  phone: string;
  timeZone: string;
  language: string;
  role: string;
}

interface AppUser {
  id: string;
  username: string;
  email: string;
  isAuthenticated: boolean;
  profile: UserProfile;
}

function MainLayout({ user, onLogout, onUpdateProfile }: {
  user: AppUser;
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
            <Route path="/pathways" element={<Pathways />} />
            <Route path="/find-support" element={<FindSupport />} />
            <Route path="/uasc" element={<UASC />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const buildAppUser = async (supabaseUser: User): Promise<AppUser> => {
    // Fetch profile from Supabase
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    return {
      id: supabaseUser.id,
      username: profile?.full_name || supabaseUser.email?.split('@')[0] || 'user',
      email: supabaseUser.email || '',
      isAuthenticated: true,
      profile: {
        fullName: profile?.full_name || '',
        email: supabaseUser.email || '',
        jobTitle: profile?.job_title || '',
        phone: profile?.phone || '',
        timeZone: profile?.time_zone || 'UTC',
        language: profile?.language || 'en',
        role: profile?.role || 'refugee',
      },
    };
  };

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const appUser = await buildAppUser(session.user);
        setUser(appUser);
      }
      setIsLoading(false);
    });

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session: Session | null) => {
        if (session?.user) {
          const appUser = await buildAppUser(session.user);
          setUser(appUser);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleUpdateProfile = async (updatedProfile: UserProfile) => {
    if (!user) return;
    // Update Supabase profiles table
    await supabase.from('profiles').update({
      full_name: updatedProfile.fullName,
      phone: updatedProfile.phone,
      job_title: updatedProfile.jobTitle,
      time_zone: updatedProfile.timeZone,
      language: updatedProfile.language,
      updated_at: new Date().toISOString(),
    }).eq('id', user.id);

    setUser({ ...user, profile: updatedProfile });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user?.isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <RealtimeProvider>
      <BrowserRouter>
        <MainLayout user={user} onLogout={handleLogout} onUpdateProfile={handleUpdateProfile} />
      </BrowserRouter>
    </RealtimeProvider>
  );
}

export default App;
