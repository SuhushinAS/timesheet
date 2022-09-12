import React, { FC, useMemo } from 'react';
import { Column, Table } from 'widgets/Table';

type TProps = {
  entity?: Record<string, unknown>;
};

type TDataSource = Record<string, unknown>;

export const EntityInfo: FC<TProps> = ({ entity = {} }) => {
  const dataSource = useMemo<TDataSource[]>(() => Object.entries(entity).reduce<TDataSource[]>((acc, [key, value]) => {
    acc.push({
      key,
      value,
    });

    return acc;
  }, []), [entity]);

  return (
    <Table bordered dataSource={dataSource}>
      <Column dataIndex="key" key="key" />
      <Column dataIndex="value" key="value" render={JSON.stringify} />
    </Table>
  );
};
