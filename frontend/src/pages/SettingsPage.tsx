import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <SettingsIcon className="h-6 w-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>
      
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
        <p className="text-gray-600 mb-4">
          This page will allow you to manage your account settings and preferences.
        </p>
        <div className="text-sm text-gray-500">
          <p>Features to implement:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Update profile information</li>
            <li>Change password</li>
            <li>Export/import progress data</li>
            <li>Notification preferences</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;