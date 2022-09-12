import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TStatusStore } from 'entities/status/model/types';

const initialState: TStatusStore = {
  load: {},
};

export const status = createSlice({
  initialState,
  name: 'status',
  reducers: {
    loadStart: (state, { payload }: PayloadAction<string>) => {
      state.load[payload] = true;
    },
    loadStop: (state, { payload }: PayloadAction<string>) => {
      state.load[payload] = false;
    },
  },
});
