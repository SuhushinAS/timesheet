import { PlusCircleTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import { track } from 'entities/track/model/reducers';
import { DateWrapper } from 'features/date/lib/helpers';
import React, { FC, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';

type TProps = {
  start?: string;
  taskId: string;
};

export const TrackAddButton: FC<TProps> = ({ start, taskId }) => {
  const dispatch = useAppDispatch();
  const onTrackCreateButtonClick = useCallback(() => {
    dispatch(track.actions.setCreateInput({
      form: {
        start: start ? DateWrapper.getDateISO(DateWrapper.getDate(start)) : undefined,
      },
      param: { taskId },
    }));
  }, [start, dispatch, taskId]);

  return (
    <Button icon={<PlusCircleTwoTone />} onClick={onTrackCreateButtonClick} size="small" type="text" />
  );
};
