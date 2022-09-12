import queryString from 'query-string';

export const getTrackIdMapKey = (params: Record<string, string>): string => queryString.stringify(params);
