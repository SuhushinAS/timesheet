import { selectLoadItem } from 'entities/status/model/selectors';
import { actionTrackGetList } from 'entities/track/model/actions';
import { track } from 'entities/track/model/reducers';
import { selectTrackListByFilter } from 'entities/track/model/selectors';
import { TrackList } from 'entities/track/ui/TrackList';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';

type TProps = {
  filter: string;
  isEdit?: boolean;
};

export const TrackListLoad: FC<TProps> = ({ filter, isEdit }) => {
  const dispatch = useAppDispatch();
  const trackList = useAppSelector(selectTrackListByFilter(filter));
  const isLoading = useAppSelector(selectLoadItem(track.actions.getList.type));

  useEffect(() => {
    dispatch(actionTrackGetList(filter));
  }, [dispatch, filter]);

  return <TrackList isEdit={isEdit} isLoading={isLoading} list={trackList} />;
};
