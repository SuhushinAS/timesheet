import { selectConfigTrackUrl } from 'entities/config/model/selectors';
import { TTask } from 'entities/task/model/types';
import { useMemo } from 'react';
import { useAppSelector } from 'shared/lib/hooks';

type TUseTrackFilter = (params: TUseTrackFilterParams) => string;
type TUseTrackFilterParams = {
  from?: string;
  to?: string;
  userId?: string;
};

export const useTrackFilter: TUseTrackFilter = ({ from, to, userId }) => useMemo(() => JSON.stringify({
  start: { from, to },
  createdBy: userId,
}), [from, to, userId]);

export const useTrackerUrl = (taskItem: TTask | undefined): string => {
  const trackerUrl = useAppSelector(selectConfigTrackUrl);

  if (!taskItem) {
    return '';
  }

  return `${trackerUrl}${taskItem.key}`;
};
