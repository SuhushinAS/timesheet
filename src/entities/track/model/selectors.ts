import { getTrackIdMapKey } from 'entities/track/lib/helpers';
import { track } from 'entities/track/model/reducers';
import { TTrack, TTrackData, TTrackIdMap, TTrackInput, TTrackStore } from 'entities/track/model/types';
import { createSelector } from 'reselect';
import { RootState } from 'shared/config/store';
import { getList } from 'shared/lib/selectors';

export const selectTrack = (state: RootState): TTrackStore => state[track.name];

export const selectTrackData = (state: RootState): TTrackData => selectTrack(state).data;

export const selectTrackItem = (id: string) => (state: RootState): TTrack | undefined => selectTrackData(state)[id];

type TSelectTrackCreateInput = (state: RootState) => TTrackInput | undefined;
export const selectTrackCreateInput: TSelectTrackCreateInput = state => selectTrack(state).createInput;

type TSelectTrackEditInput = (state: RootState) => TTrackInput | undefined;
export const selectTrackEditInput: TSelectTrackEditInput = state => selectTrack(state).editInput;

type TSelectTrackIdListByFilter = (filter: string) => (state: RootState) => string[];
export const selectTrackIdListByFilter: TSelectTrackIdListByFilter = filter => state => {
  const { listByFilter } = selectTrack(state);

  return listByFilter[filter] || [];
};

type TSelectTrackListByFilter = (filter: string) => (state: RootState) => TTrack[];
export const selectTrackListByFilter: TSelectTrackListByFilter = filter => createSelector([selectTrackData, selectTrackIdListByFilter(filter)], getList);

export const selectTrackIdMap = (state: RootState): TTrackIdMap => selectTrack(state).idMap;

type TSelectTrackIdListByParams = (params: Record<string, string>) => (state: RootState) => string[];
export const selectTrackIdListByParams: TSelectTrackIdListByParams = params => {
  const getTrackTaskDayMap = (taskDayMap: TTrackIdMap): string[] => {
    const trackIdMapKey = getTrackIdMapKey(params);
    const tracks = taskDayMap[trackIdMapKey] || {};

    return Object.keys(tracks);
  };

  return createSelector([selectTrackIdMap], getTrackTaskDayMap);
};

type TSelectTrackListByParams = (params: Record<string, string>) => (state: RootState) => TTrack[];
export const selectTrackListByParams: TSelectTrackListByParams = params => createSelector([selectTrackData, selectTrackIdListByParams(params)], getList);

type TSelectTrackByParamsMulti = (paramsList: Record<string, string>[]) => (state: RootState) => string[][];
export const selectTrackByParamsMulti: TSelectTrackByParamsMulti = paramsList => state => paramsList.map(params => selectTrackIdListByParams(params)(state));
