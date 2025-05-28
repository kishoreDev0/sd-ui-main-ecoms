
import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { RootState } from '@/store/reducer';

interface AdminHeaderProps {
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title = 'Dashboard' }) => {
  const {user} = useAppSelector((state:RootState) => state.auth)
  return (
    <header className="bg-white navadbar border-b border-gray-200 px-6 shadow-md  py-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* <SidebarTrigger /> */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">Welcome back, {user?.firstName ?? ''}</p>
          </div>
        </div>
       <div className="flex items-center gap-6 bg-white p-4 rounded-lg">
          <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600 hover:shadow-lg transition duration-300 ease-in-out rounded-lg py-2 px-4">
            Dashboard
          </Link>
          <Link to="/admin/wishlists" className="text-gray-700 hover:text-blue-600 hover:shadow-lg transition duration-300 ease-in-out rounded-lg py-2 px-4">
            Wishlist
          </Link>
          <Link to="/admin/features" className="text-gray-700 hover:text-blue-600 hover:shadow-lg transition duration-300 ease-in-out rounded-lg py-2 px-4">
            Feature
          </Link>
          <Link to="/admin/carts" className="text-gray-700 hover:text-blue-600 hover:shadow-lg transition duration-300 ease-in-out rounded-lg py-2 px-4">
            Cart
          </Link>
          <Link to="/admin/products" className="text-gray-700 hover:text-blue-600 hover:shadow-lg transition duration-300 ease-in-out rounded-lg py-2 px-4">
            Product
          </Link>
          <Link to="/admin/categories" className="text-gray-700 hover:text-blue-600 hover:shadow-lg transition duration-300 ease-in-out rounded-lg py-2 px-4">
            Category
          </Link>
        </div>


        <div className="flex items-center gap-4">
            
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
