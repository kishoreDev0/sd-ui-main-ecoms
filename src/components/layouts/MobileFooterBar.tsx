// src/components/layouts/MobileFooterBar.tsx
import React from 'react';
import { Home, Heart, ShoppingCart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const tabs = [
  { to: '/', label: 'Home', icon: <Home size={20} /> },
  { to: '/wishlist', label: 'Wishlist', icon: <Heart size={20} /> },
  { to: '/cart', label: 'Cart', icon: <ShoppingCart size={20} /> },
  { to: '/account', label: 'Account', icon: <User size={20} /> },
];

export const MobileFooterBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t shadow-md">
      <div className="flex justify-around items-center h-14">
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            className={clsx(
              'flex flex-col items-center justify-center text-xs',
              pathname === tab.to ? 'text-blue-600 font-medium' : 'text-gray-600'
            )}
          >
            {tab.icon}
            <span className="text-[11px]">{tab.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
