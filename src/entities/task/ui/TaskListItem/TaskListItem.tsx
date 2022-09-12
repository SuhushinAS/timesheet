import { Message } from 'entities/locale/ui/Message';
import { selectLoadItem } from 'entities/status/model/selectors';
import { selectTaskItem } from 'entities/task/model/selectors';
import { track } from 'entities/track/model/reducers';
import { selectTrackListByParams } from 'entities/track/model/selectors';
import { TrackAddButton } from 'entities/track/ui/TrackAddButton';
import { TrackList } from 'entities/track/ui/TrackList';
import React, { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks';

type TProps = {
  isEdit?: boolean;
  taskId: string;
};

export const TaskListItem: FC<TProps> = ({ isEdit, taskId }) => {
  const task = useAppSelector(selectTaskItem(taskId));
  const trackList = useAppSelector(selectTrackListByParams({ taskId }));
  const isTrackListLoading = useAppSelector(selectLoadItem(track.actions.getList.type));

  if (!task) {
    return null;
  }

  return (
    <>
      <tr>
        <td>{task.key}</td>
        <td>{task.summary}</td>
        <td>{task.assignee?.display || <Message id="task.item.assigneeEmpty" />}</td>
        {isEdit && (
          <td>
            <TrackAddButton taskId={taskId} />
          </td>
        )}

      </tr>
      {trackList.length > 0 && (
        <tr>
          <td colSpan={4}>
            <TrackList isEdit={isEdit} isLoading={isTrackListLoading} list={trackList} />
          </td>
        </tr>
      )}
    </>
  );
};
