import { TDuration } from 'features/date/lib/helpers';
import { useDurationFormat } from 'features/date/lib/hooks';
import React, { FC } from 'react';

type TProps = {
  duration: TDuration;
  isWork?: boolean;
};

export const DurationFormat: FC<TProps> = ({ duration, isWork = false }: TProps) => {
  const durationFormat = useDurationFormat(duration, isWork);

  return (
    <>
      {durationFormat}
    </>
  );
};

