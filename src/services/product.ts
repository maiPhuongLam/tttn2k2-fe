import request from '@/lib/utils/axios';
import { AxiosResponse } from 'axios';

export const getProducts = async (query?: {
  name?: string | null,
  min_price?: number | null,
  max_price?: number | null,
  page?: number | null,
  pageSize?: number | null,
}): Promise<AxiosResponse> =>
  request.get(`/products`, { params: query });