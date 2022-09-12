import { createSlice } from '@reduxjs/toolkit';
import { taskIdKey } from 'entities/task/model/constants';
import { TTask, TTaskStore } from 'entities/task/model/types';
import { getId, normalize } from 'shared/lib/normalize';

const getTaskId = getId(taskIdKey);

const normalizeTask = normalize<TTask>(getTaskId);

const initialState: TTaskStore = {
  data: {},
  listByFilter: {},
};

export const task = createSlice({
  initialState,
  name: 'task',
  reducers: {
    getList: (state, { payload }) => {
      const { filter, result } = payload;
      const { data, list } = normalizeTask(result);

      state.data = { ...state.data, ...data };
      state.listByFilter[filter] = list;
    },
  },
});

