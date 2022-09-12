import { Layout as AntLayout } from 'antd';
import React, { FC } from 'react';
import { Footer } from 'widgets/Footer';
import { Header } from 'widgets/Header';

type TProps = {
  head?: React.ReactNode;
  children: React.ReactNode;
};

export const Layout: FC<TProps> = ({ children, head }) => (
  <AntLayout>
    {head}
    <Header />
    <AntLayout.Content>
      {children}
    </AntLayout.Content>
    <Footer />
  </AntLayout>
);
