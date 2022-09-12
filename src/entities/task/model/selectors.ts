import { task } from 'entities/task/model/reducers';
import { TTask, TTaskMap, TTaskStore } from 'entities/task/model/types';
import { createSelector } from 'reselect';
import { RootState } from 'shared/config/store';
import { getList } from 'shared/lib/selectors';

export const selectTask = (state: RootState): TTaskStore => state[task.name];

export const selectTaskData = (state: RootState): TTaskMap => selectTask(state).data;

type TSelectTaskIdListByFilter = (filter: string) => (state: RootState) => string[];
export const selectTaskIdListByFilter: TSelectTaskIdListByFilter = filter => state => selectTask(state).listByFilter[filter] || [];

type TSelectTaskListByFilter = (filter: string) => (state: RootState) => TTask[];
export const selectTaskListByFilter: TSelectTaskListByFilter = filter => createSelector([selectTaskData, selectTaskIdListByFilter(filter)], getList);

export const selectTaskItem = (id: string) => (state: RootState): TTask | undefined => selectTaskData(state)[id];
