import { ApiVersions, Feature } from '../endpoints/endpoints';
import { axiosInstance } from '../../components/httpClient/axiosInstance';
import { CreateFeaturePayload, UpdateFeaturePayload } from '../types/feature';

export class FeatureAPI {
  createFeature = async (payload: CreateFeaturePayload) =>
    axiosInstance.post(`${ApiVersions.V1}${Feature.FEATURES}`, payload);

  fetchAllFeatures = async () =>
    axiosInstance.get(`${ApiVersions.V1}${Feature.FEATURES}`);

  updateFeature = async (id: number, payload: UpdateFeaturePayload) =>
    axiosInstance.patch(`${ApiVersions.V1}${Feature.FEATURES}/${id}`, payload);

  deleteFeature = async (id: number) =>
    axiosInstance.delete(`${ApiVersions.V1}${Feature.FEATURES}/${id}`);
}
