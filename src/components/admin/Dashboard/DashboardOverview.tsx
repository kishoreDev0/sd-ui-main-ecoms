
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ShoppingCart, Heart, Users, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Plus, Eye, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, useAppSelector } from '@/store';
import { RootState } from '@/store/reducer';
import { useDispatch } from 'react-redux';
import { fetchAllCarts } from '@/store/action/cart';
import { fetchAllFeatures } from '@/store/action/feature';
import { fetchAllProducts } from '@/store/action/products';
import { fetchAllUsers } from '@/store/action/user';
import { fetchAllWishlists } from '@/store/action/wishlist';
import { Progress } from '../ui/progress';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  trend: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, trend }) => (
        <Card key={title} className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
              <Icon className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{value}</div>
              <div className="flex items-center text-xs text-slate-500">
                {trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={trend === "up" ? "text-green-600" : "text-blue-600"}>{change}</span>
                {/* <span className="ml-1">{description}</span> */}
              </div>
            </CardContent>
          </Card>
);

interface DashboardOverviewProps {
  onNavigate?: (module: string) => void;
}

export const  DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate = () => {} }) => {

  // Global state 
  const { user } = useAppSelector(((state:RootState) => state.auth));
  const { products } = useAppSelector(((state:RootState) => state.productSelector));
  const { carts } = useAppSelector(((state:RootState) => state.cartSelector));
  const { users } = useAppSelector(((state:RootState) => state.userSelector));
  const { wishlist } = useAppSelector(((state:RootState) => state.wishlistSelector));





  const stats = [
    {
      title: 'Total Products',
      value: String(products.length),
      change: '+12%',
      icon: ShoppingBag,
      trend: 'up' as const,
      module: 'products'
    },
    {
      title: 'Active Carts',
      value: String(carts.length),
      change: '+5%',
      icon: ShoppingCart,
      trend: 'up' as const,
      module: 'carts'
    },
    {
      title: 'Wishlist Items',
      value: String(wishlist.length),
      change: '-2%',
      icon: Heart,
      trend: 'down' as const,
      module: 'wishlists'
    },
    {
      title: 'Total Users',
      value: String(users.length),
      change: '+8%',
      icon: Users,
      trend: 'up' as const,
      module: 'users'
    }
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const navigateAlong = (link:string) => {
   navigate(`/admin/${link}`);
  };
  useEffect(()=>{
      dispatch(fetchAllCarts())
      dispatch(fetchAllFeatures())
      dispatch(fetchAllProducts())
      dispatch(fetchAllUsers())
      dispatch(fetchAllWishlists())
  },[dispatch]);

    const lowStockProducts = products.filter(product => {
  const stockPercentage = (product.noOfStock / product.totalNoOfStock) * 100;
  console.log(stockPercentage)
  return stockPercentage < 50; // Only keep products with less than 50% stock
  });


  return (
    <div className="space-y-6 dashmain bg-1slight-white  animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} onClick={() => onNavigate(stat.module)} className="cursor-pointer">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Card className="p-6 w-[75%]">
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

        {/* <Card className="p-6">
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
        </Card> */}
         <div className="space-y-4 w-[25%]">
          {/* Low Stock Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertTriangle className="h-5 w-5" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               {lowStockProducts.length > 0  && lowStockProducts.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-slate-500">{item.noOfStock} left</span>
                  </div>
                  <Progress value={(item.noOfStock / item.totalNoOfStock) * 100} className="h-2" />
                </div>
              ))}
              <Button size="sm" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Restock Items
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" onClick={() => navigateAlong('products')} className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                View All Orders
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Customer Management
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
