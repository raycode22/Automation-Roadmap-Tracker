import React from 'react';

const RecordCard = ({ title, icon: Icon, value, metric, message, colorClass, textColor, metricColor, darkMode }) => (
  <div 
    className={`p-6 rounded-xl border-2 ${colorClass}`}
    role="article"
    aria-label={`${title}: ${metric}`}
  >
    <h2 
      className={`text-lg font-bold mb-3 flex items-center gap-2 ${textColor}`}
    >
      <Icon size={20} aria-hidden="true" />
      {title}
    </h2>
    <div 
      className={`text-lg font-semibold mb-2 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      {value}
    </div>
    <div 
      className={`text-3xl font-bold ${metricColor}`}
      aria-live="polite"
    >
      {metric}
    </div>
    <p 
      className={`text-sm mt-2 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}
    >
      {message}
    </p>
  </div>
);

export default RecordCard;
