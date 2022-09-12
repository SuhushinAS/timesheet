import { status } from 'entities/status/model/reducers';
import { TLoadMap, TStatusStore } from 'entities/status/model/types';
import { RootState } from 'shared/config/store';

/**
 * Получить загрузку.
 * @param state Стейт.
 * @return Загрузка.
 */
export const selectStatus = (state: RootState): TStatusStore => state[status.name];

export const selectLoad = (state: RootState): TLoadMap => selectStatus(state).load;

export const selectLoadItem = (id: string) => (state: RootState): boolean | undefined => selectLoad(state)[id];
