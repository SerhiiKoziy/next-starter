import { AxiosRequestConfig } from 'axios';
import {
  PaginatedResponse,
} from 'models/common/paginated-response.class';
import { QueryParams } from 'models/common/query-params.class';
import { generateRequestConfig } from 'utils/generate-request-config';
import api from './api';

export class BaseEntitiesService<TResponse, TInput> {
  get endpoint() {
    return localStorage.getItem('local_base_url') + '/entities';
  }

  async create(entity: TInput): Promise<TResponse> {
    const response = await api.post<TResponse>(this.endpoint, entity);
    return response.data;
  }

  async fetchOne(id: string, endpoint?: string): Promise<TResponse> {
    const response = await api.get<TResponse>(`${endpoint || this.endpoint}/${id}`);
    return response.data;
  }

  async update(id: string, entity: TInput): Promise<TResponse> {
    const response = await api.patch<TResponse>(`${this.endpoint}/${id}`, entity);
    return response.data;
  }

  async delete(id: string): Promise<TResponse> {
    const response = await api.delete(`${this.endpoint}/${id}`);
    return response.data;
  }
}

export default class EntitiesService<TResponse, TInput = TResponse> extends BaseEntitiesService<
  TResponse,
  TInput
> {
  async fetch(params?: QueryParams, endpoint?: string): Promise<PaginatedResponse<TResponse>> {
    const config: AxiosRequestConfig = generateRequestConfig(params);

    const response = await api.get<PaginatedResponse<TResponse>>(endpoint || this.endpoint, config);

    return response.data;
  }
}
