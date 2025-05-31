import { ApiVersions, Wishlist } from '../endpoints/endpoints';
import { axiosInstance } from '../../components/httpClient/axiosInstance';
import { CreateWishlistPayload, UpdateWishlistListPayload, UpdateWishlistPayload } from '../types/wishlist';

export class WishlistAPI {
  createWishlist = async (payload: CreateWishlistPayload) =>
    axiosInstance.post(`${ApiVersions.V1}${Wishlist.WISHLISTS}`, payload);

  fetchAllWishlists = async () =>
    axiosInstance.get(`${ApiVersions.V1}${Wishlist.WISHLISTS}`);

  updateWishlist = async (id: number, payload: UpdateWishlistPayload) =>
    axiosInstance.patch(`${ApiVersions.V1}${Wishlist.WISHLISTS}/${id}`, payload);

  updateWishlistList = async (id: number, payload: UpdateWishlistListPayload) =>
    axiosInstance.patch(`${ApiVersions.V1}${Wishlist.WISHLISTS}${Wishlist.LIST}/${id}`, payload);

  moveWishlistList = async (id: number, payload: UpdateWishlistListPayload) =>
    axiosInstance.patch(`${ApiVersions.V1}${Wishlist.WISHLISTS}${Wishlist.MOVE}/${id}`, payload);

  deleteWishlist = async (id: number) =>
    axiosInstance.delete(`${ApiVersions.V1}${Wishlist.WISHLISTS}/${id}`);

  getWishlistByUserId = async (id: number) =>
    axiosInstance.get(`${ApiVersions.V1}${Wishlist.WISHLISTS}/${id}`);
}
