import { ApiVersions, Static } from '../endpoints/endpoints';
import { axiosInstance } from '../../components/httpClient/axiosInstance';
import { CreateStaticPayload, UpdateStaticPayload } from '../types/static';

export class StaticAPI {
  createStatic = async (payload: CreateStaticPayload) =>
    axiosInstance.post(`${ApiVersions.V1}${Static.STATICS}`, payload);

  fetchAllStatics = async () =>
    axiosInstance.get(`${ApiVersions.V1}${Static.STATICS}`);

  updateStatic = async (id: number, payload: UpdateStaticPayload) =>
    axiosInstance.patch(`${ApiVersions.V1}${Static.STATICS}/${id}`, payload);

  deleteStatic = async (id: number) =>
    axiosInstance.delete(`${ApiVersions.V1}${Static.STATICS}/${id}`);
}
