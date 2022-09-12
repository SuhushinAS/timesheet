import { TDate } from 'features/date/lib/helpers';
import { TEntityShort, TEntityShortKey } from 'shared/lib/types';

export type TTrackStore = {
  createInput?: TTrackInput;
  data: TTrackData;
  editInput?: TTrackInput;
  idMap: TTrackIdMap;
  listByFilter: TTrackListByFilter;
};

export type TTrackListByFilter = Record<string, string[]>;

export type TTrackData = Record<string, TTrack>;

export type TTrack = {
  comment: string;
  createdAt: string;
  createdBy: TEntityShort;
  duration: string;
  id: number;
  issue: TEntityShortKey;
  self: string;
  start: string;
  updatedBy: TEntityShort;
  version: number;
  updatedAt: string;
};

export type TTrackIdMap = Record<string, TTrackIdItem>;

export type TTrackIdItem = Record<number, boolean>;

export type TTrackInputForm = {
  comment: string;
  duration: string;
  start: string;
};

export type TTrackInput = {
  form: Partial<TTrackInputForm>;
  param: TTrackInputParam;
};

export type TTrackInputParam = {
  taskId: string;
  trackId?: number;
};

export type TTrackForm = {
  comment: string;
  duration: string;
  start: TDate;
};

export type TTrackInputDelete = {
  param: TTrackInputDeleteParam;
};

export type TTrackInputDeleteParam = {
  taskId: string;
  trackId: number;
};
