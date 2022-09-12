import { REDIRECT_URL_KEY } from 'entities/auth/lib/constants';
import { TConfigAuth } from 'entities/config/model/types';
import { Location } from 'history';
import queryString from 'query-string';
import { FC, useEffect, useMemo } from 'react';
import { appPaths } from 'shared/config/constants';

type TProps = {
  config: TConfigAuth;
  location: Location;
};

export const Auth: FC<TProps> = ({ config, location }) => {
  const redirectUrl = useMemo(() => {
    const result = new URL(window.location.origin);

    result.pathname = appPaths.token;
    result.search = queryString.stringify(location);

    return result.href;
  }, [location]);

  const url = useMemo(() => {
    const result = new URL(config.url);

    result.search = queryString.stringify({
      ...config.params,
      [REDIRECT_URL_KEY]: redirectUrl,
    });

    return result.href;
  }, [config, redirectUrl]);

  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null;
};
