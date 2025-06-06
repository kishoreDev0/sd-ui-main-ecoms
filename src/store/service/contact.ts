import { ApiVersions, Contact } from '../endpoints/endpoints';
import { axiosInstance } from '../../components/httpClient/axiosInstance';
import { CreateContactPayload, UpdateContactPayload } from '../types/contact';

export class ContactAPI {
  createContact = async (payload: CreateContactPayload) =>
    axiosInstance.post(`${ApiVersions.V1}${Contact.CONTACTS}`, payload);

  fetchAllContacts = async () =>
    axiosInstance.get(`${ApiVersions.V1}${Contact.CONTACTS}`);

  updateContact = async (id: number, payload: UpdateContactPayload) =>
    axiosInstance.patch(`${ApiVersions.V1}${Contact.CONTACTS}/${id}`, payload);

  deleteContact = async (id: number) =>
    axiosInstance.delete(`${ApiVersions.V1}${Contact.CONTACTS}/${id}`);
}
