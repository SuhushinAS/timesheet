import { FormInstance } from 'antd';
import { Action, ActionCreator } from 'redux';
import { AppDispatch } from 'shared/config/store';
import { TErrorResult } from 'shared/config/types';

type TDispatchData = <TD>(dispatch: AppDispatch, action: ActionCreator<Action>) => (data: TD) => TD;

/**
 * Диспатчить данные.
 * @return Данные.
 */
export const dispatchData: TDispatchData = (dispatch, action) => data => {
  dispatch(action(data));

  return data;
};

type TDispatchAction = <TD>(dispatch: AppDispatch, action: Action) => (data: TD) => TD;

/**
 * Диспатчить данные.
 * @return Данные.
 */
export const dispatchAction: TDispatchAction = (dispatch, action) => data => {
  dispatch(action);

  return data;
};
type TCheckErrors = <TD>(data: TD | TErrorResult) => TD | never;

/**
 * Проверить ошибки
 */
export const checkErrors: TCheckErrors = data => {
  if ('errors' in data) {
    throw data;
  }

  return data;
};

type TSetFormErrors = (form: FormInstance) => (result: TErrorResult) => void;
/**
 * Обработать ошибки
 */
export const setFormErrors: TSetFormErrors = form => result => {
  form.setFields(Object.keys(form.getFieldsValue()).map(name => {
    const error = result.errors[name];

    return { name, errors: error ? [error] : [] };
  }));
};
