import { Message } from 'entities/locale/ui/Message';
import { taskIdKey } from 'entities/task/model/constants';
import { TTask } from 'entities/task/model/types';
import { TaskTrackList } from 'entities/task/ui/TaskTrackList';
import { TrackAddButton } from 'entities/track/ui/TrackAddButton';
import React, { FC, ReactElement, useMemo } from 'react';
import { TEntityShort } from 'shared/lib/types';
import { Column, Table } from 'widgets/Table';

type TProps = {
  isEdit?: boolean;
  isLoading?: boolean;
  list: TTask[];
};

const renderAssignee = (assignee: TEntityShort): ReactElement => (
  assignee ? <>{assignee.display}</> : <Message id="task.item.assigneeEmpty" />
);

const renderControl = (taskItem: TTask): ReactElement => (
  <TrackAddButton taskId={`${taskItem[taskIdKey]}`} />
);

export const TaskList: FC<TProps> = ({ isEdit, isLoading, list }) => {
  const expandable = useMemo(() => ({
    expandedRowRender: (taskItem: TTask): ReactElement => {
      console.log(taskItem);

      return <TaskTrackList isEdit={isEdit} taskItem={taskItem} />;
    },
  }), [isEdit]);

  return (
    <Table bordered dataSource={list} expandable={expandable} loading={isLoading} showHeader>
      <Column dataIndex="key" key="key" title={<Message id="task.item.key" />} />
      <Column dataIndex="summary" key="summary" title={<Message id="task.item.summary" />} />
      <Column dataIndex="assignee" key="assignee" render={renderAssignee} title={<Message id="task.item.assignee" />} />
      {isEdit && <Column render={renderControl} title={'\u00A0'} />}
    </Table>
  );
};
