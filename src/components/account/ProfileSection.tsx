import React from 'react';
import { User } from '../../types';
import { User as UserIcon, Mail } from 'lucide-react';

interface ProfileSectionProps {
  user: User | null;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <UserIcon className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="text-base text-gray-900">{user.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-base text-gray-900">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}