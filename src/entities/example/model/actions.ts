import { example } from 'entities/example/model/reducers';
import { TExample } from 'entities/example/model/types';
import { loadStop } from 'entities/status/model/actions';
import { status } from 'entities/status/model/reducers';
import { api } from 'shared/api/api';
import { TAsyncAction } from 'shared/config/types';
import { checkErrors, dispatchData } from 'shared/lib/action';

/**
 * Получить список.
 * @return Список.
 */
export const actionExampleGetList: TAsyncAction<TExample[]> = dispatch => {
  dispatch(status.actions.loadStart(example.actions.getList.type));

  return api
    .requestLocal<TExample[]>('/api/example.json')
    .then(checkErrors)
    .then(dispatchData(dispatch, example.actions.getList))
    .finally(loadStop(dispatch, example.actions.getList.type));
};
