import { Table as AntTable, TableProps } from 'antd';
import React from 'react';

type TTable = <RecordType extends Record<string, unknown> = never>(props: TableProps<RecordType>) => React.ReactElement;

export const { Column, Summary } = AntTable;

export const Table: TTable = ({
  pagination = false,
  showHeader = false,
  size = 'small',
  ...props
}) => (
  <AntTable pagination={pagination} showHeader={showHeader} size={size} {...props} />
);
