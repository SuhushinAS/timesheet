import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTrackIdMapKey } from 'entities/track/lib/helpers';
import { trackIdKey } from 'entities/track/model/constants';
import { TTrack, TTrackIdMap, TTrackInput, TTrackInputDelete, TTrackStore } from 'entities/track/model/types';
import { DATE_FORMAT_DATE_API } from 'features/date/lib/constants';
import { DateWrapper } from 'features/date/lib/helpers';
import { getId, normalize } from 'shared/lib/normalize';

const getTrackId = getId(trackIdKey);

const normalizeTrack = normalize<TTrack>(getTrackId);

const initialState: TTrackStore = {
  data: {},
  idMap: {},
  listByFilter: {},
};

type TTrackDeleteIdMap = (idMap: TTrackIdMap, extId: string, trackId: number) => void;
const trackDeleteIdMap: TTrackDeleteIdMap = (idMap, extId, trackId) => {
  if (idMap[extId]) {
    delete idMap[extId][trackId];
  }
};

type TTrackUpdateIdMap = (idMap: TTrackIdMap, extId: string, trackId: number) => void;
const trackUpdateIdMap: TTrackUpdateIdMap = (idMap, extId, trackId) => {
  idMap[extId] = idMap[extId] || {};
  idMap[extId][trackId] = true;
};

type TTrackGetParams = (track: TTrack) => {
  date: string;
  trackId: number;
  taskId: string;
  userId: string;
};
const trackGetParams: TTrackGetParams = track => ({
  date: DateWrapper.getDateFormat(DateWrapper.getDate(track.start), DATE_FORMAT_DATE_API),
  taskId: track.issue.id,
  trackId: track.id,
  userId: track.createdBy.id,
});

type TTrackDeleteIdMapFull = (idMap: TTrackIdMap, track?: TTrack) => void;
const trackDeleteIdMapFull: TTrackDeleteIdMapFull = (idMap, track) => {
  if (track) {
    const { date, taskId, trackId, userId } = trackGetParams(track);

    trackDeleteIdMap(idMap, getTrackIdMapKey({ taskId }), trackId);
    trackDeleteIdMap(idMap, getTrackIdMapKey({ userId }), trackId);
    trackDeleteIdMap(idMap, getTrackIdMapKey({ date, userId }), trackId);
    trackDeleteIdMap(idMap, getTrackIdMapKey({ taskId, userId }), trackId);
    trackDeleteIdMap(idMap, getTrackIdMapKey({ date, taskId, userId }), trackId);
  }
};

type TTrackUpdateIdMapFull = (idMap: TTrackIdMap, track: TTrack) => void;
const trackUpdateIdMapFull: TTrackUpdateIdMapFull = (idMap, track) => {
  const { date, taskId, trackId, userId } = trackGetParams(track);

  trackUpdateIdMap(idMap, getTrackIdMapKey({ taskId }), trackId);
  trackUpdateIdMap(idMap, getTrackIdMapKey({ userId }), trackId);
  trackUpdateIdMap(idMap, getTrackIdMapKey({ date, userId }), trackId);
  trackUpdateIdMap(idMap, getTrackIdMapKey({ taskId, userId }), trackId);
  trackUpdateIdMap(idMap, getTrackIdMapKey({ date, taskId, userId }), trackId);
};

export const track = createSlice({
  initialState,
  name: 'track',
  reducers: {
    delete: (state, { payload }: PayloadAction<TTrackInputDelete>) => {
      const { trackId } = payload.param;
      const track = state.data[trackId];

      trackDeleteIdMapFull(state.idMap, track);

      delete state.data[trackId];
    },
    getList: (state, { payload }: PayloadAction<{ filter: string, result: TTrack[] }>) => {
      const { filter, result } = payload;
      const { data, list } = normalizeTrack(result);

      state.idMap = {};

      result.forEach(track => {
        trackUpdateIdMapFull(state.idMap, track);
      });

      state.data = { ...state.data, ...data };
      state.listByFilter[filter] = list;
    },
    update: (state, { payload }: PayloadAction<TTrack>) => {
      const { id } = payload;
      const prevTrack = state.data[id];

      trackDeleteIdMapFull(state.idMap, prevTrack);
      trackUpdateIdMapFull(state.idMap, payload);

      delete state.data[id];
      state.data[id] = payload;
    },
    setCreateInput: (state, { payload }: PayloadAction<TTrackInput | undefined>) => {
      state.createInput = payload;
    },
    setEditInput: (state, { payload }: PayloadAction<TTrackInput | undefined>) => {
      state.editInput = payload;
    },
  },
});

