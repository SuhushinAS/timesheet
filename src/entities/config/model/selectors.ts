import { TConfigAuth, TConfigOptions, TConfigStore } from 'entities/config/model/types';
import { RootState } from 'shared/config/store';
import { config } from './reducers';

export const selectConfig = (state: RootState): TConfigStore | undefined => state[config.name];

export const getConfigAuth = (configData?: TConfigStore): TConfigAuth | undefined => configData?.auth;
export const selectConfigAuth = (state: RootState): TConfigAuth | undefined => getConfigAuth(selectConfig(state));

export const getConfigOptions = (configData?: TConfigStore): TConfigOptions | undefined => configData?.options;
export const selectConfigOptions = (state: RootState): TConfigOptions | undefined => getConfigOptions(selectConfig(state));

export const selectConfigTrackUrl = (state: RootState): string | undefined => selectConfig(state)?.trackerUrl;
