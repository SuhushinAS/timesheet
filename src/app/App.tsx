import { AuthRoute } from 'entities/auth/ui/AuthRoute';
import { Config } from 'entities/config/ui/Config';
import { TokenPage } from 'pages/Token';
import { UserPage } from 'pages/User';
import { UserSelfPage } from 'pages/User/UserSelf';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { appPaths } from 'shared/config/constants';

export const App: FC = () => (
  <Config>
    <Routes>
      <Route element={<TokenPage />} path={appPaths.token} />
      <Route element={<AuthRoute><UserSelfPage /></AuthRoute>} path={appPaths.home} />
      <Route element={<AuthRoute><UserPage /></AuthRoute>} path={`${appPaths.user}/*`} />
    </Routes>
  </Config>
);
