import { selectLoadItem } from 'entities/status/model/selectors';
import { actionTaskGetList } from 'entities/task/model/actions';
import { task } from 'entities/task/model/reducers';
import { selectTaskListByFilter } from 'entities/task/model/selectors';
import { TaskList } from 'entities/task/ui/TaskList';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';

type TProps = {
  filter: string;
  isEdit?: boolean;
};

export const TaskListLoad: FC<TProps> = ({ filter, isEdit }) => {
  const dispatch = useAppDispatch();
  const taskList = useAppSelector(selectTaskListByFilter(filter));
  const isLoading = useAppSelector(selectLoadItem(task.actions.getList.type));

  useEffect(() => {
    dispatch(actionTaskGetList(filter));
  }, [dispatch, filter]);

  return <TaskList isEdit={isEdit} isLoading={isLoading} list={taskList} />;
};
