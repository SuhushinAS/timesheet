import React, { FC } from 'react';

type TProps = {
  title: string;
};

export const ListHead: FC<TProps> = ({ title }) => (
  <th aria-label={title}>{title}</th>
);
