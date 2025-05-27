import { ApiVersions, Products} from '../endpoints/endpoints';
import {
  CreateProductPayload,
  UpdateProductPayload,
} from '../types/products';
import { axiosInstance } from '../../components/httpClient/axiosInstance';

export class ProductAPI {
  createProduct = async (payload: CreateProductPayload) =>
    axiosInstance.post(`${ApiVersions.V1}${Products.PRODUCTS}`, payload);

  fetchAllProducts = async () =>
    axiosInstance.get(`${ApiVersions.V1}${Products.PRODUCTS}`);

  fetchProductById = async (id: number) =>
    axiosInstance.get(`${ApiVersions.V1}${Products.PRODUCTS}/${id}`);

  updateProduct = async (id: number, payload: UpdateProductPayload) =>
    axiosInstance.patch(`${ApiVersions.V1}${Products.PRODUCTS}/${id}`, payload);

  deleteProduct = async (id: number) =>
    axiosInstance.delete(`${ApiVersions.V1}${Products.PRODUCTS}/${id}`);
}
