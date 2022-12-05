import { Action, AnyAction, AsyncThunk, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/auth-slice';

export function makeStore(initialState?: any) {
  return configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
      auth: authReducer,
    },
    preloadedState: initialState || undefined,
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

// Store types helpers
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}
export function isPendingActionFrom(sliceName: string) {
  return (action: AnyAction): action is PendingAction => {
    return isPendingAction(action) && action.type.startsWith(sliceName);
  };
}

export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}
export function isRejectedActionFrom(sliceName: string) {
  return (action: AnyAction): action is RejectedAction => {
    return isRejectedAction(action) && action.type.startsWith(sliceName);
  };
}

export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
export function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}
export function isFulfilledActionFrom(sliceName: string) {
  return (action: AnyAction): action is FulfilledAction => {
    return isFulfilledAction(action) && action.type.startsWith(sliceName);
  };
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
