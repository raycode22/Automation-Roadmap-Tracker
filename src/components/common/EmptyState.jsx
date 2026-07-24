import React from 'react';
import { BookOpen } from 'lucide-react';

const EmptyState = ({ darkMode, icon: Icon = BookOpen, title, description, action }) => (
  <div 
    className={`p-8 rounded-xl border-2 text-center ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}
    role="status"
    aria-label={title}
  >
    <Icon 
      size={48} 
      className={`mx-auto mb-4 ${
        darkMode ? 'text-gray-600' : 'text-gray-400'
      }`} 
      aria-hidden="true"
    />
    <h2 
      className={`text-xl font-bold mb-2 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      {title}
    </h2>
    <p 
      className={`mb-4 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}
    >
      {description}
    </p>
    {action && (
      <div className="mt-4">
        {action}
      </div>
    )}
  </div>
);

export default EmptyState;
