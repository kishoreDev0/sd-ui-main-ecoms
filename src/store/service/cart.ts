import { ApiVersions, Cart } from '../endpoints/endpoints';
import { axiosInstance } from '../../components/httpClient/axiosInstance';
import { CreateCartPayload, UpdateCartListPayload, UpdateCartPayload } from '../types/cart';

export class CartAPI {
  createCart = async (payload: CreateCartPayload) =>
    axiosInstance.post(`${ApiVersions.V1}${Cart.CARTS}`, payload);

  fetchAllCarts = async () =>
    axiosInstance.get(`${ApiVersions.V1}${Cart.CARTS}`);
  
  fetchAllCartsByUserId = async (id: number) =>
    axiosInstance.get(`${ApiVersions.V1}${Cart.CARTS}/${id}`);

  updateCart = async (id: number, payload: UpdateCartPayload) =>
    axiosInstance.patch(`${ApiVersions.V1}${Cart.CARTS}/${id}`, payload);

  updateCartList = async (id: number, payload: UpdateCartListPayload) =>
      axiosInstance.patch(`${ApiVersions.V1}${Cart.CARTS}${Cart.LIST}/${id}`, payload);

  deleteCart = async (id: number) =>
    axiosInstance.delete(`${ApiVersions.V1}${Cart.CARTS}/${id}`);

  
}
