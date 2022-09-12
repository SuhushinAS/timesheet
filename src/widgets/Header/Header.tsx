import { Layout, Menu, MenuProps } from 'antd';
import { Message } from 'entities/locale/ui/Message';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { appPaths } from 'shared/config/constants';
import { Container } from 'widgets/Container';
import './Header.scss';

const items: MenuProps['items'] = [
  {
    key: 'home',
    label: (
      <Link to={appPaths.home}>
        <Message id="home.title" />
      </Link>
    ),
  },
];
const defaultSelectedKeys: string[] = ['home'];

export const Header: FC = () => (
  <Layout.Header className="Header">
    <Container>
      <Menu defaultSelectedKeys={defaultSelectedKeys} items={items} mode="horizontal" theme="dark" />
    </Container>
  </Layout.Header>
);
