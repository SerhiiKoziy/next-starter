import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { getCurrentUser } from 'store/auth/auth-actions';
import { selectAuthState } from 'store/auth/auth-slice';
import { webRoutes } from 'utils/web-routes';

export const useUser = (noRedirect = false) => {
  const { authenticatedUser, status, accessToken } = useAppSelector(selectAuthState);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const _fetchUser = () => dispatch(getCurrentUser());

  const loading = status === 'loading';

  useEffect(() => {
    if (!accessToken && !noRedirect) {
      router.push(webRoutes.home);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken && !authenticatedUser) {
      _fetchUser();
    }
  }, []);

  return {
    loading,
    user: authenticatedUser,
  };
};
