import { useMessage } from 'entities/locale/lib/hooks';
import { Message } from 'entities/locale/ui/Message';
import { selectLoadItem } from 'entities/status/model/selectors';
import { actionUserGetList } from 'entities/user/model/actions';
import { user } from 'entities/user/model/reducers';
import { selectExampleList } from 'entities/user/model/selectors';
import { UserList } from 'entities/user/ui/UserList';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { Container } from 'widgets/Container';
import { Head } from 'widgets/Head';
import { Layout } from 'widgets/Layout';

export const UserListPage: FC = () => {
  const dispatch = useAppDispatch();
  const message = useMessage();
  const userList = useAppSelector(selectExampleList);
  const isLoading = useAppSelector(selectLoadItem(user.actions.getList.type));

  useEffect(() => {
    dispatch(actionUserGetList);
  }, [dispatch]);

  return (
    <Layout head={<Head description={message('user.list.description')} title={message('user.list.title')} />}>
      <Container>
        <h1>
          <Message id="user.list.title" />
        </h1>
        <UserList isLoading={isLoading} list={userList} />
      </Container>
    </Layout>
  );
};
