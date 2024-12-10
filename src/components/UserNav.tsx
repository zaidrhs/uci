import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export default function UserNav() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center space-x-4">
      {/* عرض عنصر Admin فقط للمستخدمين الذين لديهم دور ADMIN */}
      {user.role === 'ADMIN' && (
        <Link
          to="/admin"
          className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
        >
          <Settings className="h-5 w-5" />
          <span className="text-sm">Admin Dashboard</span>
        </Link>
      )}

      {/* عنصر الحساب */}
      <div className="relative group">
        <Link
          to="/account"
          className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
        >
          <User className="h-5 w-5" />
          <span className="text-sm">Account</span>
        </Link>
        <div className="absolute z-10 invisible group-hover:visible bg-white border border-gray-200 rounded-md shadow-lg p-4 w-64 mt-2 right-0">
          <p className="text-sm text-gray-600">
            View and manage your profile information, security settings, and notification preferences. Access your personal dashboard to update contact details, change password, and customize your experience.
          </p>
        </div>
      </div>

      {/* زر تسجيل الخروج */}
      <button
        onClick={logout}
        className={cn(
          'flex items-center space-x-1 px-3 py-2 rounded-md',
          'text-red-600 hover:text-white hover:bg-red-600',
          'transition-colors duration-200'
        )}
      >
        <LogOut className="h-5 w-5" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
}
