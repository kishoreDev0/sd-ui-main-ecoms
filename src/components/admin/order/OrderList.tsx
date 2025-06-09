import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/store';
import { fetchAllOrders } from '@/store/action/order';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditOrderModal } from './EditOrderModal';
import { Order } from '@/store/types/order';

export const OrderList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useAppSelector((state) => state.orderSelector);
  const [editOrder, setEditOrder] = useState<Order | null>(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Order List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Shipping Address</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Total Amount</th>
              <th className="px-4 py-2">Notes</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order?.user?.id}</td>
                <td className="px-4 py-2">{order.shippingAddress}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{order.totalAmount}</td>
                <td className="px-4 py-2">{order.notes}</td>
                <td className="px-4 py-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditOrder(order)}
                    className="flex gap-1 items-center"
                  >
                    <Edit size={14} />
                    Edit
                  </Button>
                  {editOrder?.id === order.id && (
                    <EditOrderModal order={editOrder} onClose={() => setEditOrder(null)} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
