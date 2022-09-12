import { useMessage } from 'entities/locale/lib/hooks';
import { DateWrapper, TDuration } from 'features/date/lib/helpers';
import { useMemo } from 'react';

export const useDurationFormat = (duration?: TDuration, isWork = false): string => {
  const message = useMessage();

  return useMemo(() => {
    if (!duration) {
      return '';
    }

    const durationData = DateWrapper.getDurationData(duration, isWork);

    return Object.keys(durationData).reduce<string[]>((acc, key) => {
      const value = durationData[key];

      if (value > 0) {
        acc.push(message(`date.${key}.short`, { value }));
      }

      return acc;
    }, []).join(' ');
  }, [duration, isWork, message]);
};

export const useDurationFormatFromISO = (durationISO?: string): string | undefined => {
  const duration = useMemo(() => {
    if (!durationISO) {
      return undefined;
    }

    return DateWrapper.getDuration(durationISO);
  }, [durationISO]);

  return useDurationFormat(duration, true);
};
