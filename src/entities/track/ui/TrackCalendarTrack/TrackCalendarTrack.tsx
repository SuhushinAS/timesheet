import { Popover, Space } from 'antd';
import { selectTrackItem } from 'entities/track/model/selectors';
import { TrackDeleteButton } from 'entities/track/ui/TrackDeleteButton';
import { TrackEditButton } from 'entities/track/ui/TrackEditButton';
import { DURATION_EMPTY } from 'features/date/lib/constants';
import { DateWrapper } from 'features/date/lib/helpers';
import { DurationFormat } from 'features/date/ui/DurationFormat';
import React, { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks';
import './style.scss';

type TProps = {
  isEdit?: boolean;
  trackId: string;
};

export const TrackCalendarTrack: FC<TProps> = ({ isEdit, trackId }) => {
  const trackItem = useAppSelector(selectTrackItem(trackId));
  const duration = DateWrapper.getDuration(trackItem?.duration || DURATION_EMPTY);

  if (!trackItem) {
    return null;
  }

  return (
    <Popover
      content={<div className="TrackCalendarTrack__PopoverContent">{trackItem.comment}</div>}
      placement="top"
    >
      <div>
        <div className="TrackCalendarTrack__Duration">
          <DurationFormat duration={duration} isWork />
        </div>
        {isEdit && (
          <Space size="small">
            <TrackEditButton trackItem={trackItem} />
            <TrackDeleteButton trackItem={trackItem} />
          </Space>
        )}
      </div>
    </Popover>
  );
};
