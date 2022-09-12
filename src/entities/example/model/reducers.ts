import { createSlice } from '@reduxjs/toolkit';
import { exampleIdKey } from 'entities/example/model/constants';
import { TExample, TExampleStore } from 'entities/example/model/types';
import { getId, normalize } from 'shared/lib/normalize';

const getExampleId = getId(exampleIdKey);

const normalizeExample = normalize<TExample>(getExampleId);

const initialState: TExampleStore = {
  data: {},
  list: [],
};

export const example = createSlice({
  initialState,
  name: 'example',
  reducers: {
    getList: (state, { payload }) => ({ ...state, ...normalizeExample(payload) }),
  },
});

