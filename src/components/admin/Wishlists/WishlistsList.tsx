

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Search, Edit, Trash2, Eye } from 'lucide-react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { AddWishlistModal } from './AddWishlistModal';
import { useDispatch } from 'react-redux';
import { fetchAllWishlists, updateWishlist, deleteWishlist } from '@/store/action/wishlist';
import { AppDispatch, useAppSelector } from '@/store';
import { RootState } from '@/store/reducer';
import { HttpStatusCode } from '@/constants';
import ConfirmationDialog from '@/components/confirmation-dialog';
import { Badge } from '../ui/badge';
import { Product } from '@/store/types/products';
import { toast } from 'react-toastify';

interface WishlistItem {
  id: number;
  name: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  user: any;
  productIds: number[];
}

export const WishlistList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist } = useAppSelector((state: RootState) => state.wishlistSelector);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { products } = useAppSelector((state: RootState) => state.productSelector);
  const { users } = useAppSelector((state: RootState) => state.userSelector);

  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
  const animatedComponents = makeAnimated();

  const [editOpen, setEditOpen] = useState(false);
  const [editWishlistItem, setEditWishlistItem] = useState<WishlistItem | null>(null);
  const [editName, setEditName] = useState('');

  const [selectedUser1, setSelectedUser1] = useState<any | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const filteredWishlists = wishlist.filter((item) => {
    const productNames = item.products?.map((p: any) => p.name.toLowerCase()).join(' ') || '';
    return (
      item.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productNames.includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    dispatch(fetchAllWishlists());
  }, [dispatch]);

  // Handle the edit button click
  const openEditDialog = (item: WishlistItem) => {
    setEditWishlistItem(item);
    setEditName(item.name);
    setSelectedUser1({ label: item.user.firstName, value: item.user.id }); // Set selected user (disabled in edit)
    const res = item?.productIds.map((productId) => {
        const upProduct = products.find((product: Product) => product.id === Number(productId));
        let mock = {label:upProduct?.name, value:upProduct?.id}
        setSelectedProducts([...selectedProducts,mock])
      
    });
    setEditOpen(true);
  };

  // Handle save changes to wishlist item
  const handleSave = async () => {
    if (!editWishlistItem) return;

    try {
      const updatedWishlistData = {
        id: editWishlistItem.id,
        payload: {
          productIds: selectedProducts.map((prod) => prod.value),
          updatedBy: user?.id ?? 0,
        },
      };
      const result = await dispatch(updateWishlist(updatedWishlistData)).unwrap();
      if (result.statusCode === HttpStatusCode.OK) {
        toast.success('Wishlist item updated successfully');
        setEditOpen(false);
        setEditWishlistItem(null);
      }
    } catch (error) {
      toast.error('Error updating wishlist item');
      console.error(error);
    }
  };
  useEffect(()=>{
    console.log(selectedProducts)
  },[selectedProducts])

  // Handle delete wishlist item
  const handleDelete = async () => {
    if (!deleteCategoryId) return;

    try {
      const result = await dispatch(deleteWishlist(deleteCategoryId)).unwrap();
      if (result.statusCode === HttpStatusCode.OK) {
        toast.success('Wishlist item deleted successfully');
        dispatch(fetchAllWishlists());
        setEditOpen(false)
      } else {
        toast.error(result.message || 'Failed to delete wishlist item');
      }
    } catch (error) {
      toast.error('Failed to delete wishlist item');
      console.error('Error deleting wishlist item:', error);
    }

    setConfirmDialogOpen(false);
  };

  return (
    <div className="space-y-6 dashmain">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Wishlist</h2>
          <p className="text-gray-500">Manage your wishlist items</p>
        </div>
        <AddWishlistModal />
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search wishlist items..."
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
                <TableHead>Name</TableHead>
                <TableHead>Created by</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWishlists.length > 0 ? (
                filteredWishlists.map((wishlist) => (
                  <TableRow key={wishlist.id}>
                    <TableCell>{wishlist.user?.firstName ?? 'N/A'}</TableCell>
                    <TableCell>
                      <ul className="list-disc list-inside max-h-24 overflow-auto">
                        {wishlist.productIds ?? 'No products'}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge variant={'secondary'}>Unknown</Badge>
                    </TableCell>
                    <TableCell>{new Date(wishlist.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(wishlist)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => { setConfirmDialogOpen(true); setDeleteCategoryId(wishlist.id); }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No wishlist items found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete wishlist item"
        description="Are you sure you want to delete this item from your wishlist?"
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      {/* Edit Wishlist Item Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Wishlist Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* User Select */}
            <div>
              <label className="block mb-1 text-sm font-medium">User</label>
              <Select
                components={animatedComponents}
                options={users.map((user) => ({ label: user.firstName, value: user.id }))}
                value={selectedUser1}
                isDisabled // User is fixed and cannot be changed
                placeholder="Select user"
                isClearable
              />
            </div>

            {/* Products Select */}
            <div>
              <label className="block mb-1 text-sm font-medium">Products</label>
              <Select
                components={animatedComponents}
                isMulti
                options={products.map((prod) => ({
                  value: prod.id,
                  label: prod.name,
                }))}
                value={selectedProducts}
                onChange={(newValue) => setSelectedProducts(Array.isArray(newValue) ? [...newValue] : [])}
                placeholder="Select products"
              />
            </div>

           
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
