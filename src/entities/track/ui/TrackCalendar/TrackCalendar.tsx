import { Typography } from 'antd';
import { Message } from 'entities/locale/ui/Message';
import { selectLoadItem } from 'entities/status/model/selectors';
import { useTaskFilter } from 'entities/task/lib/hooks';
import { actionTaskGetList } from 'entities/task/model/actions';
import { task } from 'entities/task/model/reducers';
import { selectTaskListByFilter } from 'entities/task/model/selectors';
import { TTask } from 'entities/task/model/types';
import { useTrackFilter } from 'entities/track/lib/hooks';
import { actionTrackGetList } from 'entities/track/model/actions';
import { trackIdKey } from 'entities/track/model/constants';
import { selectTrackData, selectTrackIdListByFilter } from 'entities/track/model/selectors';
import { TrackCalendarCol } from 'entities/track/ui/TrackCalendarCol';
import { TrackCalendarColHead } from 'entities/track/ui/TrackCalendarColHead';
import { TrackCalendarColSumDay } from 'entities/track/ui/TrackCalendarColSumDay';
import { TrackCalendarColSumMonth } from 'entities/track/ui/TrackCalendarColSumMonth';
import { TrackCalendarTask } from 'entities/track/ui/TrackCalendarTask';
import { selectUserItem } from 'entities/user/model/selectors';
import { DATE_FORMAT_DATE_API } from 'features/date/lib/constants';
import { DateWrapper, TDate } from 'features/date/lib/helpers';
import React, { FC, ReactElement, useCallback, useEffect, useMemo } from 'react';
import { dateRange } from 'shared/config/constants';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { Column, Summary, Table } from 'widgets/Table';

type TProps = {
  from: string;
  isEdit?: boolean;
  to: string;
  userId: string;
};

const scroll = { x: '100%' };

const renderTask = (key: string, taskItem: TTask): ReactElement => <TrackCalendarTask taskItem={taskItem} />;

export const TrackCalendar: FC<TProps> = ({ from, isEdit, to, userId }) => {
  const dispatch = useAppDispatch();
  const [dateFrom, dateTo] = useMemo(() => [DateWrapper.getDate(from), DateWrapper.getDate(to)], [from, to]);
  const range = useMemo(() => DateWrapper.getDateRange(dateFrom, dateTo, 'day'), [dateFrom, dateTo]);
  const userItem = useAppSelector(selectUserItem(userId));
  const trackFilter = useTrackFilter({ from: dateRange.from, to: dateRange.to, userId });
  const trackData = useAppSelector(selectTrackData);
  const trackIdList = useAppSelector(selectTrackIdListByFilter(trackFilter));
  const taskIdListFilter = useMemo(() => [
    ...new Set(trackIdList.map(trackId => trackData[trackId]?.issue.key).filter(Boolean)),
  ], [trackData, trackIdList]);

  const taskFilter = useTaskFilter({
    from: DateWrapper.getDateFormat(dateFrom, DATE_FORMAT_DATE_API),
    taskIdListFilter,
    to: DateWrapper.getDateFormat(dateTo, DATE_FORMAT_DATE_API),
    userId: userItem?.display,
  });
  const taskList = useAppSelector(selectTaskListByFilter(taskFilter));
  const isTaskListLoading = useAppSelector(selectLoadItem(task.actions.getList.type));

  useEffect(() => {
    dispatch(actionTaskGetList(taskFilter));
  }, [dispatch, taskFilter]);

  useEffect(() => {
    dispatch(actionTrackGetList(trackFilter));
  }, [dispatch, trackFilter]);

  const renderColumn = useCallback((date: TDate) => (task: TTask): ReactElement => {
    const dateFormat = DateWrapper.getDateFormat(date, DATE_FORMAT_DATE_API);
    const taskId = task[trackIdKey];

    return <TrackCalendarCol date={dateFormat} isEdit={isEdit} key={dateFormat} taskId={taskId} userId={userId} />;
  }, [isEdit, userId]);

  const renderSummary = useCallback((): ReactElement => (
    <Summary.Row>
      <Summary.Cell index={0}>
        <Typography.Text strong>
          <TrackCalendarColSumMonth range={range} userId={userId} />
        </Typography.Text>
      </Summary.Cell>
      {range.map((date, index) => (
        <Summary.Cell index={index + 1} key={date.toString()}>
          <Typography.Text strong>
            <TrackCalendarColSumDay date={date} userId={userId} />
          </Typography.Text>
        </Summary.Cell>
      ))}
    </Summary.Row>
  ), [range, userId]);

  return (
    <Table
      bordered
      dataSource={taskList}
      loading={isTaskListLoading}
      scroll={scroll}
      showHeader
      summary={renderSummary}
    >
      <Column dataIndex="key" key="key" render={renderTask} title={<Message id="task.title" />} />
      {range.map(date => (
        <Column
          key={date.toISOString()}
          render={renderColumn(date)}
          title={<TrackCalendarColHead date={date} />}
        />
      ))}
    </Table>
  );
};
