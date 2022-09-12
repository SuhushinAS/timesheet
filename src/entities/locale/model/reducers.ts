import { createSlice } from '@reduxjs/toolkit';
import type { TLocaleStore } from 'entities/locale/model/types';

const initialState: TLocaleStore = {
  current: '',
  data: {},
  list: [],
};

export const locale = createSlice({
  initialState,
  name: 'locale',
  reducers: {
    getMessages: (state, { payload }) => {
      const { data, language } = payload;

      state.data[language] = data;
    },
    getList: (state, { payload }) => {
      state.list = payload;
    },
    setCurrent: (state, { payload }) => {
      state.current = payload;
    },
  },
});
