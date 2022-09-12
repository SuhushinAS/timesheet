import { getMessage } from 'entities/locale/lib/helpers';
import { TMessage } from 'entities/locale/model/types';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

export const useMessage = (): TMessage => {
  const intl = useIntl();

  return useMemo(() => getMessage(intl), [intl]);
};
