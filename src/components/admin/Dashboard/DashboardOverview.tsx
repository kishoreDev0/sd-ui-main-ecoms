
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ShoppingCart, Heart, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  trend: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, trend }) => (
  <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        <div className="flex items-center mt-2">
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        </div>
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </Card>
);

interface DashboardOverviewProps {
  onNavigate?: (module: string) => void;
}

export const  DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate = () => {} }) => {
  const stats = [
    {
      title: 'Total Products',
      value: '1,234',
      change: '+12%',
      icon: ShoppingBag,
      trend: 'up' as const,
      module: 'products'
    },
    {
      title: 'Active Carts',
      value: '89',
      change: '+5%',
      icon: ShoppingCart,
      trend: 'up' as const,
      module: 'carts'
    },
    {
      title: 'Wishlist Items',
      value: '456',
      change: '-2%',
      icon: Heart,
      trend: 'down' as const,
      module: 'wishlists'
    },
    {
      title: 'Total Users',
      value: '2,567',
      change: '+8%',
      icon: Users,
      trend: 'up' as const,
      module: 'users'
    }
  ];

  const navigate = useNavigate();
  const navigateAlong = (link:string) => {
   navigate(`/admin/${link}`);
  };

  return (
    <div className="space-y-6 dashmain  animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} onClick={() => onNavigate(stat.module)} className="cursor-pointer">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New product added', item: 'iPhone 15 Pro', time: '2 minutes ago', module: 'products' },
              { action: 'Cart abandoned', item: 'User #1234', time: '5 minutes ago', module: 'carts' },
              { action: 'Wishlist updated', item: 'Samsung Galaxy', time: '10 minutes ago', module: 'wishlists' },
              { action: 'User registered', item: 'john@example.com', time: '15 minutes ago', module: 'users' }
            ].map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 rounded-md px-2"
                onClick={() => onNavigate(activity.module)}
              >
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.item}</p>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className="h-20 flex-col gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
               onClick={() => navigateAlong("products")}
               data-link='/admin/products'
            >
              <ShoppingBag className="h-6 w-6" />
              <span>Add Product</span>
            </Button>
            <Button 
              className="h-20 flex-col gap-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
              onClick={() => navigateAlong("users")}
               data-link='/admin/users'
            >
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button 
              className="h-20 flex-col gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200"
              onClick={() => navigateAlong("carts")}
              data-link='/admin/carts'
            >
              <ShoppingCart className="h-6 w-6" />
              <span>View Carts</span>
            </Button>
            <Button 
              className="h-20 flex-col gap-2 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200"
              onClick={() => navigateAlong("wishlists")}
               data-link='/admin/wishlists'
            >
              <Heart className="h-6 w-6" />
              <span>Wishlists</span>
            </Button>

             <Button 
              className="h-20 flex-col gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
               onClick={() => navigateAlong("features")}
               data-link='/admin/features'
            >
              <ShoppingBag className="h-6 w-6" />
              <span>Add Feature</span>
            </Button>
            <Button 
              className="h-20 flex-col gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200"
              onClick={() => navigateAlong("categories")}
              data-link='/admin/categories'
            >
              <ShoppingCart className="h-6 w-6" />
              <span>View Categories</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
