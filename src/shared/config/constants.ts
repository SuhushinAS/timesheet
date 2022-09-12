import { DateWrapper } from 'features/date/lib/helpers';

export const isClient = process.browser;

export const appPaths = {
  example: '/example',
  home: '/',
  task: '/task',
  token: '/token',
  track: '/track',
  user: '/user',
};

const now = DateWrapper.getDate();
const from = DateWrapper.getDateStart(now, 'month');
const to = DateWrapper.getDateEnd(now, 'month');

// TODO Получать из фильтра.
export const dateRange = {
  from: DateWrapper.getDateFormat(from),
  to: DateWrapper.getDateFormat(to),
};
