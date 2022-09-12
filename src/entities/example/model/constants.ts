import { TExample } from 'entities/example/model/types';

export const examplePaths = {
  item: '/:exampleId',
  list: '/',
};

export const exampleIdKey = '_id';

export const fields: Array<keyof TExample> = [
  'name',
  'email',
  'age',
  'balance',
];
