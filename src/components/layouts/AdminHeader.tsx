import React, { useState } from 'react';
import { Bell, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { RootState } from '@/store/reducer';

interface AdminHeaderProps {
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title = 'Dashboard' }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Wishlist', path: '/admin/wishlists' },
    { label: 'Feature', path: '/admin/features' },
    { label: 'Cart', path: '/admin/carts' },
    { label: 'Product', path: '/admin/products' },
    { label: 'Category', path: '/admin/categories' },
    { label: 'Static', path: '/admin/static' },
    { label: 'Orders', path: '/admin/orders' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">Welcome back, {user?.firstName ?? ''}</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden sm:flex flex-wrap gap-3 md:gap-5 items-center bg-white p-2 rounded-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-700 hover:text-blue-600 hover:shadow-md transition duration-300 rounded-lg py-1.5 px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section - Icons + Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop Icons */}
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block text-gray-700 hover:text-blue-600 hover:shadow-md transition duration-300 rounded-lg py-2 px-4 bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex justify-end gap-4 mt-2 pr-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
