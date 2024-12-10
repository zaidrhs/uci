import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileSection from '../components/account/ProfileSection';
import SecuritySection from '../components/account/SecuritySection';
import PreferencesSection from '../components/account/PreferencesSection';
import { Shield } from 'lucide-react';

export default function Account() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
              </div>
              
              <div className="space-y-6">
                <ProfileSection user={user} />
                <SecuritySection />
                <PreferencesSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}