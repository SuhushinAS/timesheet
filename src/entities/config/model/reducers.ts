import { createSlice } from '@reduxjs/toolkit';
import { TConfigStore } from './types';

const initialState: TConfigStore | null = null;

export const config = createSlice({
  initialState,
  name: 'config',
  reducers: {
    getConfig: (state, { payload }) => payload,
  },
});

