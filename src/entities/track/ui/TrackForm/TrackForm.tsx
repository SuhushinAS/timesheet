import { FormInstance, Input } from 'antd';
import { useMessage } from 'entities/locale/lib/hooks';
import { TTrackForm, TTrackInput } from 'entities/track/model/types';
import { DateWrapper } from 'features/date/lib/helpers';
import { useDurationFormatFromISO } from 'features/date/lib/hooks';
import React, { FC, useEffect, useMemo } from 'react';
import { DatePicker } from 'widgets/DatePicker';
import { Form, FormItem } from 'widgets/Form';

type TProps = {
  form: FormInstance;
  input?: TTrackInput;
  onSubmit: (values: TTrackForm) => void;
};

const useInitialValues = (form: FormInstance, input?: TTrackInput): Partial<TTrackForm> | undefined => {
  const duration = useDurationFormatFromISO(input?.form.duration);
  const start = useMemo(() => (
    input?.form.start ? DateWrapper.getDate(input?.form.start) : undefined
  ), [input?.form.start]);

  const initialValues = useMemo(() => (
    input
      ? {
        ...input.form,
        duration,
        start,
      }
      : undefined
  ), [duration, input, start]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
    form.resetFields();
  }, [form, initialValues]);

  return initialValues;
};

const rules = [{ required: true }];

export const TrackForm: FC<TProps> = ({ form, input, onSubmit }) => {
  const message = useMessage();
  const initialValues = useInitialValues(form, input);

  return (
    <Form form={form} initialValues={initialValues} onFinish={onSubmit}>
      <FormItem label={message('track.start.title')} name="start" rules={rules}>
        <DatePicker placeholder={message('track.start.placeholder')} />
      </FormItem>
      <FormItem label={message('track.duration.title')} name="duration" rules={rules}>
        <Input placeholder={message('track.duration.placeholder')} />
      </FormItem>
      <FormItem label={message('track.comment.title')} name="comment">
        <Input.TextArea autoSize placeholder={message('track.comment.placeholder')} />
      </FormItem>
    </Form>
  );
};
