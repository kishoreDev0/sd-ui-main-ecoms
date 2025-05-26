import { ApiVersions, Category } from '../endpoints/endpoints';
import { axiosInstance } from '../../components/httpClient/axiosInstance';
import { CreateCategoryPayload, UpdateCategoryPayload } from '../types/categort';

export class CategoryAPI {
  createCategory = async (payload: CreateCategoryPayload) =>
    axiosInstance.post(`${ApiVersions.V1}${Category.CATEGORYS}`, payload);

  fetchAllCategorys = async () =>
    axiosInstance.get(`${ApiVersions.V1}${Category.CATEGORYS}`);

  updateCategory = async (id: number, payload: UpdateCategoryPayload) =>
    axiosInstance.patch(`${ApiVersions.V1}${Category.CATEGORYS}/${id}`, payload);

  deleteCategory = async (id: number) =>
    axiosInstance.delete(`${ApiVersions.V1}${Category.CATEGORYS}/${id}`);
}
