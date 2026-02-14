import React, { ReactNode } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
  color: 'blue' | 'green' | 'red' | 'yellow';
}

export const StatCard = ({ icon, label, value, change, color }: StatCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600';
      case 'green':
        return 'bg-green-50 text-green-600';
      case 'red':
        return 'bg-red-50 text-red-600';
      case 'yellow':
        return 'bg-yellow-50 text-yellow-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const isPositive = change.includes('+');

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2 rounded-md ${getColorClasses()}`}>{icon}</div>
        <span className={`text-sm font-medium flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
          {change}
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  );
};