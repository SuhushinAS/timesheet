import React, { FC } from 'react';

type TProps = {
  children: React.ReactNode;
};

export const Container: FC<TProps> = ({ children }) => (
  <div>
    {children}
  </div>
);
