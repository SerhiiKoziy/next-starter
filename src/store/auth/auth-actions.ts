import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { Login } from 'models/auth/login.class';
import { RequestPasswordReset } from 'models/auth/request-password-reset.class';
import { ResetPassword } from 'models/auth/reset-password.class';
import { HttpStatusCode } from 'models/common/http-status-code.enum';
import { PersonalInfoForm } from 'models/sign-up-flow/personal-info-form.class';
import Router from 'next/router';
import AuthService from 'services/auth.service';
import { webRoutes } from 'utils/web-routes';

const authService = new AuthService();

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { loginData: Login; destinationPath?: string }) => {
    try {
      const { loginData, destinationPath } = payload;
      const login: Login = { ...loginData, email: loginData.email.trim() };
      const response = await authService.login(login);

      Router.push(destinationPath || webRoutes.home);

      return response;
    } catch (error) {
      const response = (error as AxiosError).response as AxiosResponse;
      let errorMessage = '';
      if (response && response.status === HttpStatusCode.UNAUTHORIZED) {
        errorMessage = response.data.message;
      }

      throw errorMessage;
    }
  },
);

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
  try {
    const response = await authService.getCurrentUser();
    return response;
  } catch (error) {
    const response = (error as AxiosError).response as AxiosResponse;
    let errorMessage = '';
    if (response && response.status === HttpStatusCode.UNAUTHORIZED) {
      errorMessage = response.data.message;
    }

    throw errorMessage;
  }
});

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (input: RequestPasswordReset) => {
    try {
      const response = await authService.requestPasswordReset({ email: input.email.trim() });
      return response;
    } catch (error) {
      const response = (error as AxiosError).response as AxiosResponse;
      let errorMessage = '';
      if (response && response.status === HttpStatusCode.NOT_FOUND) {
        errorMessage = response.data.message;
      }

      throw errorMessage;
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (input: ResetPassword) => {
    try {
      const response = await authService.resetPassword(input);

      Router.push(webRoutes.signIn);
      return response;
    } catch (error) {
      const response = (error as AxiosError).response as AxiosResponse;
      let errorMessage = '';
      if (response && response.status === HttpStatusCode.NOT_FOUND) {
        errorMessage = response.data.message;
      }

      throw errorMessage;
    }
  },
);

export const signUpRegister = createAsyncThunk(
  'auth/signUpRegister',
  async (user: PersonalInfoForm) => {
    try {
      await authService.signUpRegister(user);
    } catch (error) {
      const response = (error as AxiosError).response as AxiosResponse;
      throw response.data.message;
    }
  },
);

export const resendActivationEmail = createAsyncThunk('auth/resend', async (email: string) => {
  try {
    await authService.resendActivationMail(email);
  } catch (error) {
    const response = (error as AxiosError).response as AxiosResponse;
    throw response.data.message;
  }
});

export const activateAccount = createAsyncThunk('auth/activateAccount', async (token: string) => {
  try {
    return await authService.activateAccount(token);
  } catch (error) {
    const response = (error as AxiosError).response as AxiosResponse;
    throw response.data.message;
  }
});
