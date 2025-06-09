import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { updateOrder, fetchAllOrders } from '@/store/action/order';
import { toast } from 'react-toastify';
import { Order } from '@/store/types/order';

interface EditOrderModalProps {
  order: Order;
  onClose: () => void;
}

export const EditOrderModal: React.FC<EditOrderModalProps> = ({ order, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    shippingAddress: order.shippingAddress,
    status: order.status,
    notes: order.notes,
    inStock: order.inStock,
    totalAmount: order.totalAmount,
    totalNoOfStock: order.totalNoOfStock,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleStock = () => {
    setForm({ ...form, inStock: !form.inStock });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        updateOrder({
          id: order.id,
          payload: {
            ...form,
            userId: order.userId,
            categoryId: order.categoryId,
            productIds: order.productIds,
          }
        })
      ).unwrap();
      toast.success(result.message || 'Order updated successfully');
      dispatch(fetchAllOrders());
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update order');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Order #{order.id}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="shippingAddress"
            placeholder="Shipping Address"
            value={form.shippingAddress}
            onChange={handleChange}
          />
          <Input
            name="status"
            placeholder="Status"
            value={form.status}
            onChange={handleChange}
          />
          <Textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
          />
          <Input
            name="totalAmount"
            type="number"
            placeholder="Total Amount"
            value={form.totalAmount}
            onChange={handleChange}
          />
          <Input
            name="totalNoOfStock"
            type="number"
            placeholder="Total Quantity"
            value={form.totalNoOfStock}
            onChange={handleChange}
          />
          <div className="flex items-center gap-2">
            <Checkbox checked={form.inStock} onCheckedChange={toggleStock} />
            <span className="text-sm">In Stock</span>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Update Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
