import { actionConfigGet } from 'entities/config/model/actions';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';

export const ConfigLoad = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionConfigGet);
  }, [dispatch]);

  return null;
};
