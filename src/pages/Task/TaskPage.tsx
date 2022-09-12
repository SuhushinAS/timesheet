import { useMessage } from 'entities/locale/lib/hooks';
import { Message } from 'entities/locale/ui/Message';
import { useTaskFilter } from 'entities/task/lib/hooks';
import { TaskListLoad } from 'entities/task/ui/TaskListLoad';
import { useTrackFilter } from 'entities/track/lib/hooks';
import { actionTrackGetList } from 'entities/track/model/actions';
import React, { FC, useEffect } from 'react';
import { dateRange } from 'shared/config/constants';
import { useAppDispatch } from 'shared/lib/hooks';
import { Container } from 'widgets/Container';
import { Head } from 'widgets/Head';
import { Layout } from 'widgets/Layout';

export const TaskPage: FC = () => {
  const dispatch = useAppDispatch();
  const message = useMessage();
  // TODO Получить фильтры из пользовательского ввода.
  const taskFilter = useTaskFilter({});
  const trackFilter = useTrackFilter({ from: dateRange.from, to: dateRange.to });

  useEffect(() => {
    dispatch(actionTrackGetList(trackFilter));
  }, [dispatch, trackFilter]);

  return (
    <Layout head={<Head description={message('task.list.description')} title={message('task.list.title')} />}>
      <Container>
        <h1>
          <Message id="task.list.title" />
        </h1>
        <TaskListLoad filter={taskFilter} />
      </Container>
    </Layout>
  );
};
