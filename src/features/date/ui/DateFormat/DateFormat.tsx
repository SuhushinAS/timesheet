import { DateWrapper } from 'features/date/lib/helpers';
import React, { FC } from 'react';

type TProps = {
  date: string;
  format?: string;
};

export const DateFormat: FC<TProps> = ({ date, format }: TProps) => {
  const dateObject = DateWrapper.getDate(date);
  const dateFormat = DateWrapper.getDateFormat(dateObject, format);

  return (
    <>
      {dateFormat}
    </>
  );
};

