import { selectTrackIdListByParams } from 'entities/track/model/selectors';
import { TrackCalendarColSum } from 'entities/track/ui/TrackCalendarColSum';
import { DATE_FORMAT_DATE_API } from 'features/date/lib/constants';
import { DateWrapper, TDate } from 'features/date/lib/helpers';
import React, { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks';

type TProps = {
  date: TDate;
  userId: string;
};

export const TrackCalendarColSumDay: FC<TProps> = ({ date, userId }) => {
  const dateFormat = DateWrapper.getDateFormat(date, DATE_FORMAT_DATE_API);
  const trackIds = useAppSelector(selectTrackIdListByParams({ date: dateFormat, userId }));

  return <TrackCalendarColSum trackIds={trackIds} />;
};
