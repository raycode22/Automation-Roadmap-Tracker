import React from 'react';

const ChartCard = ({ title, icon: Icon, iconColor, children, darkMode }) => (
  <div 
    className={`p-6 rounded-xl border-2 ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}
    role="article"
    aria-label={title}
  >
    <h2 
      className={`text-xl font-bold mb-4 flex items-center gap-2 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      <Icon size={20} className={iconColor} aria-hidden="true" />
      {title}
    </h2>
    {children}
  </div>
);

export default ChartCard;
