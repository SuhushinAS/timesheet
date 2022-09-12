import { DATE_FORMAT_MONTH } from 'features/date/lib/constants';
import { DateWrapper, TDate } from 'features/date/lib/helpers';
import React, { FC } from 'react';

type TProps = {
  date: TDate;
};

export const TrackCalendarColHead: FC<TProps> = ({ date }) => {
  const dateFormat = DateWrapper.getDateFormat(date, DATE_FORMAT_MONTH);

  return (
    <>
      <div>{dateFormat}</div>
      <div>{DateWrapper.getDateFormat(date, 'dd')}</div>
    </>
  );
};
