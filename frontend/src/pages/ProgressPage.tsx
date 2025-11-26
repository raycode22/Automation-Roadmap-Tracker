import React from 'react';
import { CheckCircle } from 'lucide-react';

const ProgressPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-6 w-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>
      </div>
      
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Progress</h2>
        <p className="text-gray-600 mb-4">
          This page will allow you to track and update your progress on activities.
        </p>
        <div className="text-sm text-gray-500">
          <p>Features to implement:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Mark activities as completed</li>
            <li>Add progress notes</li>
            <li>Attach evidence links</li>
            <li>Filter by status and week</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;