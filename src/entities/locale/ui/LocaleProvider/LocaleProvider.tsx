import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { actionLocaleGetMessages, actionLocaleInit, actionLocaleGetList } from 'entities/locale/model/actions';
import { locale } from 'entities/locale/model/reducers';
import { selectLocaleCurrent, selectMessages } from 'entities/locale/model/selectors';
import { selectLoadItem } from 'entities/status/model/selectors';
import React, { useEffect, FC } from 'react';
import { IntlProvider } from 'react-intl';

type TProps = {
  children: React.ReactNode;
};

export const LocaleProvider: FC<TProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionLocaleGetList);
    dispatch(actionLocaleInit);
  }, [dispatch]);

  const language = useAppSelector(selectLocaleCurrent);
  const isLoadingMessages = useAppSelector(selectLoadItem(locale.actions.getMessages.type));
  const messages = useAppSelector(selectMessages(language));

  useEffect(() => {
    if (!messages && !isLoadingMessages && language) {
      dispatch(actionLocaleGetMessages(language));
    }
  }, [dispatch, isLoadingMessages, language, messages]);

  if (!messages) {
    return null;
  }

  return (
    <IntlProvider locale={language} messages={messages}>
      {children}
    </IntlProvider>
  );
};
