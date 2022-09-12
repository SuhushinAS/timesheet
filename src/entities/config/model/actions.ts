import { config } from 'entities/config/model/reducers';
import { TConfigStore } from 'entities/config/model/types';
import { loadStop } from 'entities/status/model/actions';
import { status } from 'entities/status/model/reducers';
import { api } from 'shared/api/api';
import { TAsyncAction } from 'shared/config/types';
import { checkErrors, dispatchData } from 'shared/lib/action';

/**
 * Получить конфиг.
 * @return Конфиг.
 */
export const actionConfigGet: TAsyncAction<TConfigStore> = dispatch => {
  dispatch(status.actions.loadStart(config.actions.getConfig.type));

  return api
    .requestLocal<TConfigStore>('/api/config.json')
    .then(checkErrors)
    .then(dispatchData(dispatch, config.actions.getConfig))
    .finally(loadStop(dispatch, config.actions.getConfig.type));
};
