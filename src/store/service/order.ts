import { ApiVersions, Order } from '../endpoints/endpoints';
import { axiosInstance } from '../../components/httpClient/axiosInstance';
import { CreateOrderPayload, UpdateOrderPayload } from '../types/order';

export class OrderAPI {
  createOrder = async (payload: CreateOrderPayload) =>
    axiosInstance.post(`${ApiVersions.V1}${Order.ORDERS}`, payload);

  fetchAllOrders = async () =>
    axiosInstance.get(`${ApiVersions.V1}${Order.ORDERS}`);

  updateOrder = async (id: number, payload: UpdateOrderPayload) =>
    axiosInstance.patch(`${ApiVersions.V1}${Order.ORDERS}/${id}`, payload);

  deleteOrder = async (id: number) =>
    axiosInstance.delete(`${ApiVersions.V1}${Order.ORDERS}/${id}`);
}
