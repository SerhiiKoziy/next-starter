import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LoginResponse } from 'models/auth/login-response.interface';
import { ApiErrorMessage } from 'models/common/api-error-message.enum';
import { HttpStatusCode } from 'models/common/http-status-code.enum';
import store from 'store';
import { setRefreshedToken } from 'store/auth/auth-slice';
import Cookies from 'universal-cookie';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'utils/constants';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const cookies = new Cookies();

const createToastForError = (error: AxiosError) => {
  console.log('error', error)

  return error;
};

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = cookies.get(ACCESS_TOKEN_KEY) || '';

    if (!config || !config.headers) return;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  err => Promise.reject(err),
);

api.interceptors.response.use(
  (success: AxiosResponse) => success,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    // Refresh token
    if (
      error.response?.status === HttpStatusCode.UNAUTHORIZED &&
      error.response?.data?.message === ApiErrorMessage.AccessTokenExpired &&
      !(originalRequest as any)._retry
    ) {
      (originalRequest as any)._retry = true;
      const refreshToken = cookies.get(REFRESH_TOKEN_KEY);
      const response = (
        await api.post<LoginResponse>('auth/token', {
          refresh_token: refreshToken,
        })
      ).data;

      store.dispatch(setRefreshedToken(response));

      return api(originalRequest);
    } else if (
      // Throws errors when api call is to the authController or has specific error messages
      // these errors are showed in the component itself instead of in a Toast
      error.response?.config.url?.includes('auth') ||
      error.response?.config.url?.includes('password') ||
      [ApiErrorMessage.ListNotFound].includes(error.response?.data.message)
    ) {
      throw error;
    } else {
      createToastForError(error);
    }
  },
);

// Api fetcher to be used in SWR
export const apiFetcher = async (url: string) => (await api.get(url))?.data;

export default api;
