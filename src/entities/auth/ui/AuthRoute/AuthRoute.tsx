import { selectAuthToken } from 'entities/auth/model/selectors';
import { Auth } from 'entities/auth/ui/Auth';
import { selectConfigAuth } from 'entities/config/model/selectors';
import React, { FC } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useAppSelector } from 'shared/lib/hooks';

type TProps = {
  children?: React.ReactNode;
};

export const AuthRoute: FC<TProps> = ({ children }) => {
  const configAuth = useAppSelector(selectConfigAuth);
  const authToken = useAppSelector(selectAuthToken);
  const location = useLocation();

  if (authToken) {
    return children ? <>{children}</> : <Outlet />;
  }

  if (configAuth) {
    return <Auth config={configAuth} location={location} />;
  }

  return null;
};
