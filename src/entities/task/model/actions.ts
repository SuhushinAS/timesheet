import { loadStop } from 'entities/status/model/actions';
import { status } from 'entities/status/model/reducers';
import { task } from 'entities/task/model/reducers';
import { TTask } from 'entities/task/model/types';
import { api } from 'shared/api/api';
import { TAsyncAction, TErrorResult } from 'shared/config/types';
import { checkErrors, dispatchData } from 'shared/lib/action';

type TActionTaskGetList = (filter: string) => TAsyncAction<{ filter: string, result: TTask[] }>;

/**
 * Получить список.
 * @return Список.
 */
export const actionTaskGetList: TActionTaskGetList = filter => dispatch => {
  dispatch(status.actions.loadStart(task.actions.getList.type));

  return api
    .request<TTask[] | TErrorResult>('/tracker/v2/issues/_search', { body: filter, method: 'POST' })
    .then(checkErrors)
    .then(result => ({ filter, result }))
    .then(dispatchData(dispatch, task.actions.getList))
    .finally(loadStop(dispatch, task.actions.getList.type));
};
