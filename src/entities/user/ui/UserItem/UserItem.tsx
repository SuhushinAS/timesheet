import { TrackCalendar } from 'entities/track/ui/TrackCalendar';
import { TrackModalCreate } from 'entities/track/ui/TrackModalCreate';
import { TrackModalEdit } from 'entities/track/ui/TrackModalEdit';
import { selectUserItem } from 'entities/user/model/selectors';
import React, { FC } from 'react';
import { dateRange } from 'shared/config/constants';
import { useAppSelector } from 'shared/lib/hooks';
import { Loading } from 'shared/ui/Loading/Loading';

type TProps = {
  isEdit?: boolean;
  isLoading?: boolean;
  userId: string;
};

export const UserItem: FC<TProps> = ({ isEdit, isLoading, userId }) => {
  const userSelf = useAppSelector(selectUserItem(userId));

  return (
    <Loading isLoading={isLoading}>
      <h1>
        {userSelf?.display}
      </h1>
      <TrackCalendar from={dateRange.from} isEdit={isEdit} to={dateRange.to} userId={userId} />
      {isEdit && (
        <>
          <TrackModalCreate />
          <TrackModalEdit />
        </>
      )}
    </Loading>
  );
};

