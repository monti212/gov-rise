import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (action: string) => {
    navigate(`/no-data?action=${encodeURIComponent(action)}&source=footer`);
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-3 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
        <div className="mb-2 md:mb-0">
          © 2025 GovRise Family Reunification Platform. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => handleLinkClick('Privacy Policy')}
            className="hover:text-blue-600 transition-colors"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => handleLinkClick('Terms of Service')}
            className="hover:text-blue-600 transition-colors"
          >
            Terms of Service
          </button>
          <button 
            onClick={() => handleLinkClick('Contact')}
            className="hover:text-blue-600 transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
};