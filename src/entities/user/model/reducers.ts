import { createSlice } from '@reduxjs/toolkit';
import { userIdKey } from 'entities/user/model/constants';
import { TUser, TUserStore } from 'entities/user/model/types';
import { getId, normalize } from 'shared/lib/normalize';

const getUserId = getId(userIdKey);

const normalizeUser = normalize<TUser>(getUserId);

const initialState: TUserStore = {
  data: {},
  list: [],
};

export const user = createSlice({
  initialState,
  name: 'user',
  reducers: {
    getItem: (state, { payload }) => {
      const id = payload[userIdKey];

      state.data[id] = payload;
    },
    getList: (state, { payload }) => {
      const { data, list } = normalizeUser(payload);

      state.data = { ...state.data, ...data };
      state.list = list;
    },
    getSelf: (state, { payload }) => {
      const id = payload[userIdKey];

      state.data[id] = payload;
      state.selfId = id;
    },
  },
});

