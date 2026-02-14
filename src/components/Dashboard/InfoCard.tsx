import React, { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InfoCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export const InfoCard = ({ title, description, icon }: InfoCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Route to appropriate pages based on the card title
    switch (title) {
      case 'Australian Family Visa Guide':
      case 'Document Checklist':
      case 'Home Affairs Contact Directory':
        // Route to ResourceDetail page with the title as parameter
        navigate(`/resource-detail?title=${encodeURIComponent(title)}&type=Documentation`);
        break;
      case 'Online Training Courses':
        // Route to Training Portal
        navigate('/training');
        break;
      default:
        // For any other titles, route to ResourceDetail as a fallback
        navigate(`/resource-detail?title=${encodeURIComponent(title)}&type=General`);
        break;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="mb-3 flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-md text-blue-600">{icon}</div>
        <h3 className="font-medium text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <button
        onClick={handleViewDetails}
        className="text-blue-600 text-sm font-medium flex items-center hover:underline"
      >
        View Details
        <ArrowRight className="h-4 w-4 ml-1" />
      </button>
    </div>
  );
};