import { auth } from 'entities/auth/model/reducers';
import { api } from 'shared/api/api';
import { TActionData } from 'shared/config/types';

/**
 * Задать токен.
 */
export const actionAuthSetToken: TActionData<string, void> = token => dispatch => {
  api.token = token;
  dispatch(auth.actions.setToken(token));
};
