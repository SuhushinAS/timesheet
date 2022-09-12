import { example } from 'entities/example/model/reducers';
import { ExampleItem } from 'entities/example/ui/ExampleItem';
import { useMessage } from 'entities/locale/lib/hooks';
import { Message } from 'entities/locale/ui/Message';
import { selectLoadItem } from 'entities/status/model/selectors';
import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { appPaths } from 'shared/config/constants';
import { useAppSelector } from 'shared/lib/hooks';
import { Container } from 'widgets/Container';
import { Head } from 'widgets/Head';
import { Layout } from 'widgets/Layout';

export const ExampleItemPage: FC = () => {
  const message = useMessage();
  const { exampleId = '' } = useParams();
  const isLoading = useAppSelector(selectLoadItem(example.actions.getList.type));

  return (
    <Layout head={<Head description={message('example.item.description')} title={message('example.item.title')} />}>
      <Container>
        <h1>
          <Message id="example.item.title" />
        </h1>
        <div>
          <Link to={appPaths.example}>
            <Message id="example.list.title" />
          </Link>
        </div>
        <ExampleItem isLoading={isLoading} exampleId={exampleId} />
      </Container>
    </Layout>
  );
};
