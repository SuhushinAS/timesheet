import { selectExampleItem } from 'entities/example/model/selectors';
import React, { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks';
import { EntityInfo } from 'shared/ui/EntityInfo/EntityInfo';
import { Loading } from 'shared/ui/Loading/Loading';

type TProps = {
  isLoading?: boolean;
  exampleId: string;
};

export const ExampleItem: FC<TProps> = ({ exampleId, isLoading }) => {
  const exampleItem = useAppSelector(selectExampleItem(exampleId));

  return (
    <Loading isLoading={isLoading}>
      <EntityInfo entity={exampleItem} />
    </Loading>
  );
};
