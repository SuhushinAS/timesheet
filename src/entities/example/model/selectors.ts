import { example } from 'entities/example/model/reducers';
import { TExample, TExampleMap, TExampleStore } from 'entities/example/model/types';
import { createSelector } from 'reselect';
import { RootState } from 'shared/config/store';
import { getList } from 'shared/lib/selectors';

export const selectExample = (state: RootState): TExampleStore => state[example.name];

export const selectExampleData = (state: RootState): TExampleMap => selectExample(state).data;

export const selectExampleIdList = (state: RootState): string[] => selectExample(state).list;

export const selectExampleList = createSelector([selectExampleData, selectExampleIdList], getList);

export const selectExampleItem = (id: string) => (state: RootState): TExample | undefined => selectExampleData(state)[id];
