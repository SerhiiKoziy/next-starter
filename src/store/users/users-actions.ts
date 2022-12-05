import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParams } from 'models/common/query-params.class';
import { User } from 'models/users/user.class';
import UsersService from 'services/users.service';

const usersService = new UsersService();

export const updateUserAvatar = createAsyncThunk('users/updateUserAvatar', async (file: File) => {
  const response = await usersService.updateUserAvatar(file);
  return response;
});

export const deleteAvatar = createAsyncThunk('users/deleteAvatar', async () => {
  const response = await usersService.deleteAvatar();
  return response;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
  const response = await usersService.updateUser(user);
  return response;
});


export const fetchUsers = createAsyncThunk('users/fetch', async (params?: QueryParams) => {
  const response = await usersService.fetch(params);
  return response;
});

export const fetchAllUsers = createAsyncThunk('users/fetch', async (params?: QueryParams) => {
  const response = await usersService.fetch(params);
  return response;
});

export const fetchUser = createAsyncThunk('users/fetchOne', async (userId: string) => {
  return usersService.fetchOne(userId);
});
