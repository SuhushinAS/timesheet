import React, { FC, ReactElement } from 'react';

type TProps = {
  trackIds: string[];
  render: (trackIds: string[]) => ReactElement;
};

export const TrackCalendarIds: FC<TProps> = ({ trackIds, render }) => {
  if (trackIds.length <= 0) {
    return <>—</>;
  }

  return render(trackIds);
};
