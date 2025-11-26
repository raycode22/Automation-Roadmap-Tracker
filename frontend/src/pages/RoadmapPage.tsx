import React from 'react';
import { Map } from 'lucide-react';

const RoadmapPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Map className="h-6 w-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">Roadmap</h1>
      </div>
      
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">6-Week Automation Roadmap</h2>
        <p className="text-gray-600 mb-4">
          This page will display the complete roadmap structure with all weeks, days, and activities.
        </p>
        <div className="text-sm text-gray-500">
          <p>Features to implement:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Week-by-week breakdown</li>
            <li>Daily activity listings</li>
            <li>Progress indicators</li>
            <li>Interactive navigation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;