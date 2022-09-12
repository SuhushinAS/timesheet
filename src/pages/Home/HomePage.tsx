import { useMessage } from 'entities/locale/lib/hooks';
import { Message } from 'entities/locale/ui/Message';
import { userPaths } from 'entities/user/model/constants';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { appPaths } from 'shared/config/constants';
import { Container } from 'widgets/Container';
import { Head } from 'widgets/Head';
import { Layout } from 'widgets/Layout';

export const HomePage: FC = () => {
  const message = useMessage();

  return (
    <Layout head={<Head description={message('home.description')} title={message('home.title')} />}>
      <Container>
        <h1>
          <Message id="home.title" />
        </h1>
        <ul>
          <li>
            <Message id="user.item.title" />
            <ul>
              <li>
                <Link to={`${appPaths.user}${userPaths.list}`}>
                  <Message id="user.list.title" />
                </Link>
              </li>
              <li>
                <Link to={`${appPaths.user}${userPaths.self}`}>
                  <Message id="user.self.title" />
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={appPaths.task}>
              <Message id="task.list.title" />
            </Link>
          </li>
          <li>
            <Link to={appPaths.track}>
              <Message id="track.list.title" />
            </Link>
          </li>
        </ul>
      </Container>
    </Layout>
  );
};
