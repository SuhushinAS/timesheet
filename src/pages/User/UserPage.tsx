import { userPaths } from 'entities/user/model/constants';
import { UserItemPage } from 'pages/User/UserItem';
import { UserListPage } from 'pages/User/UserList';
import { UserSelfPage } from 'pages/User/UserSelf';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const UserPage: FC = () => (
  <Routes>
    <Route element={<UserListPage />} path={userPaths.list} />
    <Route element={<UserSelfPage />} path={userPaths.self} />
    <Route element={<UserItemPage />} path={userPaths.item} />
  </Routes>
);
