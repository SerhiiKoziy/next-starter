import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from 'models/auth/login-response.interface';
import { ApiErrorMessage } from 'models/common/api-error-message.enum';
import { Status } from 'models/common/status.type';
import { User } from 'models/users/user.class';
import Cookies from 'universal-cookie';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'utils/constants';
import { AppState, isFulfilledActionFrom, isPendingActionFrom, isRejectedActionFrom } from '..';
import { getCurrentUser, login, requestPasswordReset, resetPassword } from './auth-actions';

const cookies = new Cookies();

export interface AuthState {
  authenticatedUser: User | null;
  shouldAskForIntro: boolean;
  intro: IntroType;
  accessToken: string;
  refreshToken: string;
  status: Status;
  error: string;
}

export type IntroType = 'none' | 'dashboard' | 'academy' | 'projects';

export const initialState: AuthState = {
  authenticatedUser: null,
  shouldAskForIntro: false,
  intro: 'none',
  accessToken: cookies.get(ACCESS_TOKEN_KEY) || '',
  refreshToken: cookies.get(REFRESH_TOKEN_KEY) || '',
  status: 'idle',
  error: '',
};

const cleanUserData = (state: AuthState) => {
  state.authenticatedUser = null;
  state.shouldAskForIntro = false;
  state.intro = 'none';
  state.accessToken = '';
  state.refreshToken = '';
  state.status = 'idle';

  cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
  cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
};

const setLoginResponse = (state: AuthState, action: PayloadAction<LoginResponse>) => {
  const { user, access_token, refresh_token } = action.payload;
  state.authenticatedUser = user;

  state.accessToken = access_token;
  cookies.set(ACCESS_TOKEN_KEY, access_token, { sameSite: 'lax', path: '/' });
  state.refreshToken = refresh_token;
  cookies.set(REFRESH_TOKEN_KEY, refresh_token, { sameSite: 'lax', path: '/' });
};

const sliceName = 'auth';

export const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setRefreshedToken: (state, action: PayloadAction<LoginResponse>) => {
      setLoginResponse(state, action);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.authenticatedUser = action.payload;
    },
    logOut: state => {
      cleanUserData(state);
    },
    setAskForIntro: (state, action: PayloadAction<boolean>) => {
      state.shouldAskForIntro = action.payload;
    },
    setIntro: (state, action: PayloadAction<IntroType>) => {
      state.intro = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        setLoginResponse(state, action);

        if (!action.payload.user.intro) {
          // prevents users from getting coin pop-ups, might be implemented again at a later date
          // state.shouldAskForIntro = true;
        }
      })
      .addMatcher(
        isAnyOf(
          login.rejected,
          getCurrentUser.rejected,
          requestPasswordReset.rejected,
          resetPassword.rejected,
        ),
        (state, action) => {
          if (action.error) {
            state.error = (action.error.message as ApiErrorMessage);
          }
        },
      )
      .addMatcher(isRejectedActionFrom(sliceName), state => {
        state.status = 'failed';
      })
      .addMatcher(isPendingActionFrom(sliceName), state => {
        state.status = 'loading';
        state.error = '';
      })
      .addMatcher(isFulfilledActionFrom(sliceName), state => {
        state.status = 'idle';
      });
  },
});

export const { setRefreshedToken, setUser, logOut, setAskForIntro, setIntro } =
  authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
