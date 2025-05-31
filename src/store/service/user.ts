import { ApiVersions, UserRoutes } from '../endpoints/endpoints'
import { axiosInstance } from '@/components/httpClient/axiosInstance'; 

export class UserAPI {
  getUserById = async (userId: number) =>
    axiosInstance.get(`${ApiVersions.V1}${UserRoutes.USERS}/${userId}`);

  getAllUsers = async () =>
    axiosInstance.get(`${ApiVersions.V1}${UserRoutes.USERS}`);
}