import { auth } from 'entities/auth/model/reducers';
import { TAuthStore, TAuthToken } from 'entities/auth/model/types';
import { RootState } from 'shared/config/store';

export const selectAuth = (state: RootState): TAuthStore => state[auth.name];

export const getAuthToken = (authData: TAuthStore): TAuthToken => authData.token;
export const selectAuthToken = (state: RootState): TAuthToken => getAuthToken(selectAuth(state));
