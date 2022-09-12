import { EditTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import { track } from 'entities/track/model/reducers';
import { TTrack } from 'entities/track/model/types';
import { DATE_FORMAT_DATE_API } from 'features/date/lib/constants';
import { DateWrapper } from 'features/date/lib/helpers';
import React, { FC, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import './style.scss';

type TProps = {
  trackItem: TTrack;
};

export const TrackEditButton: FC<TProps> = ({ trackItem }) => {
  const dispatch = useAppDispatch();
  const onTrackEditButtonClick = useCallback(() => {
    if (trackItem) {
      dispatch(track.actions.setEditInput({
        form: {
          comment: trackItem.comment,
          duration: trackItem.duration,
          start: DateWrapper.getDateFormat(DateWrapper.getDate(trackItem.start), DATE_FORMAT_DATE_API),
        },
        param: {
          taskId: trackItem.issue.id,
          trackId: trackItem.id,
        },
      }));
    }
  }, [dispatch, trackItem]);

  return (
    <Button icon={<EditTwoTone />} onClick={onTrackEditButtonClick} size="small" type="text" />
  );
};
