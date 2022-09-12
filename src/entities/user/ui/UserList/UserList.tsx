import { userIdKey, userPaths } from 'entities/user/model/constants';
import { TUser } from 'entities/user/model/types';
import React, { FC } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { appPaths } from 'shared/config/constants';
import { Column, Table } from 'widgets/Table';

type TProps = {
  isLoading?: boolean;
  list: TUser[];
};

const renderDisplay = (display: string, user: TUser): JSX.Element => {
  const userId = `${user[userIdKey]}`;
  const url = generatePath(`${appPaths.user}${userPaths.item}`, { userId });

  return <Link to={url}>{display}</Link>;
};

export const UserList: FC<TProps> = ({ isLoading, list }) => (
  <Table bordered dataSource={list} loading={isLoading} showHeader>
    <Column dataIndex="display" key="display" render={renderDisplay} />
    <Column dataIndex="email" key="email" />
  </Table>
);
