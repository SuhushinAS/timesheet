import { TEntityShort, TEntityShortKey } from 'shared/lib/types';

export type TTaskStore = {
  data: TTaskMap;
  listByFilter: TTaskListByFilter;
};

export type TTaskListByFilter = Record<string, string[]>;

export type TTaskMap = Record<string, TTask>;

export type TTask = {
  affectedVersions: TEntityShort[];
  assignee: TEntityShort;
  commentWithExternalMessageCount: number;
  commentWithoutExternalMessageCount: number;
  createdAt: string;
  createdBy: TEntityShort;
  description: string;
  estimation: string;
  favorite: boolean;
  fixVersions: TEntityShort[];
  id: string;
  key: string;
  originalEstimation: string;
  previousStatus: TEntityShortKey;
  previousStatusLastAssignee: TEntityShort;
  priority: TEntityShortKey;
  queue: TEntityShortKey;
  self: string;
  spent: string;
  status: TEntityShortKey;
  statusStartTime: string;
  summary: string;
  type: TEntityShortKey;
  updatedAt: string;
  updatedBy: TEntityShort;
  version: number;
  votes: number;
};
