import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserReminders } from 'models/users/user-reminders.class';
import UserRemindersService from 'services/user-reminders.service';

const userRemindersService: UserRemindersService = new UserRemindersService();

export const updateUserReminders = createAsyncThunk(
  'user-reminders/update',
  async (userReminders: UserReminders) => {
    return await userRemindersService.patch(userReminders);
  },
);
