import React, { useState, useEffect } from 'react';
import { BarChart3, Clock, Users, Search, MessageCircle, FileText, RefreshCw, Globe, Laptop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChatInterface } from '../components/Chat/ChatInterface';
import { InfoCard } from '../components/Dashboard/InfoCard';
import { StatCard } from '../components/Dashboard/StatCard';
import { useRealtime } from '../context/RealtimeContext';
import { OnboardingWizard } from '../components/Onboarding/OnboardingWizard';

export const Home = () => {
  const navigate = useNavigate();
  const [showWizard, setShowWizard] = useState(false);

  // Auto-show wizard for first-time visitors
  useEffect(() => {
    const seen = localStorage.getItem('govrise-onboarding-done');
    if (!seen) setShowWizard(true);
  }, []);

  const handleWizardClose = () => {
    setShowWizard(false);
    localStorage.setItem('govrise-onboarding-done', 'true');
  };
  const { activeApplications, processingTime, approvalRate, supportRequests } = useRealtime();

  const stats = [
    { icon: <Users size={20} />, label: 'Active Applications', value: activeApplications.toLocaleString(), change: '+8%', color: 'blue' as const },
    { icon: <Clock size={20} />, label: 'Avg. Processing Time', value: `${processingTime} months`, change: '-2 months', color: 'green' as const },
    { icon: <RefreshCw size={20} />, label: 'Approval Rate', value: `${approvalRate}%`, change: '+3%', color: 'green' as const },
    { icon: <MessageCircle size={20} />, label: 'Support Requests', value: supportRequests.toLocaleString(), change: '+12', color: 'yellow' as const },
  ];

  const featuredResources = [
    {
      title: 'Australian Family Visa Guide',
      description: 'Comprehensive guide to family visa options in Australia.',
      icon: <FileText size={20} />,
    },
    {
      title: 'Document Checklist',
      description: 'Essential documents needed for Australian family visa applications.',
      icon: <FileText size={20} />,
    },
    {
      title: 'Home Affairs Contact Directory',
      description: 'Contact information for Australian Department of Home Affairs offices.',
      icon: <Globe size={20} />,
    },
    {
      title: 'Online Training Courses',
      description: 'Free courses to help navigate the Australian family visa process.',
      icon: <Laptop size={20} />,
    },
  ];

  const handleExport = () => {
    navigate('/no-data?action=Export Data&source=dashboard');
  };

  const handleViewAll = () => {
    navigate('/information-hub');
  };

  const handleLearnMore = () => {
    navigate('/no-data?action=Australian Migration Program Details&source=dashboard');
  };

  return (
    <div className="h-full">
      {showWizard && <OnboardingWizard onClose={handleWizardClose} onNavigate={navigate} />}
      {/* Mission & Onboarding Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="md:w-2/3">
            <h1 className="text-2xl font-bold mb-1">Welcome to GovRise</h1>
            <p className="text-blue-100 text-sm mb-3">
              GovRise is an AI-powered refugee and family reunification platform. We help refugees, migrants, and their families understand their options, navigate legal processes, and connect with lawyers, NGOs, and support institutions — across 14 countries and multiple languages.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="bg-blue-600 bg-opacity-60 px-3 py-1 rounded-full">🌍 14 Countries</span>
              <span className="bg-blue-600 bg-opacity-60 px-3 py-1 rounded-full">🤝 Legal & NGO Matching</span>
              <span className="bg-blue-600 bg-opacity-60 px-3 py-1 rounded-full">🧒 UASC Support</span>
              <span className="bg-blue-600 bg-opacity-60 px-3 py-1 rounded-full">🌐 Multi-Language</span>
              <span className="bg-blue-600 bg-opacity-60 px-3 py-1 rounded-full">🎓 Education Pathways</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <button
              onClick={() => setShowWizard(true)}
              className="bg-white text-blue-700 font-medium px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              ✨ Get Guided
            </button>
            <button
              onClick={() => navigate('/information-hub')}
              className="bg-blue-600 bg-opacity-60 border border-white border-opacity-40 text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-opacity-80 transition-colors"
            >
              Explore Countries
            </button>
            <button
              onClick={() => navigate('/find-support')}
              className="bg-blue-600 bg-opacity-60 border border-white border-opacity-40 text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-opacity-80 transition-colors"
            >
              Find Legal Help
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Family Reunification Dashboard</h2>
        <p className="text-gray-600">Live platform metrics and quick access to tools and resources.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Australian Visa Processing Overview
            </h2>
            <div className="flex gap-2">
              <select className="border border-gray-300 rounded-md text-sm px-2 py-1">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last Year</option>
              </select>
              <button 
                onClick={handleExport}
                className="text-blue-600 text-sm font-medium hover:text-blue-800"
              >
                Export
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center p-4">
                <h3 className="font-medium text-gray-800 mb-2">Australian Visa Processing Times (2023-2024)</h3>
                <ul className="text-left text-sm text-gray-600 space-y-2 mt-4">
                  <li><span className="font-medium">Partner Visas (309/100):</span> 12-24 months</li>
                  <li><span className="font-medium">Partner Visas (820/801):</span> 18-30 months</li>
                  <li><span className="font-medium">Child Visas (101):</span> 12-16 months</li>
                  <li><span className="font-medium">Parent Visas (103):</span> 30+ years waiting period</li>
                  <li><span className="font-medium">Contributory Parent (143):</span> 3-4 years</li>
                  <li><span className="font-medium">Humanitarian (Split Family 202):</span> 18-24 months</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              AI Assistant
            </h2>
          </div>
          <ChatInterface />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">Australian Visa Resources</h2>
          <button 
            onClick={handleViewAll}
            className="text-blue-600 text-sm font-medium hover:text-blue-800"
          >
            View All
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredResources.map((resource, index) => (
            <InfoCard key={index} {...resource} />
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:w-2/3">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Australian Migration Program Updates
            </h3>
            <p className="text-blue-700 mb-2">
              The Australian Migration Program for 2023-24 has allocated 52,500 places for family visas. Partner visas are now demand-driven, with no cap on the number of visas granted.
            </p>
            <p className="text-blue-700">
              The Family Stream includes Partner, Parent, Child, and Other Family visas for eligible applicants with family members who are Australian citizens, permanent residents, or eligible New Zealand citizens.
            </p>
          </div>
          <div>
            <button 
              onClick={handleLearnMore}
              className="bg-white text-blue-600 border border-blue-300 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};