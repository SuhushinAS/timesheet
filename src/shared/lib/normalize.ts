import { TGetEntry, TGetId, TGetList } from 'shared/lib/types';

/**
 * Получить идентификатор.
 * @param key Свойство.
 * @return Идентификатор.
 */
export const getId = <T>(key: keyof T): TGetId<T> => item => `${item[key]}`;

/**
 * Получить данные.
 * @param getId Получить идентификатор.
 * @return данные.
 */
export const getEntries = <T>(getId: TGetId<T>): TGetEntry<T> => item => ([getId(item), item]);

export const normalize = <T>(getId: TGetId<T>): TGetList<T> => (list: T[]) => ({
  data: Object.fromEntries(list.map(getEntries(getId))),
  list: list.map(getId),
});
