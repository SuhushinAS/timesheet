import { currentLocaleKey, defaultLocale } from 'entities/locale/model/constants';
import { locale } from 'entities/locale/model/reducers';
import { selectLocaleCurrent } from 'entities/locale/model/selectors';
import { TLocale } from 'entities/locale/model/types';
import { loadStop } from 'entities/status/model/actions';
import { status } from 'entities/status/model/reducers';
import { DateWrapper } from 'features/date/lib/helpers';
import { Action } from 'redux';
import { api } from 'shared/api/api';
import { AppDispatch, GetState } from 'shared/config/store';
import { TAsyncAction, TAsyncActionData, TErrorResult } from 'shared/config/types';
import { checkErrors, dispatchData } from 'shared/lib/action';

type TLocaleList = { list: string[] };

/**
 * Получить список.
 * @return Список.
 */
export const actionLocaleGetList: TAsyncAction<TLocaleList> = dispatch => {
  dispatch(status.actions.loadStart(locale.actions.getList.type));

  return api
    .requestLocal<TLocaleList>('/api/locale.json')
    .then(checkErrors)
    .then(dispatchData(dispatch, locale.actions.getList))
    .finally(loadStop(dispatch, locale.actions.getList.type));
};

type TLocaleSetCurrent = (currentLocale: string) => (dispatch: AppDispatch) => Action<string>;

/**
 * Установить текущую локаль
 * @param currentLocale Локаль
 * @return Экшен.
 */
export const actionLocaleSetCurrent: TLocaleSetCurrent = currentLocale => dispatch => {
  localStorage.setItem(currentLocaleKey, currentLocale);
  DateWrapper.setLocale(currentLocale);

  return dispatch(locale.actions.setCurrent(currentLocale));
};

type TLocaleInit = (dispatch: AppDispatch, getState: GetState) => Action<string>;

/**
 * Получить словарь.
 * @return Словарь.
 */
export const actionLocaleInit: TLocaleInit = (dispatch, getState) => {
  const state = getState();
  const currentLocale = selectLocaleCurrent(state)
    || localStorage.getItem(currentLocaleKey)
    || defaultLocale;

  return dispatch(actionLocaleSetCurrent(currentLocale));
};

type TMessages = TLocale[];
type TActionLocaleGetMessagesResult = { data: TMessages; language: string; };
type TActionLocaleGetMessages = TAsyncActionData<string, TActionLocaleGetMessagesResult>;

/**
 * Получить словарь.
 * @param language Язык.
 * @return Словарь.
 */
export const actionLocaleGetMessages: TActionLocaleGetMessages = language => dispatch => {
  dispatch(status.actions.loadStart(locale.actions.getMessages.type));

  return api
    .requestLocal<TMessages | TErrorResult>(`/api/locale-${language}.json`)
    .then(checkErrors)
    .then(data => ({ data, language }))
    .then(dispatchData(dispatch, locale.actions.getMessages))
    .finally(loadStop(dispatch, locale.actions.getMessages.type));
};
