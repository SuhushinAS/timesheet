import dayjs, { Dayjs, OpUnitType } from 'dayjs';
import 'dayjs/locale/ru';
import duration, { Duration } from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  DURATION_EMPTY,
  durationUnits,
  HOUR_A_DAY_WORK,
  MINUTE_A_HOUR,
  SECONDS_A_MINUTE,
} from 'features/date/lib/constants';
import parse from 'parse-duration';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export type TDate = Dayjs;
export type TDuration = Duration;

export const daysToHoursWork = (days: number): number => days * HOUR_A_DAY_WORK;
export const hoursToMinutes = (hours: number): number => hours * MINUTE_A_HOUR;
export const minutesToSeconds = (minutes: number): number => minutes * SECONDS_A_MINUTE;

(() => {
  // Подмена, чтобы считал 1день = 8часов.
  parse.d = parse.h * HOUR_A_DAY_WORK;
  parse.day = parse.h * HOUR_A_DAY_WORK;

  parse.w = parse.d * 7;
  parse.wk = parse.d * 7;
  parse.week = parse.d * 7;

  parse.b = parse.d * (365.25 / 12);
  parse.month = parse.d * (365.25 / 12);

  parse.y = parse.d * 365.25;
  parse.yr = parse.d * 365.25;
  parse.year = parse.d * 365.25;

  Object.entries(durationUnits).forEach(([key, units]) => {
    units.forEach(unit => {
      parse[unit] = parse[key];
    });
  });
})();

export class DateWrapper {
  static setLocale(language: string): void {
    dayjs.locale(language);
  }

  static getDate(date?: string): TDate {
    return dayjs(date);
  }

  static getDateFormat(dateObject: TDate, format?: string): string {
    return dateObject.format(format);
  }

  static getDateISO(dateObject: TDate): string {
    return dateObject.toISOString();
  }

  static getDateStart(dateObject: TDate, unit: OpUnitType): TDate {
    return dateObject.startOf(unit);
  }

  static getDateEnd(dateObject: TDate, unit: OpUnitType): TDate {
    return dateObject.endOf(unit);
  }

  static getDateDiff(dateObject1: TDate, dateObject2: TDate, unit: OpUnitType): number {
    return dateObject1.diff(dateObject2, unit);
  }

  static getDateRange(dateObject1: TDate, dateObject2: TDate, unit: OpUnitType): TDate[] {
    const diff = DateWrapper.getDateDiff(dateObject2, dateObject1, unit);
    const diffAbs = Math.abs(diff);
    const k = diff / diffAbs;

    return new Array(diffAbs + 1).fill(null).map((_, index) => dateObject1.add(index * k, 'day'));
  }

  static isDateValid(dateObject: TDate): boolean {
    return dateObject.isValid();
  }

  static getDuration(duration: string): TDuration {
    return dayjs.duration(duration);
  }

  static getDurationHours(duration: TDuration, isWork = false): number {
    if (!isWork) {
      return Math.floor(duration.asHours());
    }

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();

    return hours + daysToHoursWork(days);
  }

  static getDurationFromSeconds(seconds: number): TDuration {
    return dayjs.duration(seconds, 'seconds');
  }

  static getDurationSeconds(duration: TDuration, isWork = false): number {
    const { hours, minutes, seconds } = DateWrapper.getDurationData(duration, isWork);

    return seconds + minutesToSeconds(minutes + hoursToMinutes(hours));
  }

  static getDurationData(duration: TDuration, isWork = false): Record<string, number> {
    return {
      hours: DateWrapper.getDurationHours(duration, isWork),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  }

  static getDurationISO(duration: TDuration): string {
    return duration.toISOString();
  }

  static isDurationValid(duration: TDuration): boolean {
    return dayjs.isDuration(duration);
  }

  static parseDuration(duration: string): TDuration {
    const milliseconds = parse(duration);

    if (!milliseconds) {
      return dayjs.duration(DURATION_EMPTY);
    }

    return dayjs.duration(milliseconds, 'milliseconds');
  }
}
