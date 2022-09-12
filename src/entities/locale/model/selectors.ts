import { locale } from 'entities/locale/model/reducers';
import { TLocale, TLocaleData, TLocaleStore } from 'entities/locale/model/types';
import { RootState } from 'shared/config/store';

/**
 * Получить локаль.
 * @param state Стейт.
 * @return Загрузка.
 */
export const selectLocale = (state: RootState): TLocaleStore => state[locale.name];

export const selectLocaleData = (state: RootState): TLocaleData => selectLocale(state).data;
export const selectLocaleList = (state: RootState): string[] => selectLocale(state).list;
export const selectMessages = (language: string) => (state: RootState): TLocale | undefined => selectLocaleData(state)[language];

/**
 * Получить текущий язык.
 * @param state Стейт.
 * @return Текущий язык.
 */
export const selectLocaleCurrent = (state: RootState): string => selectLocale(state).current;
