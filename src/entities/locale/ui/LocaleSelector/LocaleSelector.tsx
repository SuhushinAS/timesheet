import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { actionLocaleSetCurrent } from 'entities/locale/model/actions';
import { selectLocaleCurrent, selectLocaleList } from 'entities/locale/model/selectors';
import React, { useCallback } from 'react';

/**
 * Вывести вариант локали.
 * @param locale Локаль
 * @return Вариант локали.
 */
const renderLocaleOption = (locale: string): JSX.Element => (
  <option key={locale} value={locale}>
    {locale}
  </option>
);

export const LocaleSelector = () => {
  const dispatch = useAppDispatch();
  const localeCurrent = useAppSelector(selectLocaleCurrent);
  const localeList = useAppSelector(selectLocaleList);

  const onLocaleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actionLocaleSetCurrent(event.target.value || ''));
  }, [dispatch]);

  return (
    <select name="locale" onChange={onLocaleChange} value={localeCurrent}>
      {localeList.map(renderLocaleOption)}
    </select>
  );
};
