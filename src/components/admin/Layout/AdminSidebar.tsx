
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Heart, 
  BarChart3, 
  Users,
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ComponentType<any>;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, onClick, isActive }) => (
  <SidebarMenuItem>
    <SidebarMenuButton 
      onClick={onClick}
      isActive={isActive}
      className="w-full justify-start gap-3 hover:bg-blue-50 hover:text-blue-600 transition-colors"
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

interface AdminSidebarProps {
  activeModule?: string;
  onModuleChange?: (module: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeModule = 'dashboard', 
  onModuleChange = () => {}
}) => {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'products', icon: ShoppingBag, label: 'Products' },
    { id: 'carts', icon: ShoppingCart, label: 'Carts' },
    { id: 'wishlists', icon: Heart, label: 'Wishlists' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">E-Commerce</h2>
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  onClick={() => onModuleChange(item.id)}
                  isActive={activeModule === item.id}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <SidebarMenu>
          <SidebarItem
            icon={LogOut}
            label="Logout"
            onClick={() => onModuleChange('login')}
          />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
