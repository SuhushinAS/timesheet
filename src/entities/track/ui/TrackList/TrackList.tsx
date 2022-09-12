import { Space } from 'antd';
import { Message } from 'entities/locale/ui/Message';
import { TTrack } from 'entities/track/model/types';
import { TrackDeleteButton } from 'entities/track/ui/TrackDeleteButton';
import { TrackEditButton } from 'entities/track/ui/TrackEditButton';
import { DATE_FORMAT_DATE } from 'features/date/lib/constants';
import { DateWrapper } from 'features/date/lib/helpers';
import { DateFormat } from 'features/date/ui/DateFormat';
import { DurationFormat } from 'features/date/ui/DurationFormat';
import React, { FC, ReactElement } from 'react';
import { Column, Table } from 'widgets/Table';

type TProps = {
  isEdit?: boolean;
  isLoading?: boolean;
  list: TTrack[];
};

const renderComment = (comment: string): ReactElement => (
  comment
    ? <div>{comment}</div>
    : <Message id="track.item.commentEmpty" />
);

const renderStart = (start: string): ReactElement => (
  <DateFormat date={start} format={DATE_FORMAT_DATE} />
);

const renderDuration = (duration: string): ReactElement => (
  <DurationFormat duration={DateWrapper.getDuration(duration)} />
);

const renderControl = (trackItem: TTrack): ReactElement => (
  <Space size="small">
    <TrackEditButton trackItem={trackItem} />
    <TrackDeleteButton trackItem={trackItem} />
  </Space>
);

export const TrackList: FC<TProps> = ({ isEdit, isLoading, list }) => (
  <Table bordered dataSource={list} loading={isLoading} showHeader>
    <Column dataIndex="comment" key="comment" render={renderComment} title={<Message id="track.item.comment" />} />
    <Column dataIndex="start" key="start" render={renderStart} title={<Message id="track.item.start" />} />
    <Column dataIndex="duration" key="duration" render={renderDuration} title={<Message id="track.item.duration" />} />
    {isEdit && <Column title={'\u00A0'} render={renderControl} />}
  </Table>
);
