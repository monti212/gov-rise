import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Database, ExternalLink, RefreshCw } from 'lucide-react';

export const NoData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the referring page or action from query params
  const searchParams = new URLSearchParams(location.search);
  const action = searchParams.get('action') || 'requested feature';
  const source = searchParams.get('source') || 'page';

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
            <Database className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Data Available</h1>
          <p className="text-gray-600">
            The {action} is not yet implemented or no data is currently available for this feature.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">This is a demo platform</h3>
          <p className="text-blue-700 text-sm">
            Many features are simulated for demonstration purposes. In a production environment, 
            this would connect to real data sources and external systems.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGoBack}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">Suggested Actions</h4>
          <div className="space-y-2 text-sm">
            <a
              href="/information-hub"
              onClick={(e) => { e.preventDefault(); navigate('/information-hub'); }}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ExternalLink size={14} className="mr-1" />
              Browse Information Hub
            </a>
            <a
              href="/training"
              onClick={(e) => { e.preventDefault(); navigate('/training'); }}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ExternalLink size={14} className="mr-1" />
              Explore Training Portal
            </a>
            <a
              href="/support"
              onClick={(e) => { e.preventDefault(); navigate('/support'); }}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ExternalLink size={14} className="mr-1" />
              Get Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};