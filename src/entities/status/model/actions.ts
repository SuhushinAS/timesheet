import { status } from 'entities/status/model/reducers';
import { AppDispatch } from 'shared/config/store';
import { dispatchAction } from 'shared/lib/action';

type TLoadStop = <TD>(dispatch: AppDispatch, type: string) => (data: TD) => TD;

/**
 * Остановить загрузку.
 */
export const loadStop: TLoadStop = (dispatch, type) => dispatchAction(dispatch, status.actions.loadStop(type));
