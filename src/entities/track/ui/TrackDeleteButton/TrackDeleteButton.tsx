import { DeleteTwoTone } from '@ant-design/icons';
import { Button, ButtonProps, Popconfirm } from 'antd';
import { Message } from 'entities/locale/ui/Message';
import { actionTrackDelete } from 'entities/track/model/actions';
import { TTrack } from 'entities/track/model/types';
import React, { FC, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';

type TProps = {
  trackItem: TTrack;
};

const popConfirmOkButtonProps: ButtonProps = { type: 'primary' };

export const TrackDeleteButton: FC<TProps> = ({ trackItem }) => {
  const dispatch = useAppDispatch();
  const onTrackDelete = useCallback(() => {
    dispatch(actionTrackDelete({
      param: {
        taskId: trackItem.issue.id,
        trackId: trackItem.id,
      },
    }));
  }, [dispatch, trackItem]);

  return (
    <Popconfirm
      cancelText={<Message id="share.no.action" />}
      okType="danger"
      okButtonProps={popConfirmOkButtonProps}
      okText={<Message id="share.yes.action" />}
      onConfirm={onTrackDelete}
      placement="bottom"
      title={<Message id="track.delete.confirm" />}
    >
      <Button danger htmlType="button" icon={<DeleteTwoTone />} size="small" type="text" />
    </Popconfirm>
  );
};
