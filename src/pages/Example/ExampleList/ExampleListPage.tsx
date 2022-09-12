import { example } from 'entities/example/model/reducers';
import { selectExampleList } from 'entities/example/model/selectors';
import { ExampleList } from 'entities/example/ui/ExampleList';
import { useMessage } from 'entities/locale/lib/hooks';
import { Message } from 'entities/locale/ui/Message';
import { selectLoadItem } from 'entities/status/model/selectors';
import React, { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks';
import { Container } from 'widgets/Container';
import { Head } from 'widgets/Head';
import { Layout } from 'widgets/Layout';

export const ExampleListPage: FC = () => {
  const message = useMessage();
  const exampleList = useAppSelector(selectExampleList);
  const isLoading = useAppSelector(selectLoadItem(example.actions.getList.type));

  return (
    <Layout head={<Head description={message('example.list.description')} title={message('example.list.title')} />}>
      <Container>
        <h1>
          <Message id="example.list.title" />
        </h1>
        <ExampleList isLoading={isLoading} list={exampleList} />
      </Container>
    </Layout>
  );
};
