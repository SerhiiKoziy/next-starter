import { AxiosRequestConfig } from 'axios';
import { QueryParams } from 'models/common/query-params.class';

export function generateRequestConfig(params?: QueryParams): AxiosRequestConfig {
  const config: AxiosRequestConfig = {};

  if (params) {

    config.params = {
      ...params,
    };
  }

  return config;
}
