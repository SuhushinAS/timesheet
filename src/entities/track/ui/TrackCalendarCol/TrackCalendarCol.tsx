import { selectTrackIdListByParams } from 'entities/track/model/selectors';
import { TrackAddButton } from 'entities/track/ui/TrackAddButton';
import { TrackCalendarIds } from 'entities/track/ui/TrackCalendarIds';
import { TrackCalendarTrack } from 'entities/track/ui/TrackCalendarTrack';
import React, { FC, ReactElement, useCallback } from 'react';
import { useAppSelector } from 'shared/lib/hooks';

type TProps = {
  date: string;
  isEdit?: boolean;
  taskId: string;
  userId: string;
};

export const TrackCalendarCol: FC<TProps> = ({ date, isEdit, taskId, userId }) => {
  const trackIds = useAppSelector(selectTrackIdListByParams({ date, taskId, userId }));

  const renderTracks = useCallback((trackIds: string[]): ReactElement => (
    <>
      {trackIds.map(trackId => <TrackCalendarTrack isEdit={isEdit} key={trackId} trackId={trackId} />)}
    </>
  ), [isEdit]);

  return (
    <div>
      <div>
        <TrackAddButton start={date} taskId={taskId} />
      </div>
      <div>
        <TrackCalendarIds render={renderTracks} trackIds={trackIds} />
      </div>
    </div>
  );
};
