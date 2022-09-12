import { TrackCalendarIds } from 'entities/track/ui/TrackCalendarIds';
import { TrackCalendarSum } from 'entities/track/ui/TrackCalendarSum';
import React, { FC, ReactElement } from 'react';

type TProps = {
  trackIds: string[];
};
const renderTracks = (trackIds: string[]): ReactElement => <TrackCalendarSum trackIds={trackIds} />;

export const TrackCalendarColSum: FC<TProps> = ({ trackIds }) => (
  <TrackCalendarIds render={renderTracks} trackIds={trackIds} />
);
