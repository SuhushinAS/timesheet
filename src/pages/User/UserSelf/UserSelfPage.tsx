import { useMessage } from 'entities/locale/lib/hooks';
import { selectLoadItem } from 'entities/status/model/selectors';
import { actionUserGetSelf } from 'entities/user/model/actions';
import { user } from 'entities/user/model/reducers';
import { selectUserSelfId } from 'entities/user/model/selectors';
import { UserItem } from 'entities/user/ui/UserItem';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { Container } from 'widgets/Container';
import { Head } from 'widgets/Head';
import { Layout } from 'widgets/Layout';

export const UserSelfPage: FC = () => {
  const message = useMessage();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserSelfId);
  const isLoading = useAppSelector(selectLoadItem(user.actions.getSelf.type));

  useEffect(() => {
    dispatch(actionUserGetSelf);
  }, [dispatch]);

  return (
    <Layout head={<Head description={message('user.self.description')} title={message('user.self.title')} />}>
      <Container>
        {userId && <UserItem isEdit isLoading={isLoading} userId={userId} />}
      </Container>
    </Layout>
  );
};
