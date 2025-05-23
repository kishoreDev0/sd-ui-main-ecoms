import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Trash2, Heart } from 'lucide-react';

interface Wishlist {
  id: string;
  userId: string;
  userEmail: string;
  items: number;
  totalValue: number;
  lastUpdated: string;
  topItem: string;
}

export const WishlistsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlists] = useState<Wishlist[]>([
    {
      id: '1',
      userId: 'user1',
      userEmail: 'john@example.com',
      items: 5,
      totalValue: 1299.99,
      lastUpdated: '3 hours ago',
      topItem: 'iPhone 15 Pro',
    },
    {
      id: '2',
      userId: 'user2',
      userEmail: 'jane@example.com',
      items: 2,
      totalValue: 599.99,
      lastUpdated: '1 day ago',
      topItem: 'MacBook Air',
    },
    {
      id: '3',
      userId: 'user3',
      userEmail: 'bob@example.com',
      items: 8,
      totalValue: 2199.99,
      lastUpdated: '2 hours ago',
      topItem: 'Samsung Galaxy S24',
    },
  ]);

  const filteredWishlists = wishlists.filter(wishlist =>
    wishlist.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wishlist.topItem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Wishlists</h2>
          <p className="text-gray-500">Monitor customer wishlists and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-3 py-1">
            <Heart className="h-4 w-4 mr-2" />
            {wishlists.reduce((acc, w) => acc + w.items, 0)} Total Items
          </Badge>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search wishlists..."
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
                <TableHead>Wishlist ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Top Item</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWishlists.map((wishlist) => (
                <TableRow key={wishlist.id}>
                  <TableCell className="font-mono text-sm">#{wishlist.id}</TableCell>
                  <TableCell>{wishlist.userEmail}</TableCell>
                  <TableCell>{wishlist.items} items</TableCell>
                  <TableCell className="font-semibold">${wishlist.totalValue}</TableCell>
                  <TableCell className="text-gray-600">{wishlist.topItem}</TableCell>
                  <TableCell className="text-gray-500">{wishlist.lastUpdated}</TableCell>
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
