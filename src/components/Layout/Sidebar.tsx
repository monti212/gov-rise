import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, BookOpen, Users, MessageSquare, BarChart3, Settings, HelpCircle, Globe, User } from 'lucide-react';

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

interface SidebarProps {
  currentPath: string;
  user: User;
}

export const Sidebar = ({ currentPath, user }: SidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <HomeIcon size={20} />, text: 'Home', path: '/', active: currentPath === '/' },
    { icon: <Globe size={20} />, text: 'Information Hub', path: '/information-hub', active: currentPath === '/information-hub' },
    { icon: <BookOpen size={20} />, text: 'Training Portal', path: '/training', active: currentPath === '/training' },
    { icon: <Users size={20} />, text: 'Collaboration', path: '/collaboration', active: currentPath === '/collaboration' },
    { icon: <MessageSquare size={20} />, text: 'Support System', path: '/support', active: currentPath === '/support' },
    { icon: <BarChart3 size={20} />, text: 'Reports', path: '/reports', active: currentPath === '/reports' },
    { icon: <Settings size={20} />, text: 'Settings', path: '/settings', active: currentPath === '/settings' },
    { icon: <HelpCircle size={20} />, text: 'Help Center', path: '/help', active: currentPath === '/help' },
  ];

  const handleProfileClick = () => {
    navigate('/settings');
  };

  // Get display name - use full name if available, otherwise username
  const getDisplayName = () => {
    return user.profile.fullName || user.username;
  };

  // Get display role - use job title if available, otherwise default
  const getDisplayRole = () => {
    return user.profile.jobTitle || 'Australian Visa User';
  };

  return (
    <div className="bg-white w-16 md:w-64 transition-all duration-300 ease-in-out border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-center md:justify-start space-x-3">
        <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg">
          <Globe className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold hidden md:block">GovRise</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg ${
                  item.active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="hidden md:block font-medium">{item.text}</span>
                {item.active && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full ml-auto hidden md:block"></span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleProfileClick}
          className="w-full group hover:bg-gray-50 rounded-lg p-2 transition-colors"
        >
          <div className="hidden md:flex items-center space-x-3">
            <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-700 truncate">
                {getDisplayName()}
              </h4>
              <p className="text-xs text-gray-500 truncate">{getDisplayRole()}</p>
            </div>
          </div>
          <div className="md:hidden flex justify-center">
            <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <User className="h-5 w-5" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};