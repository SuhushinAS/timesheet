import React, { FC, ImgHTMLAttributes } from 'react';

type TProps = ImgHTMLAttributes<never> & {
  alt: string;
  src: string;
};

export const Image: FC<TProps> = ({ alt = '', src: source = '', ...props }) => (
  <img alt={alt} src={source} {...props} />
);
