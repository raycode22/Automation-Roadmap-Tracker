import React from 'react';

const StatCard = ({ icon: Icon, label, value, subtext, colorClass, iconColor, darkMode }) => (
  <div 
    className={`p-6 rounded-xl border-2 ${colorClass}`}
    role="article"
    aria-label={`${label}: ${value}`}
  >
    <div className="flex items-center gap-3 mb-3">
      <Icon size={24} className={iconColor} aria-hidden="true" />
      <span 
        className={`text-sm font-semibold ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        {label}
      </span>
    </div>
    <div 
      className={`text-3xl font-bold ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}
      aria-live="polite"
    >
      {value}
    </div>
    <div 
      className={`text-sm ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}
    >
      {subtext}
    </div>
  </div>
);

export default StatCard;
