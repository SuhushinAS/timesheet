import { selectTrackByParamsMulti } from 'entities/track/model/selectors';
import { TrackCalendarColSum } from 'entities/track/ui/TrackCalendarColSum';
import { DATE_FORMAT_DATE_API } from 'features/date/lib/constants';
import { DateWrapper, TDate } from 'features/date/lib/helpers';
import React, { FC, useMemo } from 'react';
import { useAppSelector } from 'shared/lib/hooks';

type TProps = {
  range: TDate[];
  userId: string;
};

export const TrackCalendarColSumMonth: FC<TProps> = ({ range, userId }) => {
  const paramsList = useMemo(() => range.map(date => {
    const dateFormat = DateWrapper.getDateFormat(date, DATE_FORMAT_DATE_API);

    return { date: dateFormat, userId };
  }), [range, userId]);

  const trackIdsList = useAppSelector(selectTrackByParamsMulti(paramsList));
  const trackIds = useMemo(() => trackIdsList.flat(), [trackIdsList]);

  return <TrackCalendarColSum trackIds={trackIds} />;
};
