import { selectTrackData } from 'entities/track/model/selectors';
import { DateWrapper } from 'features/date/lib/helpers';
import { DurationFormat } from 'features/date/ui/DurationFormat';
import React, { FC, useMemo } from 'react';
import { useAppSelector } from 'shared/lib/hooks';
import './style.scss';

type TProps = {
  trackIds: string[];
};

export const TrackCalendarSum: FC<TProps> = ({ trackIds }) => {
  const trackData = useAppSelector(selectTrackData);

  const durationTotal = useMemo(() => {
    const seconds = trackIds.reduce((acc, trackId) => {
      const track = trackData[trackId];

      if (!track) {
        return acc;
      }

      return DateWrapper.getDurationSeconds(DateWrapper.getDuration(track.duration), true) + acc;
    }, 0);

    return DateWrapper.getDurationFromSeconds(seconds);
  }, [trackData, trackIds]);

  return (
    <div className="TrackCalendarSum">
      <DurationFormat duration={durationTotal} />
    </div>
  );
};
