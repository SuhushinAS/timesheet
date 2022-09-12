import { exampleIdKey, examplePaths } from 'entities/example/model/constants';
import { TExample } from 'entities/example/model/types';
import React, { FC, useMemo } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { appPaths } from 'shared/config/constants';

type TProps = {
  content: string;
  example: TExample;
};

export const ExampleColumn: FC<TProps> = ({ content, example }) => {
  const exampleId = example[exampleIdKey];
  const url = useMemo(() => generatePath(`${appPaths.example}${examplePaths.item}`, { exampleId }), [exampleId]);

  return <Link to={url}>{content}</Link>;
};
