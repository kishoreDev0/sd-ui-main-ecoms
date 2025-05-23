import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Trash2, ShoppingCart } from 'lucide-react';

interface Cart {
  id: string;
  userId: string;
  userEmail: string;
  items: number;
  total: number;
  status: 'active' | 'abandoned';
  lastUpdated: string;
}

export const CartsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [carts] = useState<Cart[]>([
    {
      id: '1',
      userId: 'user1',
      userEmail: 'john@example.com',
      items: 3,
      total: 299.99,
      status: 'active',
      lastUpdated: '2 hours ago',
    },
    {
      id: '2',
      userId: 'user2',
      userEmail: 'jane@example.com',
      items: 1,
      total: 99.99,
      status: 'abandoned',
      lastUpdated: '1 day ago',
    },
    {
      id: '3',
      userId: 'user3',
      userEmail: 'bob@example.com',
      items: 5,
      total: 1299.99,
      status: 'active',
      lastUpdated: '30 minutes ago',
    },
  ]);

  const filteredCarts = carts.filter(cart =>
    cart.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cart.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shopping Carts</h2>
          <p className="text-gray-500">Monitor customer shopping carts</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-3 py-1">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {carts.length} Total Carts
          </Badge>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search carts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cart ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCarts.map((cart) => (
                <TableRow key={cart.id}>
                  <TableCell className="font-mono text-sm">#{cart.id}</TableCell>
                  <TableCell>{cart.userEmail}</TableCell>
                  <TableCell>{cart.items} items</TableCell>
                  <TableCell className="font-semibold">${cart.total}</TableCell>
                  <TableCell>
                    <Badge variant={cart.status === 'active' ? 'default' : 'destructive'}>
                      {cart.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{cart.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};
