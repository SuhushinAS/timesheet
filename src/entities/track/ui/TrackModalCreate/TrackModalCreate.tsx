import { Form, Modal } from 'antd';
import { Message } from 'entities/locale/ui/Message';
import { selectLoadItem } from 'entities/status/model/selectors';
import { actionTrackCreate } from 'entities/track/model/actions';
import { track } from 'entities/track/model/reducers';
import { selectTrackCreateInput } from 'entities/track/model/selectors';
import { TTrackForm } from 'entities/track/model/types';
import { TrackForm } from 'entities/track/ui/TrackForm';
import { DateWrapper } from 'features/date/lib/helpers';
import React, { FC, useCallback } from 'react';
import { setFormErrors } from 'shared/lib/action';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';

export const TrackModalCreate: FC = () => {
  const dispatch = useAppDispatch();
  const trackInput = useAppSelector(selectTrackCreateInput);
  const isLoading = useAppSelector(selectLoadItem(track.actions.update.type));
  const [form] = Form.useForm();

  const onTrackModalClose = useCallback(() => {
    dispatch(track.actions.setCreateInput());
  }, [dispatch]);

  const onTrackFormSubmit = useCallback((values: TTrackForm) => {
    if (trackInput) {
      dispatch(actionTrackCreate({
        form: {
          ...values,
          duration: DateWrapper.getDurationISO(DateWrapper.parseDuration(values.duration)),
          start: DateWrapper.getDateISO(values.start),
        },
        param: trackInput.param,
      })).catch(setFormErrors(form));
    }
  }, [dispatch, form, trackInput]);

  return (
    <Modal
      cancelText={<Message id="share.cancel.action" />}
      confirmLoading={isLoading}
      maskClosable={false}
      okText={<Message id="share.create.action" />}
      onCancel={onTrackModalClose}
      onOk={form.submit}
      title={<Message id="track.create.title" />}
      visible={!!trackInput}
    >
      <TrackForm form={form} input={trackInput} onSubmit={onTrackFormSubmit} />
    </Modal>
  );
};
