import { Form as AntForm, FormProps } from 'antd';
import React from 'react';

type TForm = <Values>(props: FormProps<Values>) => React.ReactElement;

const labelColDefault = { span: 6 };
const wrapperColDefault = { span: 18 };

export const { Item: FormItem } = AntForm;

export const Form: TForm = ({
  labelCol = labelColDefault,
  layout = 'horizontal',
  wrapperCol = wrapperColDefault,
  ...props
}) => (
  <AntForm labelCol={labelCol} layout={layout} wrapperCol={wrapperCol} {...props} />
);
