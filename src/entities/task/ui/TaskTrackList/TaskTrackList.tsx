import { selectLoadItem } from 'entities/status/model/selectors';
import { taskIdKey } from 'entities/task/model/constants';
import { TTask } from 'entities/task/model/types';
import { track } from 'entities/track/model/reducers';
import { selectTrackListByParams } from 'entities/track/model/selectors';
import { TrackList } from 'entities/track/ui/TrackList';
import React, { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks';

type TProps = {
  isEdit?: boolean;
  taskItem: TTask;
};

export const TaskTrackList: FC<TProps> = ({ isEdit, taskItem }) => {
  const taskId = taskItem[taskIdKey];
  const trackList = useAppSelector(selectTrackListByParams({ taskId }));
  const isTrackListLoading = useAppSelector(selectLoadItem(track.actions.getList.type));

  return (
    <TrackList isEdit={isEdit} isLoading={isTrackListLoading} list={trackList} />
  );
};
