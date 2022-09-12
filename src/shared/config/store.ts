import { configureStore } from '@reduxjs/toolkit';
import { auth } from 'entities/auth/model/reducers';
import { config } from 'entities/config/model/reducers';
import { example } from 'entities/example/model/reducers';
import { locale } from 'entities/locale/model/reducers';
import { status } from 'entities/status/model/reducers';
import { task } from 'entities/task/model/reducers';
import { track } from 'entities/track/model/reducers';
import { user } from 'entities/user/model/reducers';
import { isClient } from 'shared/config/constants';

export const store = isClient ? configureStore({
  reducer: {
    [auth.name]: auth.reducer,
    [config.name]: config.reducer,
    [example.name]: example.reducer,
    [locale.name]: locale.reducer,
    [status.name]: status.reducer,
    [task.name]: task.reducer,
    [track.name]: track.reducer,
    [user.name]: user.reducer,
  },
}) : configureStore({ reducer: {} });

export type GetState = typeof store.getState;
export type RootState = ReturnType<GetState>;
export type AppDispatch = typeof store.dispatch;
