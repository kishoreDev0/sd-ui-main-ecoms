import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search,  Edit, Trash2, Eye } from 'lucide-react';
import { AddCartModal } from './AddCartModal'; // your modal to add cart
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/store';
import { fetchAllCarts, updateCart, deleteCart } from '@/store/action/cart'; // your cart actions
import { RootState } from '@/store/reducer';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card } from '../ui/card';
import { HttpStatusCode } from '@/constants';
import { toast } from 'react-toastify';
import ConfirmationDialog from '@/components/confirmation-dialog';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Product } from '@/store/types/products';

export const CartList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { carts } = useAppSelector((state: RootState) => state.cartSelector);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { products } = useAppSelector((state: RootState) => state.productSelector);
  const { users } = useAppSelector((state: RootState) => state.userSelector);

  const dispatch = useDispatch<AppDispatch>();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
  
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [selectedUser1, setSelectedUser1] = useState<any | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  
  
  

  useEffect(() => {
    dispatch(fetchAllCarts());
  }, [dispatch]);
    const animatedComponents = makeAnimated();

  // Filter carts by user or products names in cart
  const filteredCarts = carts.filter(cart => {
    const productNames = cart.products?.map((p: any) => p.name.toLowerCase()).join(' ') || '';
    return (
      cart.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productNames.includes(searchTerm.toLowerCase())
    );
  });

  const openEditDialog = (cart: any) => {
    setEditData(cart);
    setEditOpen(true);
    setSelectedUser1({ label: cart.user.firstName, value: cart.user.id }); // Set selected user (disabled in edit)
      const res = cart?.productIds.map((productId: any) => {
          const upProduct = products.find((product: Product) => product.id === Number(productId));
          let mock = {label:upProduct?.name, value:upProduct?.id}
          setSelectedProducts([...selectedProducts,mock])
        
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev: any) => prev ? { ...prev, [name]: value } : null);
  };

  const handleSave = async () => {
     try {
          const updatedCartData = {
            id: editData.id,
            payload: {
              productIds: selectedProducts.map((prod) => prod.value),
              updatedBy: user?.id ?? 0,
            },
          };
          const result = await dispatch(updateCart(updatedCartData)).unwrap();
          if (result.statusCode === HttpStatusCode.OK) {
            toast.success('Cart item updated successfully');
            setEditOpen(false);
            setEditData(null);
          }
        } catch (error) {
          toast.error('Error updating wishlist item');
          console.error(error);
        }
  };

  const handleDelete = async () => {
    try {
      if(deleteCategoryId){
        const result = await dispatch(deleteCart(deleteCategoryId)).unwrap();
      console.log(result)
      if (result.statusCode === HttpStatusCode.OK) {
        dispatch(fetchAllCarts());
        toast.success(result.message ?? 'Cart deleted successfully');
      } else {
        toast.error(result.message ?? 'Failed to delete cart');
      }
    }
    else{
        toast.success('Cart id has not set');
    }
    } catch (error) {
      console.error(error);
      toast.error('Error deleting cart');
    }
  };

  return (
    <div className="space-y-6 dashmain">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Carts</h2>
          <p className="text-gray-500">Manage customer carts</p>
        </div>
        <AddCartModal />
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search carts by user or product..."
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
                <TableHead>User</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCarts.length > 0 ? (
                filteredCarts.map(cart => (
                  <TableRow key={cart.id}>
                    <TableCell>{cart.user?.firstName ?? 'N/A'}</TableCell>
                    <TableCell>
                      <ul className="list-disc list-inside max-h-24 overflow-auto">
                        {/* {cart.products?.map((product: any) => (
                          <li key={product.id}>{product.name}</li>
                        )) || 'No products'} */}
                        {cart.productIds ?? ''}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        // cart.status === 'active' ? 'default' : 
                        'secondary'}>
                        {
                        // cart.status ?? 
                        'Unknown'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(cart.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(cart)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600 hover:text-red-700"
                          onClick={() => {  setConfirmDialogOpen(true);  setDeleteCategoryId(cart.id)}}
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
                    No carts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Cart</DialogTitle>
            <DialogDescription>Update cart status below.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <label htmlFor="status" className="block font-semibold">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={editData?.status ?? ''}
              // onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* delete dialog */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete cart"
        description="Are you sure you want to delete this cart?"
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

        {/* Edit Wishlist Item Dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Cart Item</DialogTitle>
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
