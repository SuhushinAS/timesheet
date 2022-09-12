import { loadStop } from 'entities/status/model/actions';
import { status } from 'entities/status/model/reducers';
import { track } from 'entities/track/model/reducers';
import { TTrack, TTrackInput, TTrackInputDelete } from 'entities/track/model/types';
import { api } from 'shared/api/api';
import { TAsyncAction, TErrorResult, TErrors } from 'shared/config/types';
import { checkErrors, dispatchAction, dispatchData } from 'shared/lib/action';

type TActionTrackCreate = (input: TTrackInput) => TAsyncAction<TTrack | TErrorResult>;

/**
 * Получить список.
 * @return Список.
 */
export const actionTrackCreate: TActionTrackCreate = ({ form, param }) => dispatch => {
  const { taskId } = param;

  dispatch(status.actions.loadStart(track.actions.update.type));

  return api.request<TTrack>(`/tracker/v2/issues/${taskId}/worklog`, { body: JSON.stringify(form), method: 'POST' })
    .then(checkErrors)
    .then(dispatchData(dispatch, track.actions.update))
    .then(dispatchAction(dispatch, track.actions.setCreateInput()))
    .finally(loadStop(dispatch, track.actions.update.type));
};

type TActionTrackDelete = (input: TTrackInputDelete) => TAsyncAction<TTrackInputDelete>;

/**
 * Получить список.
 * @return Список.
 */
export const actionTrackDelete: TActionTrackDelete = input => dispatch => {
  const { taskId, trackId } = input.param;

  dispatch(status.actions.loadStart(track.actions.delete.type));

  return api.requestRaw(`/tracker/v2/issues/${taskId}/worklog/${trackId}`, { method: 'DELETE' })
    .then(checkErrors)
    .then<TTrackInputDelete>(() => input)
    .then(dispatchData(dispatch, track.actions.delete))
    .finally(loadStop(dispatch, track.actions.delete.type));
};

type TActionTrackEdit = (input: TTrackInput) => TAsyncAction<TTrack | TErrors>;

/**
 * Получить список.
 * @return Список.
 */
export const actionTrackEdit: TActionTrackEdit = ({ form, param }) => dispatch => {
  const { taskId, trackId } = param;

  dispatch(status.actions.loadStart(track.actions.update.type));

  return api
    .request<TTrack>(`/tracker/v2/issues/${taskId}/worklog/${trackId}`, { body: JSON.stringify(form), method: 'PATCH' })
    .then(checkErrors)
    .then(dispatchData(dispatch, track.actions.update))
    .then(dispatchAction(dispatch, track.actions.setEditInput()))
    .finally(loadStop(dispatch, track.actions.update.type));
};

type TActionTrackGetList = (filter: string) => TAsyncAction<{ filter: string, result: TTrack[] }>;

/**
 * Получить список.
 * @return Список.
 */
export const actionTrackGetList: TActionTrackGetList = filter => dispatch => {
  dispatch(status.actions.loadStart(track.actions.getList.type));

  return api.request<TTrack[]>('/tracker/v2/worklog/_search?perPage=1000', { body: filter, method: 'POST' })
    .then(checkErrors)
    .then(result => ({ filter, result }))
    .then(dispatchData(dispatch, track.actions.getList))
    .finally(loadStop(dispatch, track.actions.getList.type));
};
