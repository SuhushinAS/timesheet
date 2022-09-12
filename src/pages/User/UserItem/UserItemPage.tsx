import { useMessage } from 'entities/locale/lib/hooks';
import { Message } from 'entities/locale/ui/Message';
import { selectLoadItem } from 'entities/status/model/selectors';
import { actionUserGetItem } from 'entities/user/model/actions';
import { user } from 'entities/user/model/reducers';
import { UserItem } from 'entities/user/ui/UserItem';
import React, { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { appPaths } from 'shared/config/constants';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { Container } from 'widgets/Container';
import { Head } from 'widgets/Head';
import { Layout } from 'widgets/Layout';

export const UserItemPage: FC = () => {
  const message = useMessage();
  const dispatch = useAppDispatch();
  const { userId = '' } = useParams();
  const isLoading = useAppSelector(selectLoadItem(user.actions.getItem.type));

  useEffect(() => {
    if (userId) {
      dispatch(actionUserGetItem(userId));
    }
  }, [dispatch, userId]);

  return (
    <Layout head={<Head description={message('user.item.description')} title={message('user.item.title')} />}>
      <Container>
        <h1>
          <Message id="user.item.title" />
        </h1>
        <div>
          <Link to={appPaths.user}><Message id="user.list.title" /></Link>
        </div>
        <UserItem isLoading={isLoading} userId={userId} />
      </Container>
    </Layout>
  );
};
