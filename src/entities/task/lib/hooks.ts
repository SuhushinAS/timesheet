import { useMemo } from 'react';

type TUseTaskFilter = (params: TUseTaskFilterParams) => string;
type TUseTaskFilterParams = {
  from?: string;
  taskIdListFilter?: string[];
  to?: string;
  userId?: string;
};

export const useTaskFilter: TUseTaskFilter = ({ from, taskIdListFilter = [], to, userId }) => {
  const userQuery = useMemo(() => {
    const userQueryList = [];

    if (userId) {
      userQueryList.push(`Assignee: "${userId}"`);
    }

    if (from) {
      userQueryList.push(`(Created: >= ${from} OR Updated: >= ${from})`);
    }

    if (to) {
      userQueryList.push(`(Created: <= ${to} OR Updated: <= ${to})`);
    }

    return userQueryList.join(' AND ');
  }, [from, to, userId]);

  const taskQuery = useMemo(() => {
    if (taskIdListFilter.length <= 0) {
      return '';
    }

    return `Key: ${taskIdListFilter.map(taskId => `"${taskId}"`).join(', ')}`;
  }, [taskIdListFilter]);

  return useMemo(() => {
    const queryList = [];

    if (taskQuery) {
      queryList.push(`(${taskQuery})`);
    }

    if (userQuery) {
      queryList.push(`(${userQuery})`);
    }

    return JSON.stringify({
      query: queryList.join(' OR '),
    });
  }, [taskQuery, userQuery]);
};
