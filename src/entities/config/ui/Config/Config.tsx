import { config } from 'entities/config/model/reducers';
import { selectConfig, selectConfigOptions } from 'entities/config/model/selectors';
import { ConfigLoad } from 'entities/config/ui/ConfigLoad';
import { selectLoadItem } from 'entities/status/model/selectors';
import React, { FC, ReactNode, useEffect } from 'react';
import { api } from 'shared/api/api';
import { useAppSelector } from 'shared/lib/hooks';
import { Loading } from 'shared/ui/Loading/Loading';

type TProps = {
  children: ReactNode;
};

export const Config: FC<TProps> = ({ children }) => {
  const configData = useAppSelector(selectConfig);
  const options = useAppSelector(selectConfigOptions);
  const configIsLoading = useAppSelector(selectLoadItem(config.actions.getConfig.type));

  useEffect(() => {
    if (options) {
      api.setOptions(options);
    }
  }, [options]);

  if (configData) {
    return <>{children}</>;
  }

  if (configIsLoading) {
    return <Loading isLoading />;
  }

  return <ConfigLoad />;
};
