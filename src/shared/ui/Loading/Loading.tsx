import { Spin } from 'antd';
import React, { FC } from 'react';

type TProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
};

export const Loading: FC<TProps> = ({ children, isLoading }) => {
  if (typeof isLoading === 'undefined') {
    return null;
  }

  if (isLoading) {
    return <Spin />;
  }

  return <>{children}</>;
};
