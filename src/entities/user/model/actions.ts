import { loadStop } from 'entities/status/model/actions';
import { status } from 'entities/status/model/reducers';
import { user } from 'entities/user/model/reducers';
import { TUser } from 'entities/user/model/types';
import { api } from 'shared/api/api';
import { TAsyncAction } from 'shared/config/types';
import { checkErrors, dispatchData } from 'shared/lib/action';

type TActionUserGetItem = (userId: string) => TAsyncAction<TUser>;

/**
 * Получить данные текущего пользователя.
 * @return Данные текущего пользователя.
 */
export const actionUserGetItem: TActionUserGetItem = userId => dispatch => {
  dispatch(status.actions.loadStart(user.actions.getItem.type));

  return api
    .request<TUser>(`/tracker/v2/users/${userId}`)
    .then(checkErrors)
    .then(dispatchData(dispatch, user.actions.getItem))
    .finally(loadStop(dispatch, user.actions.getItem.type));
};

/**
 * Получить список пользователей.
 * @return Список пользователей.
 */
export const actionUserGetList: TAsyncAction<TUser[]> = dispatch => {
  dispatch(status.actions.loadStart(user.actions.getList.type));

  return api
    .request<TUser[]>('/tracker/v2/users')
    .then(checkErrors)
    .then(dispatchData(dispatch, user.actions.getList))
    .finally(loadStop(dispatch, user.actions.getList.type));
};

/**
 * Получить данные текущего пользователя.
 * @return Данные текущего пользователя.
 */
export const actionUserGetSelf: TAsyncAction<TUser> = dispatch => {
  dispatch(status.actions.loadStart(user.actions.getSelf.type));

  return api
    .request<TUser>('/tracker/v2/myself')
    .then(checkErrors)
    .then(dispatchData(dispatch, user.actions.getSelf))
    .finally(loadStop(dispatch, user.actions.getSelf.type));
};
