import { ACCESS_TOKEN_KEY } from 'entities/auth/lib/constants';
import { actionAuthSetToken } from 'entities/auth/model/actions';
import React, { useEffect, useMemo } from 'react';
import { Navigate } from 'react-router';
import { useAppDispatch } from 'shared/lib/hooks';

export const AuthToken = () => {
  const dispatch = useAppDispatch();
  const state = useMemo(() => {
    const url = new URL(window.location.href);

    return Object.fromEntries(url.searchParams);
  }, []);
  const token = useMemo(() => {
    const query = window.location.hash.split('#')[1];
    const parameters = new URLSearchParams(query);

    return parameters.get(ACCESS_TOKEN_KEY);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(actionAuthSetToken(token));
    }
  }, [dispatch, token]);

  return <Navigate to={state} replace />;
};
