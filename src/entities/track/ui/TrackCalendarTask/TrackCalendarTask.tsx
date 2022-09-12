import { Popover } from 'antd';
import { taskIdKey } from 'entities/task/model/constants';
import { TTask } from 'entities/task/model/types';
import { useTrackerUrl } from 'entities/track/lib/hooks';
import { TrackAddButton } from 'entities/track/ui/TrackAddButton';
import React, { FC } from 'react';

type TProps = {
  isEdit?: boolean;
  taskItem: TTask;
};

export const TrackCalendarTask: FC<TProps> = ({ isEdit, taskItem }) => {
  const taskId = taskItem[taskIdKey];
  const trackerUrl = useTrackerUrl(taskItem);

  return (
    <Popover
      content={taskItem.summary}
      placement="right"
    >
      <div>
        <div>
          <a href={trackerUrl} target="_blank" rel="noreferrer">{taskItem.key}</a>
        </div>
        {isEdit && (
          <div>
            <TrackAddButton taskId={taskId} />
          </div>
        )}
      </div>
    </Popover>
  );
};
