import { TExample } from 'entities/example/model/types';
import { ExampleColumn } from 'entities/example/ui/ExampleColumn';
import { Message } from 'entities/locale/ui/Message';
import React, { FC } from 'react';
import { Column, Table } from 'widgets/Table';

type TProps = {
  isLoading?: boolean;
  list: TExample[];
};

const renderExample = (content: string, example: TExample): JSX.Element => (
  <ExampleColumn
    content={content}
    example={example}
  />
);

export const ExampleList: FC<TProps> = ({ isLoading, list }) => (
  <Table bordered dataSource={list} loading={isLoading} showHeader>
    <Column dataIndex="name" key="name" render={renderExample} title={<Message id="example.item.name" />} />
    <Column dataIndex="email" key="email" render={renderExample} title={<Message id="example.item.email" />} />
    <Column dataIndex="age" key="age" render={renderExample} title={<Message id="example.item.age" />} />
    <Column
      dataIndex="balance"
      key="balance"
      render={renderExample}
      title={<Message id="example.item.balance" />}
    />
  </Table>
);
