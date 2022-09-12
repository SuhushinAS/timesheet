import { user } from 'entities/user/model/reducers';
import { TUser, TUserMap, TUserStore } from 'entities/user/model/types';
import { createSelector } from 'reselect';
import { RootState } from 'shared/config/store';
import { getList } from 'shared/lib/selectors';

export const selectUser = (state: RootState): TUserStore => state[user.name];

export const selectUserData = (state: RootState): TUserMap => selectUser(state).data;

export const selectUserItem = (id: string) => (state: RootState): TUser | undefined => selectUserData(state)[id];

export const selectUserIdList = (state: RootState): string[] => selectUser(state).list;

export const selectExampleList = createSelector([selectUserData, selectUserIdList], getList);

export const selectUserSelfId = (state: RootState): string | undefined => selectUser(state).selfId;
