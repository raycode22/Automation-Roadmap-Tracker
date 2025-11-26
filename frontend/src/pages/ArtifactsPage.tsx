import React from 'react';
import { Folder } from 'lucide-react';

const ArtifactsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Folder className="h-6 w-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">Artifacts</h1>
      </div>
      
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Artifacts</h2>
        <p className="text-gray-600 mb-4">
          This page will display all your completed project artifacts and capstone outputs.
        </p>
        <div className="text-sm text-gray-500">
          <p>Features to implement:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Upload artifact files and links</li>
            <li>Organize by week and day</li>
            <li>Mark artifacts as public/private</li>
            <li>View public artifacts from others</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArtifactsPage;