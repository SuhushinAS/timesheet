import { userIdKey, userPaths } from 'entities/user/model/constants';
import { TUser } from 'entities/user/model/types';
import React, { FC, useMemo } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { appPaths } from 'shared/config/constants';

type TProps = {
  user: TUser;
};

export const UserListItem: FC<TProps> = ({ user }) => {
  const userId = `${user[userIdKey]}`;
  const url = useMemo(() => generatePath(`${appPaths.user}${userPaths.item}`, { userId }), [userId]);

  return <Link to={url}>{user.display}</Link>;
};
