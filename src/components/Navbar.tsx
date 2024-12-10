import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import LanguageToggle from './LanguageToggle';
import UserNav from './UserNav';
import { useAuth } from '../contexts/AuthContext';
import logo from '../components/assets/logo.png';

const navigation = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.products', href: '/products' },
  { name: 'nav.solutions', href: '/solutions' },
  { name: 'nav.sustainability', href: '/sustainability' },
  { name: 'nav.contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="UCI Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm font-medium text-gray-700 hover:text-blue-600',
                  'transition duration-150 ease-in-out'
                )}
              >
                {t(item.name)}
              </Link>
            ))}
            <LanguageToggle />
            {isAuthenticated ? (
              <UserNav />
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                {t('nav.login')}
              </Link>
            )}
          </div>

          <div className="flex md:hidden">
            <LanguageToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn('md:hidden', mobileMenuOpen ? 'block' : 'hidden')}>
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.name)}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cart
                </Link>
                <Link
                  to="/account"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Account
                </Link>
                <button
                  onClick={() => {
                    const { logout } = useAuth();
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}